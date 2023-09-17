package com.ktxdev.electronix.users;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

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
}
