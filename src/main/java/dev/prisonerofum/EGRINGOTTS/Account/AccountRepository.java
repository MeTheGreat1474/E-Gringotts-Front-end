package dev.prisonerofum.EGRINGOTTS.Account;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository                     //mark as repository
public interface AccountRepository<User> extends MongoRepository<Account<User>, ObjectId> {

    Optional<Account<User>> findByUsername(String username);

    Optional<Account<User>> findByEmail(String email);

    Optional<Account<User>> findByPhone(String phone);

    Optional<List<Account<User>>> findByUserIdAndPhoneOrEmailOrUsername(String userId, String phone, String email, String username);
    /*Optional<Account<User>> findByPhoneOrEmailOrUsername(String phone, String email, String username);

     */

    Optional<Account<User>> findById(String id);
}
