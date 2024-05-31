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
    @Query("{ 'userID' : ?0, 'date' : { $gte: ?1, $lte: ?2 } }")
    List<Transaction> findByUserIDAndTransactionDateBetween(String userId, Date startDate, Date endDate);

    // Find transactions within the specified amount range
    @Query("{ 'userID' : ?0, 'amount' : { $gte: ?1, $lte: ?2 } }")
    List<Transaction> findTransactionsByUserIDAndAmountRange(String userId, double minAmount, double maxAmount);

    List<Transaction> findByUserIDAndCategory(String userId, TransactionCategory category);

    long count();

    long countTransactionsByAmountBetween(double minAmount,double maxAmount);

//    @Query("{$or: [{'userID': ?0, 'receiverID': ?1}, {'senderID': ?1, 'userID': ?0}]}")
//    List<Transaction> findTransactionsByUserIDAndReceiverID(String userID, String receiverID);

    @Query("{'userID': ?0, 'receiverID': ?1}")
    List<Transaction> findTransactionsByUserIDAndReceiverID(String userID, String receiverID);

}

