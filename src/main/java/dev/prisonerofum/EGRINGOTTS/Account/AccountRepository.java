package dev.prisonerofum.EGRINGOTTS.Account;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository             //to specify that this is a repository
public interface AccountRepository extends MongoRepository<Account, ObjectId> {

    Optional<Account> findByUsername(String username);          //find account by username


}
