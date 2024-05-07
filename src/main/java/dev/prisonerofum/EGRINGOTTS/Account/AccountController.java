package dev.prisonerofum.EGRINGOTTS.Account;

import dev.prisonerofum.EGRINGOTTS.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*", allowedHeaders = "*")           //CrossOrigin is used to handle the request from a different origin
@RestController
@RequestMapping("/Account")                                 //Mapper to https://localhost:8080/Account
public class AccountController {
    @Autowired                                              //Auto intialize accountService
    private AccountService accountService;

    @Autowired
    private EmailService EmailService;
    @GetMapping("/home")
    public ResponseEntity<String> home(){
        return new ResponseEntity<String>("Hello, World!", HttpStatus.OK);
    }

    @GetMapping("/{username}")
    public ResponseEntity<Optional<Account>> getUser(@PathVariable String username){
        return new ResponseEntity<Optional<Account>>(accountService.singleAccount2(username), HttpStatus.OK);
    }

    @GetMapping("/login")
    public ResponseEntity<Optional<Account>> login(String username, String password){
        return new ResponseEntity<Optional<Account>>(accountService.checkLogin(username,password), HttpStatus.OK);
    }

    @PostMapping("/signUp")
    public ResponseEntity<Optional<Account>> signUp(@RequestParam String username, @RequestParam String email, @RequestParam String password, @RequestParam String address){
        return new ResponseEntity<>(accountService.signUp(username, email, password, address), HttpStatus.OK);
    }

    @GetMapping("/email")
    public ResponseEntity<String> getEmail(@RequestParam String to,@RequestParam String subject,@RequestParam String text){
        return new ResponseEntity<String>(EmailService.sendSimpleMessage(to,subject,text), HttpStatus.OK);
    }

}
