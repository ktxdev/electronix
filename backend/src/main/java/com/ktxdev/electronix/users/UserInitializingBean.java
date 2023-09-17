package com.ktxdev.electronix.users;

import com.ktxdev.electronix.config.ApplicationProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserInitializingBean implements InitializingBean {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final ApplicationProperties applicationProperties;

    @Override
    public void afterPropertiesSet() {
        User user = User.builder()
                .name("System Administrator")
                .email(applicationProperties.getSystemEmail())
                .password(passwordEncoder.encode(applicationProperties.getSystemPassword()))
                .role(UserRole.SYSTEM_ADMIN)
                .build();

        userRepository.save(user);
    }
}
