package dev.prisonerofum.EGRINGOTTS.Transaction;


import dev.prisonerofum.EGRINGOTTS.Account.Account;
import dev.prisonerofum.EGRINGOTTS.Account.AccountRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Date;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired                                  // initialized the EGringottsRepository
    private TransactionRepository transactionRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private CurrencyExchangeService currencyExchangeService;

    // create new transactions
    public String makeNewTransaction(String senderId, String receiverId, double amount, TransactionCategory category, String transactionType, String remarks) {
        Optional<Account> senderOpt = accountRepository.findById(senderId);
        Optional<Account> receiverOpt = accountRepository.findById(receiverId);

        if (!senderOpt.isPresent() || !receiverOpt.isPresent()) {
            return "Sender or receiver account not found.";
        }

        Account sender = senderOpt.get();
        Account receiver = receiverOpt.get();

        if (sender.getBalance() < amount) {
            return "Insufficient balance. " + sender;
        }

        sender.setBalance(sender.getBalance() - amount);
        receiver.setBalance(receiver.getBalance() + amount);

        accountRepository.save(sender);
        accountRepository.save(receiver);

        // Perform the currency conversion and get the processing fee
        ExchangeResponse exchangeResponse = currencyExchangeService.exchangeCurrency(sender.getCurrency(), receiver.getCurrency(), amount);
        double convertedAmount = exchangeResponse.getExchangedValue();
        double processingFee = exchangeResponse.getProcessingFee();

        // Update the account balances
        sender.setBalance(sender.getBalance() - amount - processingFee);
        receiver.setBalance(receiver.getBalance() + convertedAmount);

        Transaction transaction = new Transaction();
        transaction.setUserID(senderId);
        transaction.setReceiverID(receiverId);
        transaction.setAmount(amount);
        transaction.setCategory(category);
        transaction.setTransactionType(transactionType);
        transaction.setRemarks(remarks);
        transaction.setDate(new Date());

        // Set the converted amount and processing fee
        transaction.setConvertedAmount(convertedAmount);
        transaction.setProcessingFee(processingFee);

        transactionRepository.save(transaction);

        // Generate receipt
        String receipt = generateReceipt(transaction);

        return "Transaction successful. Receipt: " + receipt;
    }

    // getTransactionHistory method
    public List<Transaction> getTransactionsHistory(String userID) {
        return transactionRepository.findByUserID(userID);
    }


    // filter method for date in specific range
    public List<Transaction> getTransactionsByDateRange(Date startDate, Date endDate) {
        return transactionRepository.findByTransactionDateBetween(startDate, endDate);
    }

    // filter method according to amount threshold
    public List<Transaction> getTransactionsByAmountRange(double minAmount, double maxAmount) {
        return transactionRepository.findTransactionsByAmountRange(minAmount, maxAmount);
    }

    // filter  method according to category
    public List<Transaction> getTransactionsByCategory(TransactionCategory category) {
        return transactionRepository.findByCategory(category);
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
        Account sender = accountRepository.findById(senderUserId).orElse(null);
        Account recipient = accountRepository.findById(recipientUserId).orElse(null);

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
}
