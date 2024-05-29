package dev.prisonerofum.EGRINGOTTS.Transaction;

import dev.prisonerofum.EGRINGOTTS.Account.Account;
import dev.prisonerofum.EGRINGOTTS.Account.AccountRepository;
import dev.prisonerofum.EGRINGOTTS.Account.AccountService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CurrencyExchangeService {

    @Autowired
    private CurrencyGraphRepository currencyGraphRepository;

    private AccountService accountService;

    private Account account;

    private TransactionService transactionService;

    private CurrencyGraph<String> graph;

    @PostConstruct
    public void init() {
        Optional<CurrencyGraph<String>> optionalGraph = currencyGraphRepository.findByGraphId("0312269844554901");
        if (optionalGraph.isPresent()) {
            graph = optionalGraph.get();
        } else {
            graph = new CurrencyGraph<>("0312269844554901", new ArrayList<>());
            currencyGraphRepository.save(graph);
        }
    }

    public CurrencyGraph<String> getGraph() {
        return graph;
    }

    public CurrencyGraph<String> addCurrencyPairs(List<String[]> currencies) {
        if (graph == null) {
            graph = new CurrencyGraph<>("0312269844554901", new ArrayList<>());
        }

        for (String[] currency : currencies) {
            graph.addCurrency(currency[0], currency[1], Double.parseDouble(currency[2]), Double.parseDouble(currency[3]));
        }
        graph = currencyGraphRepository.save(graph);
        return graph;
    }

    public ExchangeResponse exchangeCurrency(String userId, String fromCurrency, String toCurrency, double amount) {
        if (graph == null) {
            throw new RuntimeException("Currency graph not initialized.");
        }

        if (fromCurrency == null || toCurrency == null) {
            throw new IllegalArgumentException("Currency cannot be null");
        }

        // Retrieve the user's account
        String userAccount = account.getUserId();
        if (userAccount == null) {
            throw new IllegalArgumentException("User account not found");
        }

        // Check if the user has sufficient balance
        double userBalance = account.getBalance();
        if (userBalance < amount) {
            throw new IllegalArgumentException("Insufficient balance");
        }

        // Perform the currency exchange
        double exchangedValue = graph.exchange(fromCurrency, toCurrency, amount);
        double processingFee = graph.calculateProcessingFee(fromCurrency, toCurrency, amount);

        if (exchangedValue == -1 || processingFee == -1) {
            throw new IllegalArgumentException("Unable to perform exchange or calculate processing fee.");
        }

        // Deduct the amount and processing fee from the user's balance
        double totalDeduction = amount + processingFee;
        account.setBalance(userBalance - totalDeduction);

        // Update the user's account balance in the database
        accountService.updateUserAccount(account);

        // Create a new transaction record
        String transactionId = transactionService.createTransaction(userId, fromCurrency, toCurrency, amount, exchangedValue, processingFee);

        // Return the exchange response with transaction details
        return new ExchangeResponse(fromCurrency, toCurrency, amount, exchangedValue, processingFee, transactionId, account.getBalance());
    }
}



