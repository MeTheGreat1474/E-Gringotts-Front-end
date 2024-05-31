package dev.prisonerofum.EGRINGOTTS.Transaction;

import java.io.Serializable;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;
import lombok.NoArgsConstructor;

// Utility class to represent a pair of elements
@Data
class Pair<F, S> {
    private F first;
    private S second;

    public Pair(F first, S second) {
        this.first = first;
        this.second = second;
    }
}

// Node class for representing currencies in the graph
@Data
class CurrencyNode<T> implements Serializable {

    private T currency;
    private List<ExchangeRate<T>> exchangeRates;

    public CurrencyNode() {
        this.exchangeRates = new ArrayList<>();
    }

    public CurrencyNode(T currency) {
        if (currency == null) {
            throw new IllegalArgumentException("Currency cannot be null");
        }
        this.currency = currency;
        this.exchangeRates = new ArrayList<>();
    }

    public void addExchangeRate(ExchangeRate<T> rate) {
        this.exchangeRates.add(rate);
    }
}

// Class to represent exchange rates between currencies
@Data
class ExchangeRate<T> implements Serializable {

    private T targetNodeIdentifier;
    private double value;
    private double processingFee;

    public ExchangeRate(T targetNodeIdentifier, double value, double processingFee) {
        this.targetNodeIdentifier = targetNodeIdentifier;
        this.value = value;
        this.processingFee = processingFee;
    }
}