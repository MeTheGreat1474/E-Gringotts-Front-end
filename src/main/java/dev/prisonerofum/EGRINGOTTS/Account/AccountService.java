package dev.prisonerofum.EGRINGOTTS.Account;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {
    @Autowired                                  // intialized the EGringottsRepository
    private AccountRepository accountRepository;

    public List<Account> createAccount(Account account) {
        return accountRepository.findAll();
    }
    public Optional<Account> singleAccount(ObjectId id){ //optional is used to avoid null pointer exception
        return accountRepository.findById(id);
    }

    public Optional<Account> singleAccount2(String username){ //optional is used to avoid null pointer exception
        return accountRepository.findByUsername(username);
    }

    public Optional<Account> checkLogin(String username, String password){
        Optional<Account> account = accountRepository.findByUsername(username);
        if(account.isPresent()){
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            if(passwordEncoder.matches(password, account.get().getPassword())){
                return account;
            }
        }
        return Optional.empty();
    }

    public Optional<Account> signUp(String username, String email, String password, String address, String pin){
        Optional<Account> account = accountRepository.findByUsername(username);
        if(account.isEmpty()){
            Account newAccount = new Account();
            newAccount.setUsername(username);
            newAccount.setPassword(password);
            newAccount.setEmail(email);
            newAccount.setAddress(address);
            newAccount.setPin(pin); // Set the encrypted PIN
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
        return accountRepository.findByPhoneNumberOrEmailOrUserId(contactInfo, contactInfo, contactInfo);
    }

}
