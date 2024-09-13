package com.koc.studai.workspace;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

public interface WorkspaceRepository extends CrudRepository<Workspace, UUID> {
}
