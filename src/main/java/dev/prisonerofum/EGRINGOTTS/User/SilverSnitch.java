package dev.prisonerofum.EGRINGOTTS.User;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class SilverSnitch implements User{

    @JsonProperty
    private String accountType = "Silver Snitch";

    private final static double  INTEREST_RATE = 0.05;
}
