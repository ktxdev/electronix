package com.ktxdev.electronix.users;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UserRegistrationRequest(@NotBlank(message = "Name is required") String name,
                                      @Email(message = "Invalid email") @NotBlank(message = "Email is required") String email,
                                      @NotBlank(message = "Password is required") String password,
                                      @NotBlank(message = "Password confirmation is required") String passwordConfirmation) {
}
