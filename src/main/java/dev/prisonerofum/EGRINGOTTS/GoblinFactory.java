package dev.prisonerofum.EGRINGOTTS;

public class GoblinFactory extends UserFactory{

    protected User createUser(){
        return new Goblin();
    }
}
