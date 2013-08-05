package com.dreamsyssoft.aarestdemo.model;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonProperty;

@SuppressWarnings("serial")
public class User implements Serializable {
	@JsonProperty("_id")
	private String id;
	private String name;
	private String city;
	private String state;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	
	@Override
	public String toString() {
		return "User [getId()=" + getId() + ", getName()=" + getName()
				+ ", getCity()=" + getCity() + ", getState()=" + getState()
				+ "]";
	}
}
