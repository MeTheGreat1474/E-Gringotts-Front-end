package dev.prisonerofum.EGRINGOTTS.Transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CurrencyExchangeService {

    @Autowired
    private CurrencyGraphRepository currencyGraphRepository;

    private CurrencyGraph<String> graph;

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

    public ExchangeResponse exchangeCurrency(String fromCurrency, String toCurrency, double amount) {
        if (graph == null) {
            throw new RuntimeException("Currency graph not initialized.");
        }

        double exchangedValue = graph.exchange(fromCurrency, toCurrency, amount);
        double processingFee = graph.calculateProcessingFee(fromCurrency, toCurrency, amount);

        if (exchangedValue == -1 || processingFee == -1) {
            throw new IllegalArgumentException("Unable to perform exchange or calculate processing fee.");
        }

        return new ExchangeResponse(fromCurrency, toCurrency, amount, exchangedValue, processingFee);
    }
}



