package dev.prisonerofum.EGRINGOTTS.Transaction;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.Random;

@Document(collection="Transaction")            //map to collection in mongodb
@Data                                      //take care of all getter and setter
@AllArgsConstructor                        //constructor with all argument
@NoArgsConstructor
public class Transaction {

    @Id
    private ObjectId id;
    private String userID;
    private String receiverID;
    private double amount;
    private double convertedAmount;
    private double processingFee;
    private String transactionType;
    private String transactionDate;
    private String transactionTime;
    private String transactionID;
    private double exchangedValue;
    private TransactionCategory category;
    private String remarks;
    private Date date;

    public void generateTransactionID() {
        Random random = new Random();
        StringBuilder transactionID = new StringBuilder();
        for (int i = 0; i < 16; i++) {
            int digit = random.nextInt(10);
            transactionID.append(digit);
        }
        this.transactionID = transactionID.toString();
    }
}
