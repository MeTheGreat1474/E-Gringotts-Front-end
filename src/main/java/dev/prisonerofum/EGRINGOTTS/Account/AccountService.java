package dev.prisonerofum.EGRINGOTTS.Account;

import dev.prisonerofum.EGRINGOTTS.Card.Card;
import dev.prisonerofum.EGRINGOTTS.Card.CardRepository;
import dev.prisonerofum.EGRINGOTTS.User.*;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService {


    @Autowired                                  // intialized the EGringottsRepository
    private AccountRepository accountRepository;
    private CardRepository cardRepository;


public List<Account> createAccount(Account account) {
        return accountRepository.findAll();
    }
    public Optional<Account> singleAccount(ObjectId id){ //optional is used to avoid null pointer exception
        return accountRepository.findById(id);
    }

    public Optional<Account> singleAccount2(String username){ //optional is used to avoid null pointer exception
        Optional<Account> account = accountRepository.findByUsername(username);
        if(account.isPresent()){
            return account;
        }
        return null;
    }

    public Optional<Account> checkLogin(String username, String password){
        Optional<Account> account = accountRepository.findByUsername(username);
        if(account.isPresent()){
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if(passwordEncoder.matches(password, account.get().getPassword())){

                if(username == "admin") ;
                return account;
            }
        }
        return Optional.empty();
    }

    public Optional<Account> signUp(String fullname,String username, String phone,String email,String DOB, String password, String address, String pin){

        Optional<Account> account = accountRepository.findByUsername(username);
        if(account.isEmpty()){
            Account newAccount = new Account();
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

            accountRepository.insert(newAccount);
            return Optional.of(newAccount);
        }
        return Optional.empty();
    }

    public boolean verifyPin(String username, String pin) {
        Optional<Account> account = accountRepository.findByUsername(username);
        if(account.isPresent()){
            return account.get().checkPin(pin);
        }
        return false;
    }

    public Optional<Account> findAccountByContactInfo(String contactInfo) {
        return accountRepository.findByPhoneOrEmailOrUsername(contactInfo, contactInfo, contactInfo);
    }

    public String getExpiryDate(String username) {
        Optional<Account> account = accountRepository.findByUsername(username);
        if(account.isPresent()){
            SimpleDateFormat sdf = new SimpleDateFormat("MM/yy");
            return sdf.format(account.get().getCard().getCardExpiry());
        }

        return null;
    }
    public List<Account> getAllAccount(){
        return accountRepository.findAll();
    }

    public long countUsers() {
        return  accountRepository.count();
    }

    public long countCards() {
        return  cardRepository.count();
    }
}
