package dev.prisonerofum.EGRINGOTTS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="Card")            //map to collection in mongodb
@Data                                   //take care of all getter and setter
@AllArgsConstructor                     //constructor with all argument
@NoArgsConstructor                      //constructor with no argument
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
