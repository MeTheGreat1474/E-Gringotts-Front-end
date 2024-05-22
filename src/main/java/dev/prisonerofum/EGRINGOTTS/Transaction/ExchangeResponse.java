package dev.prisonerofum.EGRINGOTTS.Transaction;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ExchangeResponse {
    private String fromCurrency;
    private String toCurrency;
    private double amount;
    private double exchangedValue;
    private double processingFee;
}

