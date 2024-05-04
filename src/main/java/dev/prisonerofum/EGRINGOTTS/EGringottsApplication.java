package dev.prisonerofum.EGRINGOTTS;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class EGringottsApplication {

	public static void main(String[] args) {
		SpringApplication.run(EGringottsApplication.class, args);
	}

	@GetMapping("")
	public String apiRoot() {
		return "Hello, World!";
	}

	@GetMapping("/Taufiq")
	public String apiTaufiq() {
		return "Hehe you found me!";
	}

}
