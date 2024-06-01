package dev.prisonerofum.EGRINGOTTS.Transaction;

import dev.prisonerofum.EGRINGOTTS.Account.Account;
import dev.prisonerofum.EGRINGOTTS.User.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Random;

@Data
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class ExchangeResponse {
    private final Account<User> userId;
    private double convertedAmount;
    private double processingFee;
}

@Data
@AllArgsConstructor
@NoArgsConstructor
class ExchangeResult {
    private String transactionId;
    private double convertedAmount;
    private double processingFee;
}

