package dev.prisonerofum.EGRINGOTTS.User;

public class GoblinFactory extends UserFactory {

    protected User createUser(){
        return new Goblin();
    }
}
