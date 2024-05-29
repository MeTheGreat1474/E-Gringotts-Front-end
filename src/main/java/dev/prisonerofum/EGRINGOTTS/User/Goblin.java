package dev.prisonerofum.EGRINGOTTS.User;

import com.fasterxml.jackson.annotation.JsonProperty;
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

    @JsonProperty
    private String accountType = "Goblin";

    private long numOfUsers;
    private long numOfCards;
    private long numOfTransactions;
    private long numOfTransactionsAmountRange0to100;
    private long numOfTransactionsAmountRange101to1000;




}
