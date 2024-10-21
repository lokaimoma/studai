package com.koc.studai.ai;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/ai")
public class AiController {
	private final Assistant assistant;
	
	
	public AiController(Assistant assistant) {
		this.assistant = assistant;
	}

	@PostMapping(produces = "text/plain")
	public String chat(@RequestBody ChatPayload chat) {
		return assistant.chat(chat.getUserId() + Assistant.USERiD_WORKSPACEID_SEP + chat.getWorkspaceId(), chat.getMessage());
	}
}