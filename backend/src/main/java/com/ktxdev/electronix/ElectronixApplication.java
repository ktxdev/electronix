package com.ktxdev.electronix;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableJpaAuditing
@EnableJpaRepositories
@SpringBootApplication
@EnableTransactionManagement
@EnableConfigurationProperties
public class ElectronixApplication {

    public static void main(String[] args) {
        SpringApplication.run(ElectronixApplication.class, args);
    }

}
