package com.koc.studai.workspace;

import java.util.Set;

public class WorkspaceInfoResponsePayload {
	private String title;
	private Set<Source> sources;
	
	public WorkspaceInfoResponsePayload() {}
	
	public WorkspaceInfoResponsePayload(Workspace workspace) {
		this.title = workspace.getTitle();
		this.sources = workspace.getSources();
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Set<Source> getSources() {
		return sources;
	}

	public void setSources(Set<Source> sources) {
		this.sources = sources;
	}
}
