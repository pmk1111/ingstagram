package com.naver.ingstagram;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class IngstagramApplication {

	public static void main(String[] args) {
		SpringApplication.run(IngstagramApplication.class, args);
	}

}
