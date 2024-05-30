package dev.prisonerofum.EGRINGOTTS.Prediction;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.ZonedDateTime;

@Data
public class PredictionResponse {

    private String id;
    private String model;
    private String version;
    private PredictionRequest.Input input;
    private String logs;
    @JsonProperty("data_removed")
    private boolean dataRemoved;
    private Object error;
    private String status;
    @JsonProperty("created_at")
    private ZonedDateTime createdAt;
    private Urls urls;


    @Data
    public static class Urls {
        private String cancel;
        private String get;

    }
}