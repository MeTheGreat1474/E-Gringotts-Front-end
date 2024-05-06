package dev.prisonerofum.EGRINGOTTS.User;

public class SilverSnitchFactory extends UserFactory{

    public User createUser(){
        return new SilverSnitch();
    }
}
