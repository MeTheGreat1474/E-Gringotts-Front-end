package dev.prisonerofum.EGRINGOTTS.Account;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class AccountService {
    @Autowired // intialized the EGringottsRepository
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
            if(account.get().getPassword().equals(password)){
                return account;
            }
        }
        return Optional.empty();
    }

    public Optional<Account> signup(String username, String email, String password, Date DOB, String address){
        Optional<Account> account = accountRepository.findByUsername(username);
        if(account.isEmpty()){
            Account newAccount = new Account();
            newAccount.setUsername(username);
            newAccount.setPassword(password);
            newAccount.setEmail(email);
//            newAccount.setDOB(DOB);
            newAccount.setAddress(address);
            accountRepository.insert(newAccount);
            return Optional.of(newAccount);
        }
        return Optional.empty();
    }
}
