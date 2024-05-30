package dev.prisonerofum.EGRINGOTTS.Prediction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chatGPT5")
public class ChatGPT5Controller {

    @Autowired
    ChatGPT5Service chatGPT5Service;

    @PostMapping("/prompt")
    public ResponseEntity<String> postPrompt(@RequestParam String prompt){
        return ResponseEntity.ok(chatGPT5Service.postPrompt(prompt));
    }





}



