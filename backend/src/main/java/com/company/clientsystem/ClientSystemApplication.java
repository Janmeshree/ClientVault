package com.company.clientsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.company.clientsystem")
public class ClientSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(ClientSystemApplication.class, args);
    }

}
