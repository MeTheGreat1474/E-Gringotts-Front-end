package dev.prisonerofum.EGRINGOTTS.Transaction;

import java.util.*;

// Utility class to represent a pair of elements
class Pair<T, U> {
    private final T first;
    private final U second;

    public Pair(T first, U second) {
        this.first = first;
        this.second = second;
    }

    public T getFirst() {
        return first;
    }

    public U getSecond() {
        return second;
    }
}

// Node class for representing currencies in the graph
class CurrencyNode<T> {
    T currency;
    List<ExchangeRate<T>> exchangeRates;

    public CurrencyNode(T currency) {
        this.currency = currency;
        exchangeRates = new LinkedList<>();
    }

    public void addExchangeRate(ExchangeRate<T> rate) {
        exchangeRates.add(rate);
    }
}

// Class to represent exchange rates between currencies
class ExchangeRate<T> {
    CurrencyNode<T> targetNode;
    double value;
    double processingFee;

    public ExchangeRate(CurrencyNode<T> targetNode, double value, double processingFee) {
        this.targetNode = targetNode;
        this.value = value;
        this.processingFee = processingFee;
    }
}