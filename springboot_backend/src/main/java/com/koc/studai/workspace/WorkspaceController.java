package com.koc.studai.workspace;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/workspace")
public class WorkspaceController {

	private final WorkspaceService workspaceService;

	public WorkspaceController(WorkspaceService workspaceService) {
		this.workspaceService = workspaceService;
	}

	@PostMapping
	public ResponseEntity<Workspace> saveWorkSpace(@RequestBody WorkspaceRequestPayload payload) {
		Workspace w = workspaceService.addWorkSpace(payload);
		return ResponseEntity.ok(w);
	}

	@GetMapping("/{workspaceId}")
	public ResponseEntity<WorkspaceInfoResponsePayload> getWorkspaceInfo(
			@PathVariable(name = "workspaceId") String workspaceId) {
		Workspace workspace = workspaceService.getWorkspace(workspaceId);
		WorkspaceInfoResponsePayload responsePayload = new WorkspaceInfoResponsePayload(workspace);
		return ResponseEntity.ok(responsePayload);
	}

	@PostMapping(path = "/uploadDocuments", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
	public ResponseEntity<Iterable<Source>> uploadDocuments(@RequestParam(name = "documents") MultipartFile[] files,
			@RequestParam(name = "workspaceId") String workspaceId) {
		Iterable<Source> sources = workspaceService.addDocumentsToWorkSpace(workspaceId, files);

		return ResponseEntity.ok(sources);
	}
}
