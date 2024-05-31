package dev.prisonerofum.EGRINGOTTS.Prediction;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;

@Data
public class PredictionOutput {
    private String id;
    private String model;
    private String version;
    private Input input;
    private String logs;
    @JsonProperty("output")
    private List<String> output;
    @JsonProperty("data_removed")
    private boolean dataRemoved;
    private Object error;
    private String status;
    @JsonProperty("created_at")
    private ZonedDateTime createdAt;
    @JsonProperty("started_at")
    private ZonedDateTime startedAt;
    @JsonProperty("completed_at")
    private ZonedDateTime completedAt;
    private Urls urls;
    private Metrics metrics;

    // Getters and setters

    public static class Input {
        @JsonProperty("max_new_tokens")
        private int maxNewTokens;
        private String prompt;
        @JsonProperty("system_prompt")
        private String systemPrompt;
        private double temperature;
        @JsonProperty("top_p")
        private double topP;

        // Getters and setters
    }

    public static class Urls {
        private String cancel;
        private String get;

        // Getters and setters
    }

    public static class Metrics {
        @JsonProperty("input_token_count")
        private int inputTokenCount;
        @JsonProperty("output_token_count")
        private int outputTokenCount;
        @JsonProperty("predict_time")
        private double predictTime;
        @JsonProperty("time_to_first_token")
        private double timeToFirstToken;
        @JsonProperty("tokens_per_second")
        private double tokensPerSecond;

        // Getters and setters
    }
}