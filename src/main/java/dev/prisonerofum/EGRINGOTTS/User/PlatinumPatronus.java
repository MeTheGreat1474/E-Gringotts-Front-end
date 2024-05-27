package dev.prisonerofum.EGRINGOTTS.User;

import com.fasterxml.jackson.annotation.JsonProperty;

public class PlatinumPatronus implements User{

    @JsonProperty
    private String accountType = "Platinum Patronus";

    private final static double INTEREST_RATE = 0.15;
}
