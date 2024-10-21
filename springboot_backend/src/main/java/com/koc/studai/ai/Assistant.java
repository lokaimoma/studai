package com.koc.studai.ai;

import dev.langchain4j.service.MemoryId;
import dev.langchain4j.service.SystemMessage;
import dev.langchain4j.service.UserMessage;

public interface Assistant {
	static final String USERiD_WORKSPACEID_SEP = ":#:";

	@SystemMessage("You're a brilliant assistant with knowledge on several domains, only reply if contents are provided for a query. If no contents are provided, reply with, I can't help with this.")
	/*
	 * userAndWorkspaceId = userId + Assistant.USERiD_WORKSPACEID_SEP + workspaceId
	 */
	String chat(@MemoryId String userAndWorkspaceId, @UserMessage String message);
}
