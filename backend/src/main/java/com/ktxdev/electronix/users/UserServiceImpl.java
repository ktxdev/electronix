package com.ktxdev.electronix.users;

import com.ktxdev.electronix.core.exceptions.BadRequestException;
import com.ktxdev.electronix.core.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDto createUser(UserCreateRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new BadRequestException("Email is already in use");
        }

        User user = userMapper.fromCreateRequest(request);
        // TODO generate password and save the encoded string
        // TODO fire event to send password via email

        return userMapper.toDto(userRepository.save(user));
    }

    @Override
    public User registerUser(UserRegistrationRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new BadRequestException("Email is already in use");
        }

        if (!request.password().equals(request.passwordConfirmation())) {
            throw new BadRequestException("Passwords do not match");
        }

        User user = userMapper.fromRegistrationRequest(request);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setRole(UserRole.CLIENT);

        return userRepository.save(user);
    }

    @Override
    public UserDto updateUser(Long userId, UserUpdateRequest request) {
        User user = findById(userId);

        if (Objects.nonNull(request.name())) {
            user.setName(request.name());
        }

        if (Objects.nonNull(request.email())) {
            boolean isEmailInUse = userRepository.existsByEmailAndIdIsNot(request.email(), userId);

            if (isEmailInUse) {
                throw new BadRequestException("Email is already in use");
            }

            user.setEmail(request.email());
            // TODO disable account until user can verify email;
            // TODO clear the security context holder so user can be logged out
        }

        return userMapper.toDto(userRepository.save(user));
    }

    @Override
    public UserDto changeUserPassword(Long userId, UserPasswordChangeRequest request) {
        User user = findById(userId);
        boolean isOldPasswordCorrect = passwordEncoder.matches(request.oldPassword(), user.getPassword());

        if (!isOldPasswordCorrect) {
            throw new BadRequestException("Incorrect Password");
        }

        if (!request.newPassword().equals(request.newPasswordConfirmation())) {
            throw new BadRequestException("Passwords do not match");
        }

        user.setPassword(passwordEncoder.encode(request.newPassword()));

        return userMapper.toDto(userRepository.save(user));
    }

    @Override
    public UserDto myProfile(User user) {
        return userMapper.toDto(user);
    }

    @Override
    public Page<UserDto> fetchAllUsers(Pageable pageable) {
        return userRepository.findAll(pageable)
                .map(userMapper::toDto);
    }

    @Override
    public void deleteUser(Long userId) {
        User user = findById(userId);
        try {
            userRepository.delete(user);
        } catch (Exception ex) {
            user.setDeleted(true);
            userRepository.save(user);
        }
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    private User findById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User with id: %d not found", userId));
    }
}
