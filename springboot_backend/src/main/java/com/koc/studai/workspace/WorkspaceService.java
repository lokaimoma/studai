package com.koc.studai.workspace;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class WorkspaceService {
	private final WorkspaceRepository workspaceRepository;

	public WorkspaceService(WorkspaceRepository workspaceRepository) {
		super();
		this.workspaceRepository = workspaceRepository;
	}
	
	public Workspace AddWorkSpace(WorkspaceRequestPayload payload) {
		Workspace workspace = new Workspace();
		workspace.setTitle(payload.getTitle());
		Workspace w = workspaceRepository.save(workspace);
		return w;
	}
	
	public void AddDocumentsToWorkSpace(String workspaceId, MultipartFile[] documents) throws WorkspaceNotFoundException {
		Optional<Workspace> workspace = workspaceRepository.findById(UUID.fromString(workspaceId));
		if (workspace.isEmpty()) {
			throw new WorkspaceNotFoundException();
		}
		
		
	}
}
