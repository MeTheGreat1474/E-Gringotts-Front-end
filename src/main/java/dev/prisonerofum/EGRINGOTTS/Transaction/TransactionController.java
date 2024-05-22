package dev.prisonerofum.EGRINGOTTS.Transaction;


import dev.prisonerofum.EGRINGOTTS.Account.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import dev.prisonerofum.EGRINGOTTS.Transaction.CurrencyGraphRepository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")           //CrossOrigin is used to handle the request from a different origin
@RestController
@RequestMapping("/Transaction")
public class TransactionController{
    @Autowired                                              //Auto intialize accountService
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
}


