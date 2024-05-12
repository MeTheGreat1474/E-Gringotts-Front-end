package dev.prisonerofum.EGRINGOTTS.Transaction;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;


@Repository
public interface TransactionRepository extends MongoRepository<Transaction, ObjectId> {

    List<Transaction> findByUserId(String userID);

    List<Transaction> findByTransactionDateBetween(Date startDate, Date endDate);

    // Find transactions within the specified amount range
    @Query("{ 'amount' : { $gte: ?0, $lte: ?1 } }")
    List<Transaction> findTransactionsByAmountRange(double minAmount, double maxAmount);

    List<Transaction> findByCategory(TransactionCategory category);
}

