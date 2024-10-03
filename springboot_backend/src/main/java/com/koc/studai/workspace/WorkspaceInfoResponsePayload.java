package com.koc.studai.workspace;


public class WorkspaceInfoResponsePayload {
	private String title;
	private Iterable<Source> sources;
	
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

	public Iterable<Source> getSources() {
		return sources;
	}

	public void setSources(Iterable<Source> sources) {
		this.sources = sources;
	}
}
