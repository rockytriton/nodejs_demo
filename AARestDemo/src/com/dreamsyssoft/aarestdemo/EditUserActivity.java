package com.dreamsyssoft.aarestdemo;

import org.androidannotations.annotations.AfterViews;
import org.androidannotations.annotations.Click;
import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.Extra;
import org.androidannotations.annotations.ViewById;
import org.androidannotations.annotations.rest.RestService;

import android.app.Activity;
import android.widget.Button;
import android.widget.TextView;

import com.dreamsyssoft.aarestdemo.model.User;
import com.dreamsyssoft.aarestdemo.rest.UserManager;

@EActivity(R.layout.activity_edit_user)
public class EditUserActivity extends Activity {
	@RestService
	UserManager userManager;
	
	@Extra
	User user;

	@ViewById
	Button btnSubmit;
	
	@ViewById
	TextView txtName;
	
	@ViewById
	TextView txtCity;
	
	@ViewById
	TextView txtState;
	
	@AfterViews
	public void init()
	{
		if (user == null) {
			//This is a create, not an update.
			btnSubmit.setText("Create");
		} else {
			btnSubmit.setText("Update");
			
			txtName.setText(user.getName());
			txtCity.setText(user.getCity());
			txtState.setText(user.getState());
		}
	}
	
	@Click(R.id.btnSubmit)
	public void onSubmit()
	{
		if (user == null) {
			//This is a create, not an update.
			User newUser = new User();
			newUser.setName(txtName.getText().toString());
			newUser.setCity(txtCity.getText().toString());
			newUser.setState(txtState.getText().toString());
			
			userManager.insertUser(newUser);
		} else {
			user.setName(txtName.getText().toString());
			user.setCity(txtCity.getText().toString());
			user.setState(txtState.getText().toString());
			
			userManager.updateUser(user.getId(), user);
		}
		
		finish();
	}
}
