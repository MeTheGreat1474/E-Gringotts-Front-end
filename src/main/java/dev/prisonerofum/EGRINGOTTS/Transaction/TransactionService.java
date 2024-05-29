package dev.prisonerofum.EGRINGOTTS.Transaction;


import dev.prisonerofum.EGRINGOTTS.Account.Account;
import dev.prisonerofum.EGRINGOTTS.Account.AccountRepository;
import dev.prisonerofum.EGRINGOTTS.Account.AccountService;
import dev.prisonerofum.EGRINGOTTS.User.*;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import dev.prisonerofum.EGRINGOTTS.EmailService;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Date;
import java.util.Optional;
import java.util.*;
import java.util.stream.Collectors;
import org.springframework.context.annotation.Lazy;


@Service
public class TransactionService {

    @Autowired                                  // initialized the EGringottsRepository
    private TransactionRepository transactionRepository;
    @Autowired
    private AccountRepository<User> accountRepository;
    @Autowired
    private CurrencyExchangeService currencyExchangeService;
    @Autowired
    private EmailService emailService;

    private AccountService accountService;

    @Autowired
    public TransactionService(@Lazy AccountService accountService) {
        this.accountService = accountService;
    }



    public String makeNewTransaction(String senderId, String receiverId, Double amount,
                                     TransactionCategory category, String transactionType, String remarks) {
        // Create and save the transaction
        Transaction transaction = new Transaction();
        transaction.setUserID(senderId);
        transaction.setReceiverID(receiverId);
        transaction.setAmount(amount);
        transaction.setCategory(category);
        transaction.setTransactionType(transactionType);
        transaction.setRemarks(remarks);
        transaction.setDate(new Date());
        transaction.generateTransactionID();

        // Set transaction date and time
        String transactionDate = new SimpleDateFormat("yyyy-MM-dd").format(transaction.getDate());
        String transactionTime = new SimpleDateFormat("HH:mm:ss").format(transaction.getDate());
        transaction.setTransactionDate(transactionDate);
        transaction.setTransactionTime(transactionTime);

        // Save the transaction to the database
        Transaction savedTransaction = transactionRepository.save(transaction);


        // Generate receipt
        String receipt = generateReceipt(savedTransaction);

        Account<User> accountSender = accountService.getAccountByUserId(senderId).get();
        String senderEmail = accountSender.getEmail();
        String reveiverEmail = accountService.getAccountByUserId(receiverId).get().getEmail();

        emailService.sendSimpleMessage(senderEmail,"Alert : Notification on E-Gringotts Transaction", "Dear Valued Customer,<br></br> "+

                "Your E-Gringotts Transfer of" + amount + "to" + receiverId + "o" + savedTransaction.getDate() + "is accepted. To verify your transaction, please log in to your account and check your transaction history." +

                "Please logon to E-Gringotts Website for details." +

                "Security Reminder: Do not respond to any unauthorised or unknown website links, emails or SMSs requesting for Your banking information to stay safe online." +

                "<br></br><br></br>This is an auto-generated message. Please do not reply to this mail.");

        emailService.sendSimpleMessage(reveiverEmail,"Received Transaction","Kindly be informed that you have received" + amount +  "from " + senderId
        +"<br></br><br></br>This is an auto-generated message. Please do not reply to this mail.");


        long numberOfTransaction = getTransactionsHistory(senderId).size();
        User user = accountSender.getUser();

        //Upgrade user from Silver Snitch to Golden Galleon if he makes more than certain transaction
        if (user instanceof SilverSnitch) {
            if(numberOfTransaction > 10){
                UserFactory userFactory = new GoldenGalleonFactory();
                User newUser = userFactory.createUser();
                accountSender.setUser(newUser);
                accountRepository.save(accountSender);}         //save to database
        }

        if(user instanceof GoldenGalleon){
            if(numberOfTransaction > 20){
                UserFactory userFactory = new PlatinumPatronusFactory();
                User newUser = userFactory.createUser();
                accountSender.setUser(newUser);
                accountRepository.save(accountSender);}         //save to database
        }

        emailService.sendSimpleMessage(senderEmail,"Alert : Notification on E-Gringotts Transaction", "Dear Valued Customer,<br></br> "+

                "Your E-Gringotts Transfer of" + amount + "to" + receiverId + "o" + savedTransaction.getDate() + "is accepted. To verify your transaction, please log in to your account and check your transaction history." +

                "Please logon to E-Gringotts Website for details." +

                "Security Reminder: Do not respond to any unauthorised or unknown website links, emails or SMSs requesting for Your banking information to stay safe online." +

                "<br></br><br></br>This is an auto-generated message. Please do not reply to this mail.");

        emailService.sendSimpleMessage(reveiverEmail,"Received Transaction","Kindly be informed that you have received" + amount +  "from " + senderId
        +"<br></br><br></br>This is an auto-generated message. Please do not reply to this mail.");


        // Return the generated transaction ID
        return savedTransaction.getId().toString();
    }

    public String createTransaction(String userId, String fromCurrency, String toCurrency, double amount,
                                    double exchangedValue, double processingFee) {
        // Create and save the transaction
        Transaction transaction = new Transaction();
        transaction.setUserID(userId);
        transaction.setAmount(amount);
        transaction.setCategory(TransactionCategory.EXCHANGE);
        transaction.setTransactionType("Currency Exchange");
        transaction.setRemarks(String.format("Exchanged %s to %s", fromCurrency, toCurrency));
        transaction.setProcessingFee(processingFee);
        transaction.setExchangedValue(exchangedValue);
        transaction.generateTransactionID();

        // Set transaction date and time
        String transactionDate = new SimpleDateFormat("yyyy-MM-dd").format(transaction.getDate());
        String transactionTime = new SimpleDateFormat("HH:mm:ss").format(transaction.getDate());
        transaction.setTransactionDate(transactionDate);
        transaction.setTransactionTime(transactionTime);

        // Save the transaction to the database
        Transaction savedTransaction = transactionRepository.save(transaction);

        // Return the generated transaction ID
        return savedTransaction.getTransactionID();
    }

    public ExchangeResponse exchangeCurrency(String userId, String fromCurrency, String toCurrency, double amount) {
        // Perform currency exchange
        ExchangeResponse response = currencyExchangeService.exchangeCurrency(userId, fromCurrency, toCurrency, amount);

        // Deduct the exchanged amount and processing fee from the user's account
        Account userAccount = accountRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("User not found"));
        double totalDeduction = amount + response.getProcessingFee();

        if (userAccount.getBalance() < totalDeduction) {
            throw new RuntimeException("Insufficient balance");
        }

        userAccount.setBalance(userAccount.getBalance() - totalDeduction);
        accountRepository.save(userAccount);

        // Create and save the transaction
        Transaction transaction = new Transaction();
        transaction.setUserID(userId);
        transaction.setReceiverID(null);  // For currency exchange, receiverId can be null
        transaction.setAmount(totalDeduction);
        transaction.setCategory(TransactionCategory.EXCHANGE);
        transaction.setTransactionType("Currency Exchange");
        transaction.setRemarks(String.format("Exchanged %f %s to %f %s", amount, fromCurrency, response.getExchangedValue(), toCurrency));
        Transaction savedTransaction = transactionRepository.save(transaction);

        // Update response with transaction details
        response.setTransactionId(savedTransaction.getId().toString());
        response.setBalance(userAccount.getBalance());

        return response;
    }

    // Create a method to handle reloading an account
    public String reloadAccount(String userId, Double amount, String remarks) {
        Optional<Account<User>> optionalAccount = accountRepository.findByUserId(userId);
        if (!optionalAccount.isPresent()) {
            throw new RuntimeException("Account is not found");
        }
        Account<User> account = optionalAccount.get();
        account.setBalance(account.getBalance() + amount);
        accountRepository.save(account);

        Transaction transaction = new Transaction();
        transaction.setUserID(userId);
        transaction.setReceiverID(userId);
        transaction.setAmount(amount);
        transaction.setConvertedAmount(0);
        transaction.setProcessingFee(0); // No processing fee for reload
        transaction.setTransactionType("RELOAD");
        transaction.setCategory(TransactionCategory.RELOAD);
        transaction.setRemarks(remarks);
        transaction.setDate(new Date());

        transaction = transactionRepository.save(transaction);

        return transaction.getId().toString();
    }

    // getTransactionHistory method
    public List<Transaction> getTransactionsHistory(String userId) {
        List<Transaction> transactions = transactionRepository.findByUserID(userId);
        transactions.removeIf(transaction -> transaction.getDate() == null); // Remove transactions with null dates
        transactions.sort((t1, t2) -> {
            Date date1 = t1.getDate();
            Date date2 = t2.getDate();
            if (date1 == null && date2 == null) {
                return 0; // Both dates are null, consider them equal
            } else if (date1 == null) {
                return 1; // Null dates come after non-null dates
            } else if (date2 == null) {
                return -1; // Non-null dates come before null dates
            } else {
                return t2.getDate().compareTo(t1.getDate()); // Compare non-null dates normally
            }
        });
        return transactions;
    }

    // filter method for date in specific range
    public List<Transaction> getTransactionsByDateRange(String userId, Date startDate, Date endDate) {
        return transactionRepository.findByUserIDAndTransactionDateBetween(userId, startDate, endDate);
    }

    // filter method according to amount threshold
    public List<Transaction> getTransactionsByAmountRange(String userId, double minAmount, double maxAmount) {
        return transactionRepository.findTransactionsByUserIDAndAmountRange(userId, minAmount, maxAmount);
    }

    // filter  method according to category
    public List<Transaction> getTransactionsByCategory(String userId, TransactionCategory category) {
        return transactionRepository.findByUserIDAndCategory(userId, category);
    }

    // generate receipt method
    public String generateReceipt(Transaction transaction) {
        // Get transaction details
        String transactionId = transaction.getTransactionID();
        String transactionDate = transaction.getTransactionDate();
        String senderUserId = transaction.getUserID();
        String recipientUserId = transaction.getReceiverID();
        double amount = transaction.getAmount();

        // Get sender and recipient information
        Account<User> sender = accountRepository.findByUserId(senderUserId).orElse(null);
        Account<User> recipient =  accountRepository.findByUserId(recipientUserId).orElse(null);

//        // Format transaction date
//        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//        String formattedDate = dateFormat.format(transactionDate);

        // Generate receipt
        StringBuilder receiptBuilder = new StringBuilder();
        receiptBuilder.append("Transaction ID: ").append(transactionId).append("\n");
        receiptBuilder.append("Date: ").append(transactionDate).append("\n");
        receiptBuilder.append("Sender: ").append(sender != null ? sender.getUsername() : "Unknown").append("\n");
        receiptBuilder.append("Recipient: ").append(recipient != null ? recipient.getUsername() : "Unknown").append("\n");
        receiptBuilder.append("Amount: ").append(amount).append("\n");
        receiptBuilder.append("Converted Amount: ").append(transaction.getConvertedAmount()).append("\n");
        receiptBuilder.append("Processing Fee: ").append(transaction.getProcessingFee()).append("\n");
        receiptBuilder.append("Thank you for using E-Gringotts! Your magical transfer has been successfully completed.\n\n" +
                "For any inquiries or further assistance, owl us at support@egringotts.com\n\n" +
                "May your galleons multiply like Fizzing Whizbees!");

        return receiptBuilder.toString();
    }

    public Transaction getTransactionById(String transactionId) {
        return transactionRepository.findById(new ObjectId(transactionId)).orElse(null);
    }

    public Map<TransactionCategory, Map<String, Double>> calculateCategoryPercentages(List<Transaction> transactions) {
        double totalExpenditure = transactions.stream().mapToDouble(Transaction::getAmount).sum();
        Map<TransactionCategory, Double> categorySums = new HashMap<>();
        for (Transaction transaction : transactions) {
            categorySums.merge(transaction.getCategory(), (double) transaction.getAmount(), Double::sum);
        }
        Map<TransactionCategory, Map<String, Double>> categoryData = new HashMap<>();

        for (Map.Entry<TransactionCategory, Double> entry : categorySums.entrySet()) {
            Map<String, Double> data = new HashMap<>();
            data.put("Percentage", (entry.getValue() / totalExpenditure) * 100);
            data.put("Total Expenditure", entry.getValue());
            categoryData.put(entry.getKey(), data);
        }

        return categoryData;
    }

    public Map<String, Map<TransactionCategory, Map<String, Double>>> calculateCategoryPercentagesByFrequency(List<Transaction> transactions, String frequency) {
        Map<String, List<Transaction>> groupedTransactions = new HashMap<>();
        SimpleDateFormat sdf = frequency.equalsIgnoreCase("DAILY") ? new SimpleDateFormat("yyyy-MM-dd") : new SimpleDateFormat("yyyy-MM");

        for (Transaction transaction : transactions) {
            String key = sdf.format(transaction.getDate());
            groupedTransactions.computeIfAbsent(key, k -> new ArrayList<>()).add(transaction);
        }

        Map<String, Map<TransactionCategory, Map<String, Double>>> categoryPercentagesByFrequency = new HashMap<>();

        for (Map.Entry<String, List<Transaction>> entry : groupedTransactions.entrySet()) {
            String key = entry.getKey();
            List<Transaction> groupedTransactionList = entry.getValue();
            categoryPercentagesByFrequency.put(key, calculateCategoryPercentages(groupedTransactionList));
        }

        return categoryPercentagesByFrequency;
    }

    public List<Transaction> filterTransactions(List<Transaction> transactions, Date startDate, Date endDate, Set<String> paymentMethods) {
        return transactions.stream()
                .filter(t -> !t.getDate().before(startDate) && !t.getDate().after(endDate))
                .filter(t -> paymentMethods.contains(t.getTransactionType()))
                .collect(Collectors.toList());
    }

    public List<Transaction> getTransactionsByDateRange(Date startDate, Date endDate) {
        return transactionRepository.findByTransactionDateBetween(startDate, endDate);
    }

    public long countNumOfTransaction() {
        return transactionRepository.count();
    }
}
