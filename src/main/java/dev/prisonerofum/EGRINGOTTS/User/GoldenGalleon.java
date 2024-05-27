package dev.prisonerofum.EGRINGOTTS.User;

import com.fasterxml.jackson.annotation.JsonProperty;

public class GoldenGalleon implements User{

    @JsonProperty
    private String accountType = "Golden Galleon";

    private final static double INTEREST_RATE = 0.1;
}
