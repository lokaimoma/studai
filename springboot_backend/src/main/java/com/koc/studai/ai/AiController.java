package com.koc.studai.ai;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import dev.langchain4j.data.document.Document;
import dev.langchain4j.data.document.DocumentLoader;
import dev.langchain4j.data.document.DocumentParser;
import dev.langchain4j.data.document.parser.apache.tika.ApacheTikaDocumentParser;
import dev.langchain4j.store.embedding.EmbeddingStoreIngestor;

@RestController
@RequestMapping("/api/ai")
public class AiController {
	private final Assistant assistant;
	
	
	public AiController(Assistant assistant) {
		this.assistant = assistant;
	}


	@PostMapping
	public String chat(@RequestBody ChatPayload chat) {
		return assistant.chat(chat.getUserId(), chat.getMessage());
	}
}