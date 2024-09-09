package com.koc.studai.ai;

import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

import org.apache.commons.collections4.map.HashedMap;
import org.springframework.web.multipart.MultipartFile;

import dev.langchain4j.data.document.DocumentSource;
import dev.langchain4j.data.document.Metadata;

public class IntransitFile implements DocumentSource{
	
	public static final String USER_ID_META_KEY = "userId";
	private MultipartFile file;
	private String userId;
	
	public IntransitFile(MultipartFile multipartFile, String userId) {
		this.file = multipartFile;
		this.userId = userId;
	}

	@Override
	public InputStream inputStream() throws IOException {
		return file.getInputStream();
	}

	@Override
	public Metadata metadata() {
		Map<String, String> metadata = new HashedMap<>();
		String originalFileName = file.getOriginalFilename();
		if (originalFileName.contains("/")) {
			originalFileName = originalFileName.substring(originalFileName.lastIndexOf('/') + 1);
		}else if (originalFileName.contains("\\")) {
				originalFileName = originalFileName.substring(originalFileName.lastIndexOf('\\') + 1);
		}
		metadata.put("fileName", originalFileName);
		metadata.put("fileSize", Long.toString(file.getSize()));
		metadata.put(USER_ID_META_KEY, userId);
		return Metadata.from(metadata);
	}

}
