package com.koc.studai.workspace;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.koc.studai.ai.IntransitFile;

import dev.langchain4j.data.document.Document;
import dev.langchain4j.data.document.DocumentLoader;
import dev.langchain4j.data.document.DocumentParser;
import dev.langchain4j.data.document.parser.apache.tika.ApacheTikaDocumentParser;
import dev.langchain4j.store.embedding.EmbeddingStoreIngestor;

@Service
public class WorkspaceService {
	private final WorkspaceRepository workspaceRepository;
	private final SourceRepository sourceRepository;
	private final EmbeddingStoreIngestor embeddingStoreIngestor;

	public WorkspaceService(WorkspaceRepository workspaceRepository, SourceRepository sourceRepository,
			EmbeddingStoreIngestor embeddingStoreIngestor) {
		this.workspaceRepository = workspaceRepository;
		this.sourceRepository = sourceRepository;
		this.embeddingStoreIngestor = embeddingStoreIngestor;
	}

	public Workspace AddWorkSpace(WorkspaceRequestPayload payload) {
		Workspace workspace = new Workspace();
		workspace.setTitle(payload.getTitle());
		Workspace w = workspaceRepository.save(workspace);
		return w;
	}

	public String AddDocumentsToWorkSpace(String workspaceId, MultipartFile[] files)
			throws WorkspaceNotFoundException {
		Optional<Workspace> workspace = workspaceRepository.findById(UUID.fromString(workspaceId));
		if (workspace.isEmpty()) {
			throw new WorkspaceNotFoundException();
		}

		List<IntransitFile> intransitFiles = Arrays.stream(files)
				.map(file -> new IntransitFile(file, "user-123", workspaceId)).toList();

		List<Source> sources = intransitFiles.stream().map(file -> {
			Source source = new Source();
			source.setName(file.getFileName());
			source.setWorkspace(workspace.get());
			return source;
		}).toList();

		sourceRepository.saveAll(sources);

		DocumentParser parser = new ApacheTikaDocumentParser();
		List<Document> documents = intransitFiles.stream().map(file -> DocumentLoader.load(file, parser)).toList();
		embeddingStoreIngestor.ingest(documents);

		return "Document(s) saved successfully";
	}
}
