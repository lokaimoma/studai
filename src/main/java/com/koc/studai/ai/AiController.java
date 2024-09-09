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
	private final Assistant assitant;
	private final EmbeddingStoreIngestor embeddingStoreIngestor;
	
	
	public AiController(Assistant assitant, EmbeddingStoreIngestor embeddingStoreIngestor) {
		this.assitant = assitant;
		this.embeddingStoreIngestor = embeddingStoreIngestor;
	}


	@PostMapping
	public String chat(@RequestBody ChatPayload chat) {
		
		return assitant.chat(chat.getMessage());
	}
	
	@PostMapping(path="/uploadDocuments", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<GenericResponse> uploadDocuments(@RequestParam(name = "documents") MultipartFile[] files) {
		DocumentParser parser = new ApacheTikaDocumentParser();
		List<Document> documents = Arrays.stream(files).map(file -> new IntransitFile(file, "user-123"))
		.map(documentSource -> DocumentLoader.load(documentSource, parser)).toList();
		embeddingStoreIngestor.ingest(documents);
		return ResponseEntity.ok(new GenericResponse("Document(s) uploaded successfully"));
	}
}