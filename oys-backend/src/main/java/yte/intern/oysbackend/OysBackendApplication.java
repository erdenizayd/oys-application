package yte.intern.oysbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

@SpringBootApplication
public class OysBackendApplication {

	public static void main(String[] args) {
		ApplicationContext context = SpringApplication.run(OysBackendApplication.class, args);

	}

}
