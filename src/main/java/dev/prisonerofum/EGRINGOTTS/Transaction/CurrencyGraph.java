package dev.prisonerofum.EGRINGOTTS.Transaction;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.*;

// Graph class to represent the currency exchange graph
@Document(collection="Graph")              //map to collection in mongodb
@Data                                      //take care of all getter and setter
@AllArgsConstructor                        //constructor with all argument
@NoArgsConstructor
class CurrencyGraph<T> {

    @Autowired
    private List<CurrencyNode<T>> nodes;

    public void addCurrency(T fromCurrency, T toCurrency, double value, double processingFee) {
        CurrencyNode<T> node1 = getNode(fromCurrency);
        CurrencyNode<T> node2 = getNode(toCurrency);

        ExchangeRate<T> rate1 = new ExchangeRate<>(node2, value, processingFee);
        ExchangeRate<T> rate2 = new ExchangeRate<>(node1, 1.0 / value, processingFee);

        node1.exchangeRates.add(rate1);
        node2.exchangeRates.add(rate2);
    }

    private CurrencyNode<T> getNode(T currency) {
        for (CurrencyNode<T> node : nodes) {
            if (node.currency.equals(currency)) {
                return node;
            }
        }
        CurrencyNode<T> newNode = new CurrencyNode<>(currency);
        nodes.add(newNode);
        return newNode;
    }

    public double exchange(T fromCurrency, T toCurrency, double amount) {
        CurrencyNode<T> startNode = getNode(fromCurrency);
        CurrencyNode<T> endNode = getNode(toCurrency);

        // Perform BFS traversal to find the shortest path
        Queue<Pair<CurrencyNode<T>, Double>> queue = new LinkedList<>();
        List<Pair<CurrencyNode<T>, Double>> amounts = new LinkedList<>();
        List<CurrencyNode<T>> visited = new LinkedList<>();

        queue.offer(new Pair<>(startNode, amount));
        amounts.add(new Pair<>(startNode, amount));

        while (!queue.isEmpty()) {
            Pair<CurrencyNode<T>, Double> pair = queue.poll();
            CurrencyNode<T> currentNode = pair.getFirst();
            double currentAmount = pair.getSecond();

            if (currentNode == endNode) {
                return currentAmount;
            }
            visited.add(currentNode);

            for (ExchangeRate<T> rate : currentNode.exchangeRates) {
                CurrencyNode<T> neighbour = rate.targetNode;
                double exchangeRate = rate.value;
                double neighbourAmount = currentAmount * exchangeRate;

                if (!visited.contains(neighbour)) {
                    queue.offer(new Pair<>(neighbour, neighbourAmount));
                    amounts.add(new Pair<>(neighbour, neighbourAmount));
                }
            }
        }
        return -1; // Cannot exchange to desired currency
    }

    public double calculateProcessingFee(T from, T to, double amount) {
        CurrencyNode<T> fromNode = getNode(from);
        CurrencyNode<T> toNode = getNode(to);

        double fee = 0;
        for (ExchangeRate<T> rate : fromNode.exchangeRates) {
            if (rate.targetNode.equals(toNode)) {
                fee += amount * rate.processingFee;
            }
        }
        return fee;
    }
}

