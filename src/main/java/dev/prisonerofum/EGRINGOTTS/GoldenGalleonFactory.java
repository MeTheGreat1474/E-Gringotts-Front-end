package dev.prisonerofum.EGRINGOTTS;

public class GoldenGalleonFactory extends UserFactory{

    protected User createUser(){
        return new GoldenGalleon();
    }

}
