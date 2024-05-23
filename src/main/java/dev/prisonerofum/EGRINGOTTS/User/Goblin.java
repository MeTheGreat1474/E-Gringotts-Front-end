package dev.prisonerofum.EGRINGOTTS.User;

import dev.prisonerofum.EGRINGOTTS.Account.Account;
import dev.prisonerofum.EGRINGOTTS.Account.AccountRepository;
import dev.prisonerofum.EGRINGOTTS.Account.AccountService;
import dev.prisonerofum.EGRINGOTTS.Transaction.TransactionService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Data
public class Goblin implements User{

    private long numOfUsers;
    private long numOfCards;
    private long numOfTransactionsPerDay;
    private long numOfTransactionsPerMonth;
    private long numOfTransactionsPerYear;



}
