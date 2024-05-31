package dev.prisonerofum.EGRINGOTTS.Transaction;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.Random;

@Document(collection = "CurrencyGraph")
@Data
@NoArgsConstructor
@Component
public class CurrencyGraph<T> implements Serializable {

    @Id
    private String graphId;
    private List<CurrencyNode<T>> nodes = new ArrayList<>();

    // Constructor to initialize graphId and nodes
    public CurrencyGraph(String graphId, List<CurrencyNode<T>> nodes) {
        this.graphId = graphId;
        this.nodes = nodes;
    }

    public void addCurrency(T fromCurrency, T toCurrency, double value, double processingFee) {
        if (fromCurrency == null || toCurrency == null) {
            throw new IllegalArgumentException("Currency cannot be null");
        }
        CurrencyNode<T> node1 = getNode(fromCurrency);
        CurrencyNode<T> node2 = getNode(toCurrency);

        // Check if the exchange rate already exists
        ExchangeRate<T> existingRate1 = findExchangeRate(node1, toCurrency);
        ExchangeRate<T> existingRate2 = findExchangeRate(node2, fromCurrency);

        if (existingRate1 != null) {
            // Update the existing exchange rate
            existingRate1.setValue(value);
            existingRate1.setProcessingFee(processingFee);
        } else {
            // Add the new exchange rate
            ExchangeRate<T> rate1 = new ExchangeRate<>(node2.getCurrency(), value, processingFee);
            node1.addExchangeRate(rate1);
        }

        if (existingRate2 != null) {
            // Update the existing exchange rate
            existingRate2.setValue(1.0 / value);
            existingRate2.setProcessingFee(processingFee);
        } else {
            // Add the new exchange rate
            ExchangeRate<T> rate2 = new ExchangeRate<>(node1.getCurrency(), 1.0 / value, processingFee);
            node2.addExchangeRate(rate2);
        }
    }

    private CurrencyNode<T> getNode(T currency) {
        if (currency == null) {
            throw new IllegalArgumentException("Currency cannot be null");
        }

        for (CurrencyNode<T> node : nodes) {
            if (node.getCurrency().equals(currency)) {
                return node;
            }
        }
        CurrencyNode<T> newNode = new CurrencyNode<>(currency);
        nodes.add(newNode);
        return newNode;
    }

    private ExchangeRate<T> findExchangeRate(CurrencyNode<T> node, T targetCurrency) {
        for (ExchangeRate<T> rate : node.getExchangeRates()) {
            if (rate.getTargetNodeIdentifier().equals(targetCurrency)) {
                return rate;
            }
        }
        return null;
    }

    public double exchange(T fromCurrency, T toCurrency, double amount) {
        if (fromCurrency == null || toCurrency == null) {
            throw new IllegalArgumentException("Currency cannot be null");
        }
        CurrencyNode<T> startNode = getNode(fromCurrency);
        CurrencyNode<T> endNode = getNode(toCurrency);

        Queue<Pair<CurrencyNode<T>, Double>> queue = new LinkedList<>();
        List<CurrencyNode<T>> visited = new ArrayList<>();

        queue.offer(new Pair<>(startNode, amount));

        while (!queue.isEmpty()) {
            Pair<CurrencyNode<T>, Double> pair = queue.poll();
            CurrencyNode<T> currentNode = pair.getFirst();
            double currentAmount = pair.getSecond();

            if (currentNode.equals(endNode)) {
                return currentAmount;
            }
            visited.add(currentNode);

            for (ExchangeRate<T> rate : currentNode.getExchangeRates()) {
                CurrencyNode<T> neighbour = getNode(rate.getTargetNodeIdentifier());
                double exchangeRate = rate.getValue();
                double neighbourAmount = currentAmount * exchangeRate;

                if (!visited.contains(neighbour)) {
                    queue.offer(new Pair<>(neighbour, neighbourAmount));
                }
            }
        }
        return -1; // Cannot exchange to desired currency
    }

    public double calculateProcessingFee(T fromCurrency, T toCurrency, double amount) {
        if (fromCurrency == null || toCurrency == null) {
            throw new IllegalArgumentException("Currency cannot be null");
        }
        CurrencyNode<T> startNode = getNode(fromCurrency);
        CurrencyNode<T> endNode = getNode(toCurrency);

        Queue<Pair<CurrencyNode<T>, Double>> queue = new LinkedList<>();
        List<CurrencyNode<T>> visited = new ArrayList<>();
        List<Pair<CurrencyNode<T>, Double>> fees = new ArrayList<>();

        queue.offer(new Pair<>(startNode, 0.0));
        fees.add(new Pair<>(startNode, 0.0));

        while (!queue.isEmpty()) {
            Pair<CurrencyNode<T>, Double> pair = queue.poll();
            CurrencyNode<T> currentNode = pair.getFirst();
            double currentFee = pair.getSecond();

            if (currentNode.equals(endNode)) {
                return currentFee;
            }
            visited.add(currentNode);

            for (ExchangeRate<T> rate : currentNode.getExchangeRates()) {
                CurrencyNode<T> neighbour = getNode(rate.getTargetNodeIdentifier());
                double neighbourFee = currentFee + amount * rate.getProcessingFee();

                if (!visited.contains(neighbour)) {
                    queue.offer(new Pair<>(neighbour, neighbourFee));
                    fees.add(new Pair<>(neighbour, neighbourFee));
                }
            }
        }
        return -1; // Cannot calculate processing fee
    }

    public void generateGraphId() {
        Random random = new Random();
        StringBuilder userId = new StringBuilder();
        for (int i = 0; i < 16; i++) {
            int digit = random.nextInt(10);
            userId.append(digit);
        }
        this.graphId = userId.toString();
    }
}



