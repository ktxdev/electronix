package com.ktxdev.electronix.auth;

import com.ktxdev.electronix.auth.jwt.JwtService;
import com.ktxdev.electronix.users.User;
import com.ktxdev.electronix.users.UserRegistrationRequest;
import com.ktxdev.electronix.users.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final JwtService jwtService;
    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.email(), request.password()));

        User user = userService.findByEmail(request.email())
                .orElseThrow(() -> new UsernameNotFoundException("Invalid credentials"));

        final String accessToken = jwtService.generateToken(user);

        return new AuthenticationResponse(accessToken);
    }

    @Override
    public AuthenticationResponse registerUser(UserRegistrationRequest registrationRequest) {
        User user = userService.registerUser(registrationRequest);

        final String accessToken = jwtService.generateToken(user);

        return new AuthenticationResponse(accessToken);
    }
}
