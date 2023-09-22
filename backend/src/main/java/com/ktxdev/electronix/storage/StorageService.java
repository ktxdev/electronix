package com.ktxdev.electronix.storage;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface StorageService {
    String uploadFile(String uploadDir, MultipartFile file);
    Resource downloadFile(String filename);
}
