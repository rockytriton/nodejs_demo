package com.dreamsyssoft.aarestdemo.rest;

import java.util.List;

import org.androidannotations.annotations.rest.Delete;
import org.androidannotations.annotations.rest.Get;
import org.androidannotations.annotations.rest.Post;
import org.androidannotations.annotations.rest.Rest;
import org.springframework.http.converter.json.MappingJacksonHttpMessageConverter;

import com.dreamsyssoft.aarestdemo.model.User;

@Rest(rootUrl="http://192.168.1.118:3000", converters={MappingJacksonHttpMessageConverter.class})
public interface UserManager {
	@Get("/users")
	List<User> fetchAllUsers();
	
	@Post("/users")
	void insertUser(User user);
	
	@Post("/users/{id}")
	void updateUser(String id, User user);
	
	@Delete("/users/{id}")
	void deleteUser(String id);
}
