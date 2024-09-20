package com.koc.studai.ai;

import dev.langchain4j.service.MemoryId;
import dev.langchain4j.service.UserMessage;

public interface Assistant {
	static final String USERiD_WORKSPACEID_SEP = ":#:";
	// userAndWorkspaceId = userId + USERiD_WORKSPACEID_SEP + workspaceId 
	String chat(@MemoryId String userAndWorkspaceId, @UserMessage String message);
}
