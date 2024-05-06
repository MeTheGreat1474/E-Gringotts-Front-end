package dev.prisonerofum.EGRINGOTTS;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EGringottsService {
    @Autowired // intialized the EGringottsRepository
    private EGringottsRepository eGringottsRepository;

    public List<Account> createAccount(Account account) {
        return eGringottsRepository.findAll();
    }
    public Optional<Account> singleAccount(ObjectId id){ //optional is used to avoid null pointer exception
        return eGringottsRepository.findById(id);
    }

    public Optional<Account> singleAccount2(String username){ //optional is used to avoid null pointer exception
        return eGringottsRepository.findByUsername(username);
    }

    public Optional<Account> checkLogin(String username, String password){

        Optional<Account> account = eGringottsRepository.findByUsername(username);
        if(account.isPresent()){
            if(account.get().getPassword().equals(password)){
                return account;
            }
        }
        return Optional.empty();
    }

    public Optional<Account> signup(String username, String email, String password,String DOB, String address){
        Optional<Account> account = eGringottsRepository.findByUsername(username);
        if(account.isEmpty()){
            Account newAccount = new Account();
            newAccount.setUsername(username);
            newAccount.setPassword(password);
            newAccount.setEmail(email);
            newAccount.setDOB(DOB);
            newAccount.setAddress(address);

            eGringottsRepository.insert(newAccount);
            return Optional.of(newAccount);
        }
        return Optional.empty();
    }
}
