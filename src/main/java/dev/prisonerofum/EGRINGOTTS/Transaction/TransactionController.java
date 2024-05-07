package dev.prisonerofum.EGRINGOTTS.Transaction;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", allowedHeaders = "*")           //CrossOrigin is used to handle the request from a different origin
@RestController
@RequestMapping("/Transaction")

public class TransactionController{
}
