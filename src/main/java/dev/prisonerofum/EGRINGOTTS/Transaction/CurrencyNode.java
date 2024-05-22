package dev.prisonerofum.EGRINGOTTS.Transaction;

import java.io.Serializable;
import java.util.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;

// Utility class to represent a pair of elements
@Data
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
@Data
class CurrencyNode<T>  implements Serializable{


    T currency;
    List<ExchangeRate<T>> exchangeRates;

    public CurrencyNode() {
        exchangeRates = new ArrayList<>();
    }

    public CurrencyNode(T currency) {
        this.currency = currency;
        exchangeRates = new ArrayList<>();
    }

    public void addExchangeRate(ExchangeRate<T> rate) {
        exchangeRates.add(rate);
    }
}

// Class to represent exchange rates between currencies

class ExchangeRate<T> implements Serializable{

    T targetNodeIdentifier;
    double value;
    double processingFee;

    public ExchangeRate(T targetNodeIdentifier, double value, double processingFee) {
        this.targetNodeIdentifier = targetNodeIdentifier;
        this.value = value;
        this.processingFee = processingFee;
    }
}