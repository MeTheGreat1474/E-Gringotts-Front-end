package dev.prisonerofum.EGRINGOTTS.Transaction;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CurrencyExchangeService {

    @Autowired
    private CurrencyGraphRepository currencyGraphRepository;

    public CurrencyGraph<String> addCurrencyPairs(List<String[]> currencies) {
        Optional<CurrencyGraph<String>> optionalGraph = currencyGraphRepository.findByGraphId("0312269844554901");

        CurrencyGraph<String> graph = optionalGraph.orElse(new CurrencyGraph<>());
        for (String[] currency : currencies) {
            graph.addCurrency(currency[0], currency[1], Double.parseDouble(currency[2]), Double.parseDouble(currency[3]));
        }
        return currencyGraphRepository.save(graph);
    }

    public double exchangeCurrency(String fromCurrency, String toCurrency, double amount) {
        Optional<CurrencyGraph<String>> optionalGraph = currencyGraphRepository.findByGraphId("0312269844554901");
        if (optionalGraph.isPresent()) {
            CurrencyGraph<String> graph = optionalGraph.get();
            double exchangedValue = graph.exchange(fromCurrency, toCurrency, amount);
            return exchangedValue;
        } else {
            throw new RuntimeException("Currency graph not found.");
        }
    }
}

