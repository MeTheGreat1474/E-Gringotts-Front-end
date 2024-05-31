package dev.prisonerofum.EGRINGOTTS.Transaction;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;


@Repository
public interface TransactionRepository extends MongoRepository<Transaction, ObjectId> {

    List<Transaction> findByUserID(String userId);

    Optional<Transaction> findByTransactionID(String transactionId);

    List<Transaction> findByUserIDAndTransactionDateBetween(String userId, Date startDate, Date endDate);

    // Find transactions within the specified amount range
    @Query("{ 'amount' : { $gte: ?0, $lte: ?1 } }")
    List<Transaction> findTransactionsByUserIDAndAmountRange(String userId, double minAmount, double maxAmount);

    List<Transaction> findByUserIDAndCategory(String userId, TransactionCategory category);

    long count();

    long countTransactionsByAmountBetween(double minAmount,double maxAmount);

    @Query("{$or: [{'senderId': ?0, 'receiverId': ?1}, {'senderId': ?1, 'receiverId': ?0}]}")
    List<Transaction> findByUserIdAndOtherUserId(String userId, String otherUserId);

}

