package dev.prisonerofum.EGRINGOTTS.Account;

import dev.prisonerofum.EGRINGOTTS.Card.Card;
import dev.prisonerofum.EGRINGOTTS.Card.CardRepository;
import dev.prisonerofum.EGRINGOTTS.EmailService;
import dev.prisonerofum.EGRINGOTTS.Transaction.TransactionService;
import dev.prisonerofum.EGRINGOTTS.User.*;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    @Autowired                                  // intialized the EGringottsRepository
    private AccountRepository<User> accountRepository;
    @Autowired
    private CardRepository cardRepository;
    @Autowired
    TransactionService transactionService;
    @Autowired
    EmailService emailService;


    public List<Account<User>> createAccount(Account<User> account) {
        return accountRepository.findAll();
    }
    public Optional<Account<User>> singleAccount(ObjectId id){ //optional is used to avoid null pointer exception
        return accountRepository.findById(id);
    }

    public Optional<Account<User>> singleAccount2(String username){ //optional is used to avoid null pointer exception
        Optional<Account<User>> account = accountRepository.findByUsername(username);
        if(account.isPresent()){
            return account;
        }
        return null;
    }

    public Optional<Account<User>> checkLogin(String username, String password){
        Optional<Account<User>> account = accountRepository.findByUsername(username);
        if(account.isPresent()){
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if(passwordEncoder.matches(password, account.get().getPassword())){

                User user = account.get().getUser();
                if (user instanceof Goblin goblin) {
                    update(goblin);}
                return account;
            }
        }
        return Optional.empty();
    }

    public Optional<Account<User>> signUp(String fullname,String username, String phone,String email,String DOB, String password, String address, String pin){

        Optional<Account<User>> account = accountRepository.findByUsername(username);
        if(account.isEmpty()){
            Account<User> newAccount = new Account<User>();
            newAccount.setFullName(fullname);
            newAccount.setPhone(phone);
            newAccount.setDOB(DOB);
            newAccount.setUsername(username);
            newAccount.setPassword(password);
            newAccount.setEmail(email);
            newAccount.setAddress(address);
            newAccount.setPin(pin);         // Set the encrypted PIN
            newAccount.generateUserId();
            newAccount.setBalance(0.0);

            UserFactory userFactory = new SilverSnitchFactory();
            User user = userFactory.createUser();
//            newAccount.setCurrency("Knut");
            newAccount.setUser(user);

            // Create a new Card object
            Card newCard = new Card();
            newCard.generateCardNumber();
            newCard.generateCardCVV();
            newCard.generateCardExpiry();
            newCard.setCardHolder(newAccount);
            newCard.setCardId(newAccount);
            newAccount.setCard(newCard);

            emailService.sendSimpleMessage(email, "Welcome to EGringotts",
                    "<div style='font-family: Arial, sans-serif;'>" +
                            "<h1 style='color: #4a4a4a;'>Hello " + fullname + " 👋</h1>" +
                            "<h2 style='color: #4a4a4a;'>Thank you for signing up with EGringotts. Your account has been successfully created. 🎉</h2>" +
                            "<h3 style='color: #4a4a4a;'>Your account details are as follows:</h3>" +
                            "<p style='color: #4a4a4a;'>Username: " + username + " 📛</p>" +
                            "<p style='color: #4a4a4a;'>Phone: " + phone + " 📞</p>" +
                            "<p style='color: #4a4a4a;'>Email: " + email + " 📧</p>" +
                            "<p style='color: #4a4a4a;'>DOB: " + DOB + " 🎂</p>" +
                            "<p style='color: #4a4a4a;'>Address: " + address + " 🏠</p>" +
                            "<p style='color: #4a4a4a;'>Please keep your account details safe and do not share them with anyone. 🔒</p>" +
                            "<p style='color: #4a4a4a;'>Regards,</p>" +
                            "<p style='color: #4a4a4a;'>EGringotts Team 🏦</p>" +
                            "<p style='color: #4a4a4a;'>This is an auto-generated email. Please do not reply to this email. 🚫</p>" +
                            "</div>");

            accountRepository.insert(newAccount);
            return Optional.of(newAccount);
        }
        return Optional.empty();
    }

    public Optional<Account<User>> getUserAccount(String username) {
        return accountRepository.findByUsername(username);
    }

    public void updateUserAccount(Account<User> account) {
        accountRepository.save(account);
    }

    public boolean verifyPin(String username, String pin) {
        Optional<Account<User>> account = accountRepository.findByUsername(username);
        if (account.isPresent()) {
            return account.get().checkPin(pin);
        }
        return false;
    }

    public List<Account<User>> findAccountsByContactInfo(String contactInfo) {
        return accountRepository.findByUserIdAndPhoneOrEmailOrUsername(contactInfo,contactInfo, contactInfo, contactInfo)
                .orElse(Collections.emptyList());
    }

    public String getExpiryDate(String username) {
        Optional<Account<User>> account = accountRepository.findByUsername(username);
        if(account.isPresent()){
            SimpleDateFormat sdf = new SimpleDateFormat("MM/yy");
            return sdf.format(account.get().getCard().getCardExpiry());
        }

        return null;
    }
    public List<Account<User>> getAllAccount(){
        return accountRepository.findAll();
    }

    public long countUsers() {
        return  accountRepository.count();
    }

    public long countCards() {
//        return  cardRepository.count();
        return countUsers();
    }

    public void update(Goblin goblin){
        goblin.setNumOfCards(countCards());
        goblin.setNumOfUsers(countUsers());
        goblin.setNumOfTransactionsPerDay(transactionService.countTransactionsPerDay());
        goblin.setNumOfTransactionsPerMonth(transactionService.countTransactionsPerMonth());
        goblin.setNumOfTransactionsPerYear(transactionService.countTransactionsPerYear());
    }

    public double reload(String username, double amount){
        Optional<Account<User>> account = accountRepository.findByUsername(username);
        if(account.isPresent()){
            Account<User> acc = account.get();
            acc.reload(amount);
            accountRepository.save(acc);
            return acc.getBalance();
        }
        return -1;
    }



}
