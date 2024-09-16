package com.koc.studai.workspace;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;

@Entity(name = "sources")
public class Source {
	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private UUID id;
	private String name;
	@ManyToOne(fetch = FetchType.LAZY)
	private Workspace workspace;
	
	public Source() {}
	
	public Source(UUID id, String name, Workspace workspace) {
		this.id = id;
		this.name = name;
		this.workspace = workspace;
	}

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setWorkspace(Workspace workspace) {
		this.workspace = workspace;
	}
}
