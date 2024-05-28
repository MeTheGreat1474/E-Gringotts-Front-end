package dev.prisonerofum.EGRINGOTTS;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class EGringottsApplication {

	public static void main(String[] args) {
		SpringApplication.run(EGringottsApplication.class, args);
	}
	@Bean										//Bean is used to handle the request from a different origin
	public WebMvcConfigurer configure() {		//WebMvcConfigure is used to configure the request
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry reg) {
				reg.addMapping("/**").allowedOrigins("*");
			}
		};
	}
}
