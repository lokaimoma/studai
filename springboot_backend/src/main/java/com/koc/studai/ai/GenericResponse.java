package com.koc.studai.ai;

public class GenericResponse {
	private String message;
	
	public GenericResponse() {}
	public GenericResponse(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "GenericResponse [message=" + message + "]";
	}
}
