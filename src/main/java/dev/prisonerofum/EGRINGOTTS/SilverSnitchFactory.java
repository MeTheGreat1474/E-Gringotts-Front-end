package dev.prisonerofum.EGRINGOTTS;

public class SilverSnitchFactory extends UserFactory{

    public User createUser(){
        return new SilverSnitch();
    }
}
