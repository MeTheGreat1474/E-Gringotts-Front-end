package dev.prisonerofum.EGRINGOTTS.Transaction;


import dev.prisonerofum.EGRINGOTTS.Account.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.text.SimpleDateFormat;

@CrossOrigin(origins = "*", allowedHeaders = "*")           //CrossOrigin is used to handle the request from a different origin
@RestController
@RequestMapping("/Transaction")
public class TransactionController{
    @Autowired                                              //Auto initialize accountService
    private TransactionService transactionService;
    @PostMapping("/transactions/new")
    public ResponseEntity<String> makeNewTransaction(
            @RequestParam String senderId,
            @RequestParam String receiverId,
            @RequestParam Double amount,
            @RequestParam TransactionCategory category,
            @RequestParam String transactionType,
            @RequestParam String remarks) {

        String result = transactionService.makeNewTransaction(senderId, receiverId, amount, category, transactionType, remarks);
        if (result.startsWith("Transaction successful.")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<List<Transaction>> getTransactionsHistory(@PathVariable String userId) {
        List<Transaction> transactions = transactionService.getTransactionsHistory(userId);

        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<Transaction>> getTransactionsByDateRange(
            @RequestParam("startDate") Date startDate,
            @RequestParam("endDate") Date endDate) {
        List<Transaction> transactions = transactionService.getTransactionsByDateRange(startDate, endDate);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping("/amount-range")
    public ResponseEntity<List<Transaction>> getTransactionsByAmountRange(
            @RequestParam("minAmount") double minAmount,
            @RequestParam("maxAmount") double maxAmount) {
        List<Transaction> transactions = transactionService.getTransactionsByAmountRange(minAmount, maxAmount);

        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping("/category")
    public ResponseEntity<List<Transaction>> getTransactionsByCategory(@RequestParam("category") TransactionCategory category) {
        List<Transaction> transactions = transactionService.getTransactionsByCategory(category);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping("/{transactionId}/receipt")
    public ResponseEntity<String> getReceipt(@PathVariable String transactionId) {
        // Retrieve the transaction by ID
        Transaction transaction = transactionService.getTransactionById(transactionId);

        if (transaction == null) {
            return new ResponseEntity<>("Transaction not found", HttpStatus.NOT_FOUND);
        }

        // Generate the receipt
        String receipt = transactionService.generateReceipt(transaction);

        return new ResponseEntity<>(receipt, HttpStatus.OK);
    }

    @Autowired
    private CurrencyExchangeService currencyExchangeService;

    @PostMapping("/addCurrencyPair")
    public ResponseEntity<CurrencyGraph<String>> addCurrencyPair(@RequestBody List<String[]> currencies) {

        CurrencyGraph<String> graph = currencyExchangeService.addCurrencyPairs(currencies);
        return new ResponseEntity<>(graph, HttpStatus.OK);
    }

    @GetMapping("/exchange")
    public ResponseEntity<Double> exchangeCurrency(
            @RequestParam String fromCurrency,
            @RequestParam String toCurrency,
            @RequestParam double amount) {

        double exchangedValue = currencyExchangeService.exchangeCurrency(fromCurrency, toCurrency, amount);
        return new ResponseEntity<>(exchangedValue, HttpStatus.OK);
    }

    @GetMapping("/api/analytics")
    public Map<String, Map<TransactionCategory, Map<String, Double>>> getAnalytics(
            @RequestParam String userId,
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate,
            @RequestParam(required = false, defaultValue = "Monthly") String frequency,
            @RequestParam(required = false) Set<String> paymentMethods) throws Exception {

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date start;
        Date end = endDate != null ? sdf.parse(endDate) : new Date();
        Set<String> methods = paymentMethods != null ? paymentMethods : new HashSet<>(Arrays.asList("Credit Card", "Debit Card", "Online Transfer"));

        // Determine the default start date based on the frequency
        if (startDate != null) {
            start = sdf.parse(startDate);
        } else {
            if (frequency.equals("Daily")) {
                start = getDefaultStartDateForDaily();
            } else {
                start = getDefaultStartDateForMonthly();
            }
        }

        List<Transaction> transactions = transactionService.getTransactionsHistory(userId);
        List<Transaction> filteredTransactions = transactionService.filterTransactions(transactions, start, end, methods);
        Map<String, Map<TransactionCategory, Map<String, Double>>> categoryPercentages = transactionService.calculateCategoryPercentagesByFrequency(filteredTransactions, frequency);

        return categoryPercentages;
    }


    private Date getDefaultStartDateForMonthly() {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.MONTH, -11); // Subtract 11 months to move to the same month in the previous year
        cal.set(Calendar.DAY_OF_MONTH, 1); // Set to the first day of that month
        return cal.getTime();
    }

    private Date getDefaultStartDateForDaily() {
        Calendar cal = Calendar.getInstance();
        cal.add(Calendar.DAY_OF_MONTH, -6); // Subtract 6 days to include the last 7 days
        return cal.getTime();
    }

}


