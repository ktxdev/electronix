package com.ktxdev.electronix.core.jpa;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@MappedSuperclass
public class BaseEntity {
    private boolean deleted;
    @Column(nullable = false, updatable = false)
    private String createdBy;
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
    private String modifiedBy;
    private LocalDateTime modifiedAt;
}
