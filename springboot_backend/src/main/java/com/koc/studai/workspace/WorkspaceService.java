package com.koc.studai.workspace;

import org.springframework.stereotype.Service;

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
}
