package com.koc.studai.ai;

import org.springframework.web.multipart.MultipartFile;

public class DocumentUploadPayload {
	private String userId;
	private MultipartFile[] files;
}
