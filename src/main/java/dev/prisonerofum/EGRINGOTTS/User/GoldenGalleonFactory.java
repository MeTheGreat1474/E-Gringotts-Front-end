package dev.prisonerofum.EGRINGOTTS.User;

public class GoldenGalleonFactory extends UserFactory{

    public User createUser(){
        return new GoldenGalleon();
    }

}
