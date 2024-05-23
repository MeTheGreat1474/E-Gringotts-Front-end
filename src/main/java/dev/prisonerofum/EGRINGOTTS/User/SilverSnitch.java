package dev.prisonerofum.EGRINGOTTS.User;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class SilverSnitch implements User{

    //TODO: replace someOtherField
    @JsonProperty
    private String someOtherField;

    private final static double  INTEREST_RATE = 0.05;
}
