package dev.prisonerofum.EGRINGOTTS.Transaction;

import java.util.*;

// Graph class to represent the currency exchange graph
class CurrencyGraph<T> {
    private List<CurrencyNode<T>> nodes;

    public CurrencyGraph() {
        nodes = new ArrayList<>();
    }

    public void addCurrency(T currency1, T currency2, double value, double processingFee) {
        CurrencyNode<T> node1 = getNode(currency1);
        CurrencyNode<T> node2 = getNode(currency2);

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
}
