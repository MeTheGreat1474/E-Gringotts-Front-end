package dev.prisonerofum.EGRINGOTTS.Transaction;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

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
    private TransactionCategory category;
    private String remarks;
    private Date date;
}

@Data                                      //take care of all getter and setter
@AllArgsConstructor                        //constructor with all argument
@NoArgsConstructor
class TransactionResponse {
    private String transactionID;
    private String receipt;
}
