package dev.prisonerofum.EGRINGOTTS.Account;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository                     //mark as repository
public interface AccountRepository extends MongoRepository<Account, ObjectId> {

    Optional<Account> findByUsername(String username);

    Optional<Account> findByPhoneNumberOrEmailOrUserId(String phoneNumber, String email, String userId);

    Optional<Account> findById(String id);
}
