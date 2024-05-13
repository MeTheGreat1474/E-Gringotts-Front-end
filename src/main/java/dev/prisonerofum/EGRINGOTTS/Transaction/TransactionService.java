package dev.prisonerofum.EGRINGOTTS.Transaction;


import dev.prisonerofum.EGRINGOTTS.Account.Account;
import dev.prisonerofum.EGRINGOTTS.Account.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Date;
@Service
public class TransactionService {

    @Autowired                                  // initialized the EGringottsRepository
    private TransactionRepository transactionRepository;
    private AccountRepository accountRepository;

    // create new transactions
    public void makeNewTransactions(List<Transaction> transactions) {
        transactionRepository.saveAll(transactions);
    }

    // getTransactionHistory method
    public List<Transaction> getTransactionsHistory(String userID) {
        return transactionRepository.findByUserId(userID);
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

        // Format transaction date
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String formattedDate = dateFormat.format(transactionDate);

        // Generate receipt
        StringBuilder receiptBuilder = new StringBuilder();
        receiptBuilder.append("Transaction ID: ").append(transactionId).append("\n");
        receiptBuilder.append("Date: ").append(formattedDate).append("\n");
        receiptBuilder.append("Sender: ").append(sender != null ? sender.getUsername() : "Unknown").append("\n");
        receiptBuilder.append("Recipient: ").append(recipient != null ? recipient.getUsername() : "Unknown").append("\n");
        receiptBuilder.append("Amount: ").append(amount).append("\n");
        receiptBuilder.append("Thank you for using E-Gringotts! Your magical transfer has been successfully completed.\n\n" +
                "For any inquiries or further assistance, owl us at support@egringotts.com\n\n" +
                "Mya your galleons multiply like Fizzing Whizbees!");

        return receiptBuilder.toString();
    }


}
