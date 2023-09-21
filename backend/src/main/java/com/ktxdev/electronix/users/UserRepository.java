package com.ktxdev.electronix.users;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.lang.NonNull;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    @Override
    @NonNull
    @Query("FROM User WHERE role != com.ktxdev.electronix.users.UserRole.SYSTEM_ADMIN")
    Page<User> findAll(@NonNull Pageable pageable);
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByEmailAndIdIsNot(String email, Long id);
}