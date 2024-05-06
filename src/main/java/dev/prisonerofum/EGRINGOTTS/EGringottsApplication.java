package dev.prisonerofum.EGRINGOTTS;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
public class EGringottsApplication {

	//Main program where the application starts

	public static void main(String[] args) {
		SpringApplication.run(EGringottsApplication.class, args);

	}

}
