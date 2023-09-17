package com.ktxdev.electronix.auth;

import com.ktxdev.electronix.users.UserRegistrationRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("sign-up")
    @ResponseStatus(HttpStatus.CREATED)
    public AuthenticationResponse registerUser(@Valid @RequestBody UserRegistrationRequest request) {
        return authenticationService.registerUser(request);
    }

    @PostMapping("authenticate")
    public AuthenticationResponse authenticate(@RequestBody AuthenticationRequest authenticationRequest) {
        return authenticationService.authenticate(authenticationRequest);
    }
}
