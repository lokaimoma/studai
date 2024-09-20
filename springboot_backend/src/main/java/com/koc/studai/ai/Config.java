package com.koc.studai.ai;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

import dev.langchain4j.chain.ConversationalRetrievalChain;
import dev.langchain4j.data.document.splitter.DocumentSplitters;
import dev.langchain4j.data.segment.TextSegment;
import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.embedding.EmbeddingModel;
import dev.langchain4j.model.googleai.GoogleAiGeminiChatModel;
import dev.langchain4j.model.huggingface.HuggingFaceEmbeddingModel;
import dev.langchain4j.rag.DefaultRetrievalAugmentor;
import dev.langchain4j.rag.RetrievalAugmentor;
import dev.langchain4j.rag.content.injector.DefaultContentInjector;
import dev.langchain4j.rag.content.retriever.ContentRetriever;
import dev.langchain4j.rag.content.retriever.EmbeddingStoreContentRetriever;
import dev.langchain4j.service.AiServices;
import dev.langchain4j.store.embedding.EmbeddingStore;
import dev.langchain4j.store.embedding.EmbeddingStoreIngestor;
import dev.langchain4j.store.embedding.pgvector.PgVectorEmbeddingStore;

import static dev.langchain4j.store.embedding.filter.MetadataFilterBuilder.metadataKey;

@Configuration
public class Config {

	@Autowired
	private HuggingFaceProperties hfProperties;
	@Autowired
	private GoogleGeminiProperties geminiProperties;
	@Autowired
	private PgVectorDBProperties pgVectorDBProperties;

	@Bean
	ChatLanguageModel huggingFaceChatLanguageModel() {
//		HuggingFaceChatModel model = HuggingFaceChatModel.builder()
//				.accessToken(hfProperties.getApiKey())
//				.modelId(hfProperties.getModelId())
//				.temperature(0.7)
//				.build();
		GoogleAiGeminiChatModel model = GoogleAiGeminiChatModel.builder().apiKey(geminiProperties.getApiKey())
				.modelName(geminiProperties.getModelId()).temperature(0.5).build();
		return model;
	}

	@Bean
	EmbeddingStore<TextSegment> embeddingStore() {
		PgVectorEmbeddingStore embeddingStore = PgVectorEmbeddingStore.builder().host(pgVectorDBProperties.getHost())
				.port(pgVectorDBProperties.getPort()).user(pgVectorDBProperties.getUser())
				.password(pgVectorDBProperties.getPassword()).database(pgVectorDBProperties.getDatabase())
				.table(pgVectorDBProperties.getTable()).dimension(pgVectorDBProperties.getDimensionSize()).build();
		
		return embeddingStore;
	}

	@Bean
	EmbeddingModel embeddingModel() {
		EmbeddingModel embeddingModel = HuggingFaceEmbeddingModel.builder().accessToken(hfProperties.getApiKey())
				.modelId(hfProperties.getEmbeddingModelId()).waitForModel(true).build();
		return embeddingModel;
	}

	@Bean
	EmbeddingStoreIngestor embeddingStoreIngestor(EmbeddingModel embeddingModel,
			EmbeddingStore<TextSegment> embeddingStore) {
		EmbeddingStoreIngestor ingestor = EmbeddingStoreIngestor.builder()
				.documentSplitter(DocumentSplitters.recursive(1000, 200)).embeddingModel(embeddingModel)
				.embeddingStore(embeddingStore).build();
		return ingestor;
	}

	@Bean
	RetrievalAugmentor retrievalAugmentor(ContentRetriever contentRetriever) {
		RetrievalAugmentor retrievalAugmentor = DefaultRetrievalAugmentor.builder()
				.contentRetriever(contentRetriever)
				.contentInjector(DefaultContentInjector.builder().build())
				.build();
		return retrievalAugmentor;
	}

	@Bean
	ContentRetriever contentRetriever(EmbeddingStore<TextSegment> embeddingStore, EmbeddingModel embeddingModel) {
		Logger log = LoggerFactory.getLogger(getClass());
		ContentRetriever retriever = EmbeddingStoreContentRetriever.builder().embeddingModel(embeddingModel)
				.embeddingStore(embeddingStore).maxResults(5).minScore(0.6)
				.dynamicFilter(query -> {
					String userIdWorkspaceId = (String) query.metadata().chatMemoryId();
					log.info("userIdWOrkspaceID 1st query: " + userIdWorkspaceId);
					String[] idParts = userIdWorkspaceId.split(Assistant.USERiD_WORKSPACEID_SEP);
					String userId = idParts[0];
					return metadataKey(IntransitFile.USER_ID_META_KEY).isEqualTo(userId);
				})
				.dynamicFilter(query -> {
					String userIdWorkspaceId = (String) query.metadata().chatMemoryId();
					log.info("userIdWOrkspaceID: " + userIdWorkspaceId);
					String[] idParts = userIdWorkspaceId.split(Assistant.USERiD_WORKSPACEID_SEP);
					log.info("ID PARTS: " + idParts.length);
					String workspaceId = idParts[1];
					return metadataKey(IntransitFile.WORKSPACE_ID_META_KEY).isEqualTo(workspaceId);
				})
				.build();
		EmbeddingStoreLoggingRetriever retriever2 = new EmbeddingStoreLoggingRetriever(retriever);
		return retriever2;
	}

	@Bean
	@Primary
	Assistant aiService(ChatLanguageModel chatLanguageModel, RetrievalAugmentor retrievalAugmentor) {
		Assistant assistant = AiServices.builder(Assistant.class).retrievalAugmentor(retrievalAugmentor)
				.chatLanguageModel(chatLanguageModel).build();
		return assistant;
	}
	
	@Bean
	ConversationalRetrievalChain conversationalRetrievalChain(ChatLanguageModel model, RetrievalAugmentor retrievalAugmentor) {
		ConversationalRetrievalChain chain = ConversationalRetrievalChain.builder()
				.chatLanguageModel(model)
				.retrievalAugmentor(retrievalAugmentor)
				.build();
		return chain;
	}
}
