package dev.prisonerofum.EGRINGOTTS.Transaction;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Random;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExchangeResponse {
    private String fromCurrency;
    private String toCurrency;
    private double amount;
    private double exchangedValue;
    private double processingFee;
    private String transactionId;
    private double balance;
}

