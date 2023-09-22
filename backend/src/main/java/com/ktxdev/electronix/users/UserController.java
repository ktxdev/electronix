package com.ktxdev.electronix.users;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/users")
public class UserController {
    private final UserService userService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDto createUser(@Valid @RequestBody UserCreateRequest userCreateRequest) {
        return userService.createUser(userCreateRequest);
    }

    @PatchMapping("{userId}")
    public UserDto updateUser(@PathVariable Long userId, @RequestBody UserUpdateRequest request) {
        return userService.updateUser(userId, request);
    }

    @PatchMapping("{userId}/change-password")
    public UserDto changeUserPassword(@PathVariable Long userId, @Valid @RequestBody UserPasswordChangeRequest request) {
        return userService.changeUserPassword(userId, request);
    }

    @GetMapping("my-profile")
    public UserDto myProfile(@AuthenticationPrincipal User user) {
        return userService.myProfile(user);
    }

    @GetMapping
    public Page<UserDto> fetchAllUsers(@PageableDefault Pageable pageable) {
        return userService.fetchAllUsers(pageable);
    }

    @GetMapping("{userId}")
    public UserDto fetchAllUsers(@PathVariable Long userId) {
        return userService.fetchUserById(userId);
    }

    @DeleteMapping("{userId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
    }

    @PostMapping(value = "{userId}/profile-image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void uploadProfileImage(@PathVariable Long userId, @RequestParam("image") MultipartFile file) {
        userService.uploadProfileImage(userId, file);
    }

    @GetMapping(value = "{userId}/profile-image", produces = {MediaType.IMAGE_GIF_VALUE, MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public Resource getProfileImage(@PathVariable Long userId) {
        return userService.getProfileImage(userId);
    }
}
