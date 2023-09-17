package com.ktxdev.electronix.users;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User fromRegistrationRequest(UserRegistrationRequest registrationRequest);
    User fromCreateRequest(UserCreateRequest userCreateRequest);
    UserDto toDto(User user);
}
