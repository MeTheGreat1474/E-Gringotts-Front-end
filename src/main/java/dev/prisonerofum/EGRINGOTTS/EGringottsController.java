package dev.prisonerofum.EGRINGOTTS;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/Account")
public class EGringottsController {
    @Autowired
    private EGringottsService eGringottsService;
    @GetMapping("/home")
    public ResponseEntity<String> home(){
        return new ResponseEntity<String>("Hello, World!", HttpStatus.OK);
    }
//    @GetMapping("/{id}")
//    public ResponseEntity<Optional<Account>> getUser(@PathVariable ObjectId id){
//        return new ResponseEntity<Optional<Account>>(eGringottsService.singleAccount(id), HttpStatus.OK);
//    }
    @GetMapping("/{username}")
    public ResponseEntity<Optional<Account>> getUser(@PathVariable String username){
        return new ResponseEntity<Optional<Account>>(eGringottsService.singleAccount2(username), HttpStatus.OK);
    }

    @GetMapping("/login")
    public ResponseEntity<Optional<Account>> login(String username, String password){
        return new ResponseEntity<Optional<Account>>(eGringottsService.checkLogin(username,password), HttpStatus.OK);
    }




}
