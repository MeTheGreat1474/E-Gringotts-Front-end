package dev.prisonerofum.EGRINGOTTS.Transaction;

import dev.prisonerofum.EGRINGOTTS.Account.Account;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TransactionRepository extends MongoRepository<Transaction, ObjectId> {
}
