package dev.prisonerofum.EGRINGOTTS.Card;

import dev.prisonerofum.EGRINGOTTS.Account.Account;
import dev.prisonerofum.EGRINGOTTS.User.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Calendar;
import java.util.Date;
import java.util.Random;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Card{

    private String userId;
    private String cardNumber;
    private String cardHolder;
    private Date cardExpiry;
    private String cardCVV;



    public void generateCardNumber() {
        Random random = new Random();
        StringBuilder cardNumber = new StringBuilder();
        for (int i = 0; i < 16; i++) {
            int digit = random.nextInt(10);
            cardNumber.append(digit);
        }
        this.cardNumber = cardNumber.toString();
    }

    public void generateCardCVV() {
        Random random = new Random();
        StringBuilder cardCVV = new StringBuilder();
        for (int i = 0; i < 3; i++) {
            int digit = random.nextInt(10);
            cardCVV.append(digit);
        }
        this.cardCVV = cardCVV.toString();
    }

    public void generateCardExpiry() {
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.YEAR, 5);
        this.cardExpiry = calendar.getTime();
    }

    public void setCardHolder(Account<User> account) {
        this.cardHolder = account.getFullName();
    }
    public void setCardId(Account<User> account) {
        this.userId = account.getUserId();
    }
}