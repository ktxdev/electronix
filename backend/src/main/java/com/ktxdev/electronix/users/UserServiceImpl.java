package com.ktxdev.electronix.users;

import com.ktxdev.electronix.config.S3ConfigProperties;
import com.ktxdev.electronix.core.exceptions.BadRequestException;
import com.ktxdev.electronix.core.exceptions.ForbiddenActionException;
import com.ktxdev.electronix.core.exceptions.ResourceNotFoundException;
import com.ktxdev.electronix.storage.StorageService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final StorageService storageService;
    private final PasswordEncoder passwordEncoder;
    private final S3ConfigProperties s3ConfigProperties;

    @Override
    public UserDto createUser(UserCreateRequest request) {
        if (userRepository.existsByEmail(request.email())) {
            throw new BadRequestException("Email is already in use");
        }

        if (!request.password().equals(request.passwordConfirmation())) {
            throw new BadRequestException("Passwords do not match");
        }

        User user = userMapper.fromCreateRequest(request);
        user.setRole(UserRole.ADMIN);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
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
        User user = findByIdOrThrow(userId);

        if (user.getRole().equals(UserRole.SYSTEM_ADMIN)) {
            throw new ForbiddenActionException("Default system admin details cannot be modified");
        }

        if (Objects.nonNull(request.firstName())) {
            user.setFirstName(request.firstName());
        }

        if (Objects.nonNull(request.lastName())) {
            user.setLastName(request.lastName());
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
        User user = findByIdOrThrow(userId);

        if (user.getRole().equals(UserRole.SYSTEM_ADMIN)) {
            throw new ForbiddenActionException("Default system admin details cannot be modified");
        }

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
    public UserDto fetchUserById(Long userId) {
        return userMapper.toDto(findByIdOrThrow(userId));
    }

    @Override
    public void deleteUser(Long userId) {
        User user = findByIdOrThrow(userId);
        // TODO Also delete files associated with user
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

    @Override
    public UserDto uploadProfileImage(Long userId, MultipartFile file, HttpServletRequest request) {
        User user = findByIdOrThrow(userId);
        if (Objects.nonNull(file.getContentType()) && !file.getContentType().startsWith("image/")) {
            throw new BadRequestException("Unsupported file type profile picture should be an image");
        }
        String uploadDir = "%s/%d".formatted(s3ConfigProperties.getProfileDir(), userId);
        String profileImageId = storageService.uploadFile(uploadDir, file);

        String profileImageUrl = ServletUriComponentsBuilder.fromRequest(request).build().toUriString();

        user.setProfileImageId(profileImageId);
        user.setProfileImageUrl(profileImageUrl);
        return userMapper.toDto(userRepository.save(user));
    }

    @Override
    public Resource getProfileImage(Long userId) {
        User user = findByIdOrThrow(userId);
        if (Objects.isNull(user.getProfileImageId())) {
            return new ByteArrayResource(new byte[0]);
        }
        return storageService.downloadFile(user.getProfileImageId());
    }

    private User findByIdOrThrow(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User with id: %d not found", userId));
    }
}
