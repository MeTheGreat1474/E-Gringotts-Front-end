package dev.prisonerofum.EGRINGOTTS.Prediction;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Scanner;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PredictionRequest {

    @JsonProperty("input")
    private Input input = new Input();

    public PredictionRequest() {
        this.input = new Input();
    }

    @JsonInclude(JsonInclude.Include.NON_NULL)
    @Data
    public static class Input {
        @JsonProperty("max_new_tokens")
        private int maxNewTokens;
        @JsonProperty("prompt")
        private String prompt;
        @JsonProperty("system_prompt")
        private String systemPrompt;
        @JsonProperty("temperature")
        private double temperature;
        @JsonProperty("top_p")
        private double topP;

        public Input(){
            this.maxNewTokens = 10;
            this.prompt = "";
            this.systemPrompt = readFile();
            this.temperature = 0.5;
            this.topP = 1;
        }
    }
    public static String readFile(){
        String filePath = "src/main/java/dev/prisonerofum/EGRINGOTTS/Prediction/handbook.txt";
        String data = "";
        try(FileInputStream fis = new FileInputStream(filePath);
            Scanner s = new Scanner(fis)){

            while(s.hasNextLine()){
                data += s.nextLine();
            }
        }
        catch(IOException e){
            e.getStackTrace();
        }
        return data;
    }


}