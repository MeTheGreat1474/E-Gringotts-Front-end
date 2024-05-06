package dev.prisonerofum.EGRINGOTTS.User;

public class PlatinumPatronusFactory extends UserFactory{

    protected User createUser() {
        return new PlatinumPatronus();
    }
}