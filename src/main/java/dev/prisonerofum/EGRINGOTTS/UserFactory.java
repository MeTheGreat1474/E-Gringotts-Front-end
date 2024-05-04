package dev.prisonerofum.EGRINGOTTS;

public abstract class UserFactory {

    public User create(){
        User user = createUser();
        //user.method();
        return user;
    }
    protected abstract User createUser();

}
