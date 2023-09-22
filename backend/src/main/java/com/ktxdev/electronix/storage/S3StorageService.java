package com.ktxdev.electronix.storage;

import com.ktxdev.electronix.config.S3ConfigProperties;
import com.ktxdev.electronix.core.exceptions.FileStorageException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.ResponseInputStream;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.GetObjectResponse;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class S3StorageService implements StorageService {
    private final S3Client s3Client;
    private final S3ConfigProperties s3ConfigProperties;

    @Override
    public String uploadFile(String uploadDir, MultipartFile file) {
        String filePath = "%s/%s".formatted(uploadDir, UUID.randomUUID().toString());

        PutObjectRequest request = PutObjectRequest.builder()
                .bucket(s3ConfigProperties.getBucketName())
                .key(filePath)
                .build();

        try {
            s3Client.putObject(request, RequestBody.fromBytes(file.getBytes()));
            return filePath;

        } catch (IOException e) {
            throw new FileStorageException("Failed to store file: " + file.getOriginalFilename(), e);
        }
    }

    @Override
    public Resource downloadFile(String filename) {
        GetObjectRequest request = GetObjectRequest.builder()
                .bucket(s3ConfigProperties.getBucketName())
                .key(filename)
                .build();

        ResponseInputStream<GetObjectResponse> response = s3Client.getObject(request);

        try {
            return new ByteArrayResource(response.readAllBytes());
        } catch (IOException e) {
            throw new FileStorageException("Failed to read file bytes", e);
        }
    }
}
