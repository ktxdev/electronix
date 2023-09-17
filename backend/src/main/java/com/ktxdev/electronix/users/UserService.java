package com.ktxdev.electronix.users;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {
    UserDto createUser(UserCreateRequest userCreateRequest);
    UserDto registerUser(UserRegistrationRequest userRegistrationRequest);
    UserDto updateUser(Long userId, UserUpdateRequest userUpdateRequest);
    UserDto changeUserPassword(Long userId, UserPasswordChangeRequest userPasswordChangeRequest);
    UserDto myProfile(User user);
    Page<UserDto> fetchAllUsers(Pageable pageable);
    void deleteUser(Long userId);
}
