package com.koc.studai.ai;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "embeddings.pg-vector")
public class PgVectorDBProperties {
	private String host;
	private String user;
	private String password;
	private int port;
	private String database;
	private String table;
	private int dimensionSize;
	
	public String getHost() {
		return host;
	}
	public void setHost(String host) {
		this.host = host;
	}
	public String getUser() {
		return user;
	}
	public void setUser(String user) {
		this.user = user;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public int getPort() {
		return port;
	}
	public void setPort(int port) {
		this.port = port;
	}
	public String getDatabase() {
		return database;
	}
	public void setDatabase(String database) {
		this.database = database;
	}
	public String getTable() {
		return table;
	}
	public void setTable(String table) {
		this.table = table;
	}
	public int getDimensionSize() {
		return dimensionSize;
	}
	public void setDimensionSize(int dimensionSize) {
		this.dimensionSize = dimensionSize;
	}
}
