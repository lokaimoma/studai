package com.koc.studai.ai;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "ai.hugging-face")
public class HuggingFaceProperties {
	private String apiKey;
	private String modelId;
	private String embeddingModelId;

	public String getApiKey() {
		return apiKey;
	}

	public void setApiKey(String apiKey) {
		this.apiKey = apiKey;
	}

	public String getModelId() {
		return modelId;
	}

	public void setModelId(String modelId) {
		this.modelId = modelId;
	}

	public String getEmbeddingModelId() {
		return embeddingModelId;
	}

	public void setEmbeddingModelId(String embeddingModelId) {
		this.embeddingModelId = embeddingModelId;
	}
}
