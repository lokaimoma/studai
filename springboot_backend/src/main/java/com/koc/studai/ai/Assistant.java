package com.koc.studai.ai;

import dev.langchain4j.service.MemoryId;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;

public interface Assistant {
	static final String USERiD_WORKSPACEID_SEP = ":#:";
	// userAndWorkspaceId = userId + USERiD_WORKSPACEID_SEP + workspaceId 
    @SystemMessage("You're a tutor with access to your student's documents. If no document is provided to you for a query. Respond with no document found relating to this query")
	String chat(@MemoryId String userAndWorkspaceId, @UserMessage String message);
}
