package com.koc.studai.workspace;

public class WorkspaceRequestPayload {
	private String title;

	public WorkspaceRequestPayload() {}
	
	public WorkspaceRequestPayload(String title) {
		super();
		this.title = title;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
}
