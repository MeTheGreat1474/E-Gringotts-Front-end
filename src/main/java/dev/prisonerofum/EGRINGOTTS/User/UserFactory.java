package dev.prisonerofum.EGRINGOTTS.User;

public abstract class UserFactory {

    public User create(){
        User user = createUser();
        //user.method();
        return user;
    }
    public abstract User createUser();

}
