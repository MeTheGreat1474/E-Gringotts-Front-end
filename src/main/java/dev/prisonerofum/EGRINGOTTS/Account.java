package dev.prisonerofum.EGRINGOTTS;

public class Account<E> {
    //hold data and all class

    //login
    //sign up
    private String userID;
    private String username;
    private String password;
    private String DOB;
    private String email;
    private String phone;
    private String address;
    private String accountType;
//    private String accountStatus;

    public Account() {
    }

    public Account(String userID, String username, String password, String DOB, String email, String phone, String address, String accountType) {
        this.userID = userID;
        this.username = username;
        this.password = password;
        this.DOB = DOB;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.accountType = accountType;

    }




}
