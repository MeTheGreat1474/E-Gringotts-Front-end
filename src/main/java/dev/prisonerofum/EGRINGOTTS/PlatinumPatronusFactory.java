package dev.prisonerofum.EGRINGOTTS;

public class PlatinumPatronusFactory extends UserFactory{

    protected User createUser() {
        return new PlatinumPatronus();
    }
}