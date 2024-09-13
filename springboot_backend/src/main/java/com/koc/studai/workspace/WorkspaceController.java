package com.koc.studai.workspace;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/workspace")
public class WorkspaceController {
	
	private final WorkspaceService workspaceService;
	
	public WorkspaceController(WorkspaceService workspaceService) {
		super();
		this.workspaceService = workspaceService;
	}

	@PostMapping
	public ResponseEntity<Workspace> SaveWorkSpace(@RequestBody WorkspaceRequestPayload payload) {
		Workspace w = workspaceService.AddWorkSpace(payload);
		return ResponseEntity.ok(w);
	}
}
