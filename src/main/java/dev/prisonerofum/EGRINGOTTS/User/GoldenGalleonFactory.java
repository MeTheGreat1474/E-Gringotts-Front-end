package dev.prisonerofum.EGRINGOTTS.User;

public class GoldenGalleonFactory extends UserFactory{

    protected User createUser(){
        return new GoldenGalleon();
    }

}