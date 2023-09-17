package com.ktxdev.electronix.auth;

import com.ktxdev.electronix.users.UserRegistrationRequest;

public interface AuthenticationService {
    AuthenticationResponse authenticate(AuthenticationRequest authenticationRequest);
    AuthenticationResponse registerUser(UserRegistrationRequest registrationRequest);
}
