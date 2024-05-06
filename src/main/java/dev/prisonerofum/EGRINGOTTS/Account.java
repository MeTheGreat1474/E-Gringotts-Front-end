package dev.prisonerofum.EGRINGOTTS;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;


@Document(collection="Account")
@Data //take care of all getter and setter
@AllArgsConstructor //constructor
@NoArgsConstructor
public class Account<E> {
    //hold data and all class
    @Id
    private ObjectId id;
    private String username;
    private String password;
    private String DOB;
    private String email;
    private String phone;
    private String address;
    private String accountType;
//    private String accountStatus;
    @DocumentReference
    private Card cards;





}
