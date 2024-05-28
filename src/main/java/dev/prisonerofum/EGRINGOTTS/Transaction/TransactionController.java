package dev.prisonerofum.EGRINGOTTS.Transaction;


import dev.prisonerofum.EGRINGOTTS.Account.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import dev.prisonerofum.EGRINGOTTS.Transaction.CurrencyGraphRepository;

import java.util.*;
import java.text.SimpleDateFormat;

@CrossOrigin(origins = "*", allowedHeaders = "*")           //CrossOrigin is used to handle the request from a different origin
@RestController
@RequestMapping("/Transaction")
public class TransactionController{

    @Autowired                                              //Auto intialize accountService
    private TransactionService transactionService;

    @PostMapping("/transactions/new")
    public ResponseEntity<TransactionResponse> makeNewTransaction(
            @RequestParam String senderId,
            @RequestParam String receiverId,
            @RequestParam Double amount,
            @RequestParam TransactionCategory category,
            @RequestParam String transactionType,
            @RequestParam String remarks) {

        try {
            TransactionResponse response = transactionService.makeNewTransaction(senderId, receiverId, amount, category, transactionType, remarks);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new TransactionResponse(null, e.getMessage()));
        }
    }

    @PostMapping("/reload")
    public ResponseEntity<String> reloadAccount(
            @RequestParam String userId,
            @RequestParam Double amount,
            @RequestParam String remarks) {

        try {
            String transactionId = transactionService.reloadAccount(userId, amount, remarks);
            return ResponseEntity.ok("Reload successful. Transaction ID: " + transactionId);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/history/{userId}")
    public ResponseEntity<List<Transaction>> getTransactionsHistory(@PathVariable String userId) {
        List<Transaction> transactions = transactionService.getTransactionsHistory(userId);

        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping("/date-range")
    public ResponseEntity<List<Transaction>> getTransactionsByDateRange(
            @RequestParam("userID") String userID,
            @RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        List<Transaction> transactions = transactionService.getTransactionsByDateRange(userID, startDate, endDate);
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping("/amount-range")
    public ResponseEntity<List<Transaction>> getTransactionsByAmountRange(
            @RequestParam("userID") String userID,
            @RequestParam("minAmount") double minAmount,
            @RequestParam("maxAmount") double maxAmount) {
        List<Transaction> transactions = transactionService.getTransactionsByAmountRange(userID, minAmount, maxAmount);

        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping("/category")
    public ResponseEntity<List<Transaction>> getTransactionsByCategory(
            @RequestParam("userID") String userID,
            @RequestParam("category") TransactionCategory category) {
        List<Transaction> transactions = Collections.unmodifiableList(transactionService.getTransactionsByCategory(userID, category));
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
    public ResponseEntity<String> addCurrencyPair(@RequestBody List<String[]> currencies) {
        currencyExchangeService.addCurrencyPairs(currencies);
        return new ResponseEntity<>("Currency pairs added successfully", HttpStatus.OK);
    }

    @GetMapping("/exchange")
    public ResponseEntity<String> exchangeCurrency(
            @RequestParam String fromCurrency,
            @RequestParam String toCurrency,
            @RequestParam double amount) {

        ExchangeResponse response = currencyExchangeService.exchangeCurrency(fromCurrency, toCurrency, amount);
        String result = String.format("%f %s = %f %s, processing fee to charge = %f %s",
                response.getAmount(), response.getFromCurrency(),
                response.getExchangedValue(), response.getToCurrency(),
                response.getProcessingFee(), response.getFromCurrency());
        return new ResponseEntity<>(result, HttpStatus.OK);
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


