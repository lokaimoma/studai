package com.koc.studai.ai;

public class ChatPayload {
	private String message;
	private String userId;
	
	public ChatPayload() {
		
	}

	public ChatPayload(String message) {
		super();
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	
	
}
