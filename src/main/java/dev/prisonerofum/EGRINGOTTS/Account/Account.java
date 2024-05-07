package dev.prisonerofum.EGRINGOTTS.Account;

import dev.prisonerofum.EGRINGOTTS.Card;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

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
    private String pin;
//    private String accountStatus;
    @DocumentReference
    private Card cards;

    public void setPin(String pin) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        this.pin = passwordEncoder.encode(pin);
    }

    public boolean checkPin(String pin) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.matches(pin, this.pin);
    }

    public void setPassword(String password) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        this.password = passwordEncoder.encode(password);
    }

}
