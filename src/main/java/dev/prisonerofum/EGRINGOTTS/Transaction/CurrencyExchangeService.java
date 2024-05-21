package dev.prisonerofum.EGRINGOTTS.Transaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CurrencyExchangeService {

    @Autowired
    private CurrencyGraphRepository currencyGraphRepository;

    public CurrencyGraph<String> addCurrencyPairs(List<String[]> currencies) {
        CurrencyGraph<String> graph = new CurrencyGraph<>();
        for (String[] currency : currencies) {
            graph.addCurrency(currency[0], currency[1], Double.parseDouble(currency[2]), Double.parseDouble(currency[3]));
        }
        return currencyGraphRepository.insert(graph);
    }

    public ExchangeResponse exchangeCurrency(String fromCurrency, String toCurrency, double amount) {
        Optional<CurrencyGraph> optionalGraph = currencyGraphRepository.findAll().stream().findFirst();
        if (optionalGraph.isPresent()) {
            CurrencyGraph<String> graph = optionalGraph.get();
            double exchangedValue = graph.exchange(fromCurrency, toCurrency, amount);
            double processingFee = graph.calculateProcessingFee(fromCurrency, toCurrency, amount);
            return new ExchangeResponse(fromCurrency, toCurrency, amount, exchangedValue, processingFee);
        } else {
            throw new RuntimeException("Currency graph not found.");
        }
    }
}

