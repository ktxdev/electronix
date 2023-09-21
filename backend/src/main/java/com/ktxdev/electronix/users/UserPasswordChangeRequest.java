package com.ktxdev.electronix.users;

import jakarta.validation.constraints.NotBlank;

public record UserPasswordChangeRequest(@NotBlank(message = "Old password is required") String oldPassword,
                                        @NotBlank(message = "New password is required") String newPassword,
                                        @NotBlank(message = "New password must be confirmed") String newPasswordConfirmation) {
}
