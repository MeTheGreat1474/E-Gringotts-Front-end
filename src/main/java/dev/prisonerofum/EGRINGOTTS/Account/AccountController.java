package dev.prisonerofum.EGRINGOTTS.Account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Optional;

@CrossOrigin(origins = "*")         //to make it accessible from any domain
@RestController                     //to mark the class as a controller
@RequestMapping("/Account")         //to map to localhost:8080/Account
public class AccountController {
    @Autowired
    private AccountService accountService;
    @GetMapping("/home")
    public ResponseEntity<String> home(){
        return new ResponseEntity<String>("Welcome to Account Homepage", HttpStatus.OK);
    }

    //mapping to localhost:8080/Account/{username}
    //ResponseEntitiy is used for Httpstatus and response body
    //Optional is used to avoid null pointer exception
    @GetMapping("/{username}")
    public ResponseEntity<Optional<Account>> getUser(@PathVariable String username){
        return new ResponseEntity<Optional<Account>>(accountService.singleAccount2(username), HttpStatus.OK);
    }

    @GetMapping("/login")
    public ResponseEntity<Optional<Account>> login(String username, String password){
        return new ResponseEntity<Optional<Account>>(accountService.checkLogin(username,password), HttpStatus.OK);
    }
    @PostMapping("/signup")
    public ResponseEntity<Optional<Account>> signup(String username, String email, String password, Date DOB, String address){
        return new ResponseEntity<Optional<Account>>(accountService.signup(username,email,password,DOB,address), HttpStatus.OK);
    }




}
