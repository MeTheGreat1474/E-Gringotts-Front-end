package dev.prisonerofum.EGRINGOTTS.Transaction;

import java.util.*;

public class    CurrencyConversion {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Get currencies and exchange rates input from the user
        List<String[]> currencies = new ArrayList<>();
        System.out.println("Enter currency pairs and exchange rates (e.g., Knut Sickle 29 0.01):");
        System.out.println("Enter 'done' when finished.");
        while (true) {
            String input = scanner.nextLine().trim();
            if (input.equals("done")) {
                break;
            }
            String[] parts = input.split("\\s+");
            if (parts.length == 4) {
                currencies.add(parts);
            } else {
                System.out.println("Invalid input. Please enter again.");
            }
        }

        // Get fromCurrency, toCurrency, and valueExchange input from user
        System.out.print("Enter from currency: ");
        String fromCurrency = scanner.nextLine().trim();
        System.out.print("Enter to currency: ");
        String toCurrency = scanner.nextLine().trim();
        System.out.print("Enter value to exchange: ");
        double valueExchange = scanner.nextDouble();

        // Create the CurrencyGraph
        CurrencyGraph<String> graph = new CurrencyGraph<>();
        for (String[] currency : currencies) {
            graph.addCurrency(currency[0], currency[1], Double.parseDouble(currency[2]), Double.parseDouble(currency[3]));
        }

        // Perform currency exchange
        double exchangeValue = graph.exchange(fromCurrency, toCurrency, valueExchange);

        // Calculate processing fee
        double processingFee = valueExchange * Double.parseDouble(currencies.get(0)[3]) +
                                valueExchange * Double.parseDouble(currencies.get(1)[3]);

        // Print the result
        System.out.println(valueExchange + " " + fromCurrency + " = " + exchangeValue + " " + toCurrency +
                            ", processing fee to charge = " + processingFee + " " + fromCurrency);

        scanner.close();
    }
}
