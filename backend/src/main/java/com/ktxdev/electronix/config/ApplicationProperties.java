package com.ktxdev.electronix.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Data
@Component
@ConfigurationProperties(prefix = "app")
public class ApplicationProperties {
    private String jwtTokenSecret;
    private long jwtExpirationMillis;
    private String systemEmail;
    private String systemPassword;
}
