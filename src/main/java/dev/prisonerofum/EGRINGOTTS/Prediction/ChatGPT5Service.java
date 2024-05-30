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
                .uri("/v1/models/meta/llama-2-70b-chat/predictions")
                .header("Authorization", "Bearer " + replicateApiToken)
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(predictionRequest))
                .retrieve()
                .bodyToMono(PredictionResponse.class)
                .block();

        predictionOutput = webClient.get()
                .uri(predictionResponse.getUrls().getGet())
                .header("Authorization", "Bearer " + replicateApiToken)
                .retrieve()
                .bodyToMono(PredictionOutput.class)
                .block();

        return String.join(" ",predictionOutput.getOutput());
    }

}