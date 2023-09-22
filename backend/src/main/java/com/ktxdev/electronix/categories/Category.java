package com.ktxdev.electronix.categories;

import com.ktxdev.electronix.core.jpa.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Category extends BaseEntity {
    @Id
    private Long id;
    private String name;
    private String description;
    private String imageUrl;
}
