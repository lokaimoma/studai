package com.koc.studai.ai;

import java.util.List;

import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.Logger;
import dev.langchain4j.rag.content.Content;
import dev.langchain4j.rag.content.retriever.ContentRetriever;
import dev.langchain4j.rag.query.Query;

public class EmbeddingStoreLoggingRetriever implements ContentRetriever {
	Logger logger = (Logger)LoggerFactory.getLogger(getClass());
	
	private final ContentRetriever retriever;
	
	public EmbeddingStoreLoggingRetriever(ContentRetriever retriever) {
		this.retriever = retriever;
	}

	@Override
	public List<Content> retrieve(Query query) {
		List<Content> contents = retriever.retrieve(query);
		if (contents.size() == 0) {
			logger.warn("No relevant documents found");
		}else {
			logger.info("Relevant documents found of size " + contents.size());
		}
		return contents;
	}


}
