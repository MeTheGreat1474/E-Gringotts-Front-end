package dev.prisonerofum.EGRINGOTTS;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
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

    public Optional<Account> singleAccount2(String userID){ //optional is used to avoid null pointer exception
        return eGringottsRepository.findByUsername(userID);
    }
}
