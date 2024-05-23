package dev.prisonerofum.EGRINGOTTS.User;

import dev.prisonerofum.EGRINGOTTS.Account.AccountRepository;
import dev.prisonerofum.EGRINGOTTS.Account.AccountService;
import dev.prisonerofum.EGRINGOTTS.Transaction.TransactionService;

public class Goblin implements User{

    AccountService accountService;
    TransactionService transactionService;

    private long numOfUsers;
    private long numOfCards;
    private int numOfTransactionsPerDay;
    private int numOfTransactionsPerMonth;
    private int numOfTransactionsPerYear;
    private int numOfTransactionsPerUser;
    private int numOfTransactionsPerCard;
    private int numOfTransactionsPerType;
    private int numOfTransactionsPerAmount;
    private int numOfTransactionsPerBalance;
    private int numOfTransactionsPerDate;
    private int numOfTransactionsPerTime;
    private int numOfTransactionsPerID;

    public void update(){
        this.numOfCards = accountService.countUsers();
        this.numOfUsers = accountService.countCards();
    }








}
