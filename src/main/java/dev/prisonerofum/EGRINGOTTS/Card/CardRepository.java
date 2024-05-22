package dev.prisonerofum.EGRINGOTTS.Card;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CardRepository extends MongoRepository<Card, ObjectId> {

    Optional<Card> findByUserId(String userId);
}
