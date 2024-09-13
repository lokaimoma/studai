package com.koc.studai.workspace;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "workpaces")
public class Workspace {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	private String title;
	
	public Workspace() {}

	public Workspace(UUID id, String title) {
		super();
		this.id = id;
		this.title = title;
	}

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
}
