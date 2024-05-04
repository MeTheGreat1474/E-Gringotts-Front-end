package dev.prisonerofum.EGRINGOTTS;

public class Card {
    private String userID;

    private String cardID;
    private String cardNumber;
    private String cardHolder;
    private String cardType;
    private String cardExpiry;
    private String cardCVV;

    //maybe gonna use abstract factory design pattern or factory design


    public Card(String userID, String cardID, String cardNumber, String cardHolder, String cardType, String cardExpiry, String cardCVV) {
        this.userID = userID;
        this.cardID = cardID;
        this.cardNumber = cardNumber;
        this.cardHolder = cardHolder;
        this.cardType = cardType;
        this.cardExpiry = cardExpiry;
        this.cardCVV = cardCVV;
    }
}
