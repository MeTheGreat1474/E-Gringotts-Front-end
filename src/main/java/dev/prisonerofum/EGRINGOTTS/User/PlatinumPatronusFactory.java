package dev.prisonerofum.EGRINGOTTS.User;

public class PlatinumPatronusFactory extends UserFactory{

    public User createUser() {
        return new PlatinumPatronus();
    }
}