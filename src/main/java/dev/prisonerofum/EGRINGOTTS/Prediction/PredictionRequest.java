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
            this.systemPrompt = readFile();
            this.temperature = 0.8;
            this.topP = 0.9;
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