package dev.prisonerofum.EGRINGOTTS;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EGringottsRepository extends MongoRepository<Account, ObjectId> {

    Optional<Account> findByUsername(String username);//it should be unique


}
