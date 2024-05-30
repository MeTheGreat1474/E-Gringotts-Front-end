package dev.prisonerofum.EGRINGOTTS.Transaction;

import dev.prisonerofum.EGRINGOTTS.Account.Account;
import dev.prisonerofum.EGRINGOTTS.Account.AccountRepository;
import dev.prisonerofum.EGRINGOTTS.User.User;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class CurrencyExchangeService {

    @Autowired
    private CurrencyGraphRepository currencyGraphRepository;
    @Autowired
    private AccountRepository accountRepository;

    private TransactionRepository transactionRepository;

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
        // Check if the currency graph is initialized
        if (graph == null) {
            throw new RuntimeException("Currency graph not initialized.");
        }

        // Validate input currencies
        if (fromCurrency == null || toCurrency == null) {
            throw new IllegalArgumentException("Currency cannot be null");
        }

        // Retrieve user account
        Optional<Account<User>> optionalAccount = accountRepository.findByUserId(userId);
        if (!optionalAccount.isPresent()) {
            throw new IllegalArgumentException("User account not found");
        }
        Account<User> account = optionalAccount.get();

        // Perform the currency exchange
        double convertedAmount = graph.exchange(fromCurrency, toCurrency, amount);
        double processingFee = graph.calculateProcessingFee(fromCurrency, toCurrency, amount);

        // Validate exchanged value and processing fee
        if (convertedAmount < 0 || processingFee < 0) {
            throw new IllegalArgumentException("Unable to perform exchange or calculate processing fee.");
        }

        // Calculate total deduction
        double totalDeduction = amount + processingFee;
        if (account.getBalance() < totalDeduction) {
            throw new IllegalArgumentException("Insufficient balance");
        }

        // Update user account balance
        account.setBalance(account.getBalance() - totalDeduction);
        accountRepository.save(account);

        // Return the result of the exchange
        return new ExchangeResponse(account, convertedAmount, processingFee);
    }
}




