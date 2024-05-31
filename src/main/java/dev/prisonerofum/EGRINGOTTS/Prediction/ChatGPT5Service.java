package dev.prisonerofum.EGRINGOTTS.Prediction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class ChatGPT5Service {

    @Value("${replicate.api.token}")
    private String replicateApiToken;

    private final WebClient webClient;

    @Autowired
    public ChatGPT5Service(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.replicate.com").build();
    }

    public String postPrompt(@RequestBody String prompt) {

        PredictionRequest predictionRequest = new PredictionRequest();
        PredictionResponse predictionResponse = new PredictionResponse();
        PredictionOutput predictionOutput = new PredictionOutput();
        predictionRequest.getInput().setPrompt(prompt);

        predictionResponse = webClient.post()
                .uri("/v1/models/meta/llama-2-13b-chat/predictions")
//                .uri("/v1/models/meta/llama-2-7b-chat/predictions")
                .header("Authorization", "Bearer " + replicateApiToken)
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(predictionRequest))
                .retrieve()
                .bodyToMono(PredictionResponse.class)
                .block();

//        try {
//            // Pause for 4 seconds
//            Thread.sleep(4000);
//        } catch (InterruptedException e) {
//            // This part is executed when an exception (in this case InterruptedException) occurs
//            System.out.println("Got interrupted!");
//        }

        predictionOutput = webClient.get()
                .uri(predictionResponse.getUrls().getGet())
                .header("Authorization", "Bearer " + replicateApiToken)
                .retrieve()
                .bodyToMono(PredictionOutput.class)
                .block();

//        try {
//            // Pause for 4 seconds
//            Thread.sleep(10000);
//        } catch (InterruptedException e) {
//            // This part is executed when an exception (in this case InterruptedException) occurs
//            System.out.println("Got interrupted!");
//        }

        return String.join(" ",predictionOutput.getOutput());
    }

}