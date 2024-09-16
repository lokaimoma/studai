package com.koc.studai.workspace;

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

import com.koc.studai.ai.GenericResponse;
import com.koc.studai.ai.IntransitFile;

import dev.langchain4j.data.document.Document;
import dev.langchain4j.data.document.DocumentLoader;
import dev.langchain4j.data.document.DocumentParser;
import dev.langchain4j.data.document.parser.apache.tika.ApacheTikaDocumentParser;
import dev.langchain4j.store.embedding.EmbeddingStoreIngestor;

@RestController
@RequestMapping("/api/workspace")
public class WorkspaceController {
	
	private final WorkspaceService workspaceService;
	
	public WorkspaceController(WorkspaceService workspaceService) {
		this.workspaceService = workspaceService;
	}

	@PostMapping
	public ResponseEntity<Workspace> SaveWorkSpace(@RequestBody WorkspaceRequestPayload payload) {
		Workspace w = workspaceService.AddWorkSpace(payload);
		return ResponseEntity.ok(w);
	}
	
	@PostMapping(path="/uploadDocuments", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<GenericResponse> uploadDocuments(@RequestParam(name = "documents") MultipartFile[] files,
			@RequestParam(name = "workspaceId") String workspaceId) throws WorkspaceNotFoundException {
		String response = workspaceService.AddDocumentsToWorkSpace(workspaceId, files);
		
		return ResponseEntity.ok(new GenericResponse(response));
	}
}
