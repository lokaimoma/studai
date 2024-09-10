package com.koc.studai.ai;

import dev.langchain4j.service.MemoryId;
import dev.langchain4j.service.UserMessage;

public interface Assistant {
	String chat(@MemoryId String userId, @UserMessage String message);
}
