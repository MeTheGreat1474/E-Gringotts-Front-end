package dev.prisonerofum.EGRINGOTTS.Transaction;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Repository
public interface TransactionRepository extends MongoRepository<Transaction, ObjectId> {

    List<Transaction> findByUserID(String userID);

    List<Transaction> findByUserIDAndTransactionDateBetween(String userID, Date startDate, Date endDate);

    // Find transactions within the specified amount range
    @Query("{ 'amount' : { $gte: ?0, $lte: ?1 } }")
    List<Transaction> findTransactionsByUserIDAndAmountRange(String userID, double minAmount, double maxAmount);

    List<Transaction> findByUserIDAndCategory(String userID, TransactionCategory category);

    long countByTransactionDateBetween(Instant instant, Instant instant1);

    Optional<String> findById(String transactionId);
}

