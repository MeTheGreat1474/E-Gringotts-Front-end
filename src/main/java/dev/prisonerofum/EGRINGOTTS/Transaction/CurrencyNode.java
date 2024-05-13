package dev.prisonerofum.EGRINGOTTS.Transaction;

import java.util.*;

// Node class for representing currencies in the graph
class CurrencyNode<T> {
    T currency;
    List<ExchangeRate<T>> exchangeRates;

    public CurrencyNode(T currency) {
        this.currency = currency;
        exchangeRates = new ArrayList<>();
    }
}
