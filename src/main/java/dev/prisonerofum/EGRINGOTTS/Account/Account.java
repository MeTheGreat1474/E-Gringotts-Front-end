package dev.prisonerofum.EGRINGOTTS.Account;

import dev.prisonerofum.EGRINGOTTS.Card;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import java.util.Date;


@Document(collection="Account")            //map to collection in mongodb
@Data                                      //take care of all getter and setter
@AllArgsConstructor                        //constructor with all argument
@NoArgsConstructor                         //constructor with no argument
public class Account<E> {
    //hold data and all class

    @Id                                    //primary key
    private ObjectId id;
    private String username;
    private String password;
    private Date DOB;
    private String email;
    private String phone;
    private String address;
    private String accountType;
//    private String accountStatus;
    @DocumentReference
    private Card cards;

}
