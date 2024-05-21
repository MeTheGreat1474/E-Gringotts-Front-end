package dev.prisonerofum.EGRINGOTTS.Transaction;

import lombok.Data;

@Data
public class ExchangeResponse {
    private String fromCurrency;
    private String toCurrency;
    private double amount;
    private double exchangedValue;
    private double processingFee;

    public ExchangeResponse(String fromCurrency, String toCurrency, double amount, double exchangedValue, double processingFee) {
        this.fromCurrency = fromCurrency;
        this.toCurrency = toCurrency;
        this.amount = amount;
        this.exchangedValue = exchangedValue;
        this.processingFee = processingFee;
    }

    // Getters and setters
    public String getFromCurrency() {
        return fromCurrency;
    }

    public void setFromCurrency(String fromCurrency) {
        this.fromCurrency = fromCurrency;
    }

    public String getToCurrency() {
        return toCurrency;
    }

    public void setToCurrency(String toCurrency) {
        this.toCurrency = toCurrency;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public double getExchangedValue() {
        return exchangedValue;
    }

    public void setExchangedValue(double exchangedValue) {
        this.exchangedValue = exchangedValue;
    }

    public double getProcessingFee() {
        return processingFee;
    }

    public void setProcessingFee(double processingFee) {
        this.processingFee = processingFee;
    }
}

