package com.ktxdev.electronix.users;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record UserCreateRequest(@NotBlank(message = "Name is required") String name,
                                @Email(message = "Invalid email") @NotBlank(message = "Email is required") String email,
                                @NotNull(message = "User's role should be provided") UserRole role) {
}
