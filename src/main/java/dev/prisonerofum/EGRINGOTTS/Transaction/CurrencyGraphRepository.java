package dev.prisonerofum.EGRINGOTTS.Transaction;


import dev.prisonerofum.EGRINGOTTS.Account.Account;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CurrencyGraphRepository extends MongoRepository<CurrencyGraph<String>, String> {
    Optional<CurrencyGraph<String>> findByGraphId(String graphId);
}
