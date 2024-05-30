package dev.prisonerofum.EGRINGOTTS.Prediction;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PredictionRequest {

    @JsonProperty("input")
    @Autowired
    private Input input = new Input();



    public PredictionRequest() {}

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Data
    public static class Input {
        @JsonProperty("maxNewTokens")
        private int maxNewTokens;
        @JsonProperty("prompt")
        private String prompt;
        @JsonProperty("systemPrompt")
        private String systemPrompt;
        @JsonProperty("temperature")
        private double temperature;
        @JsonProperty("topP")
        private double topP;

        public Input(){
            this.maxNewTokens = 100;
            this.prompt = "";
            this.systemPrompt = "";
            this.temperature = 0.8;
            this.topP = 0.9;
        }
    }

}