package dev.prisonerofum.EGRINGOTTS.User;

public class GoblinFactory extends UserFactory{

    public User createUser(){
        return new Goblin();
    }
}
