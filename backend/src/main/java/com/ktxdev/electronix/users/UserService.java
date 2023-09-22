package com.ktxdev.electronix.users;

import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

public interface UserService {
    UserDto createUser(UserCreateRequest userCreateRequest);
    User registerUser(UserRegistrationRequest userRegistrationRequest);
    UserDto updateUser(Long userId, UserUpdateRequest userUpdateRequest);
    UserDto changeUserPassword(Long userId, UserPasswordChangeRequest userPasswordChangeRequest);
    UserDto myProfile(User user);
    Page<UserDto> fetchAllUsers(Pageable pageable);
    void deleteUser(Long userId);
    Optional<User> findByEmail(String email);
    UserDto fetchUserById(Long userId);
    void uploadProfileImage(Long userId, MultipartFile file);
    Resource getProfileImage(Long userId);
}
