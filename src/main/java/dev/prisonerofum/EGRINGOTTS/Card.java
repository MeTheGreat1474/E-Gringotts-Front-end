package dev.prisonerofum.EGRINGOTTS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="Card")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Card {
    @Id
    private ObjectId id;
    private String cardID;
    private String cardNumber;
    private String cardHolder;
    private String cardType;
    private String cardExpiry;
    private String cardCVV;




}
