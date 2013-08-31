package com.dreamsyssoft.aarestdemo;

import java.util.List;

import org.androidannotations.annotations.AfterViews;
import org.androidannotations.annotations.Background;
import org.androidannotations.annotations.EActivity;
import org.androidannotations.annotations.ItemClick;
import org.androidannotations.annotations.OptionsItem;
import org.androidannotations.annotations.OptionsMenu;
import org.androidannotations.annotations.UiThread;
import org.androidannotations.annotations.UiThread.Propagation;
import org.androidannotations.annotations.ViewById;
import org.androidannotations.annotations.rest.RestService;

import android.app.ListActivity;
import android.content.Intent;
import android.widget.ListView;
import android.widget.Toast;

import com.dreamsyssoft.aarestdemo.model.User;
import com.dreamsyssoft.aarestdemo.rest.UserManager;

@EActivity(R.layout.activity_user_manager)
@OptionsMenu(R.menu.activity_user_manager)
public class UserManagerActivity extends ListActivity {
	@RestService
	UserManager userManager;
	
	
	@ViewById
	ListView list;
	
	UserListAdapter adapter = null;
	boolean deleteMode = false;
	
	@AfterViews
	public void init()
	{
		adapter = new UserListAdapter(this);
		list.setAdapter(adapter);
	}
	
	@Override
	protected void onResume() {
		refreshUsers();
		super.onResume();
	}
	
	@Background
	@OptionsItem(R.id.menu_user_refresh)
	public void refreshUsers()
	{
		List<User> users = userManager.fetchAllUsers();
		updateAdapter(users);
	}
	
	@UiThread(propagation=Propagation.REUSE)
	public void updateAdapter(List<User> users)
	{
		adapter.clear();
		
		for (User user : users) {
			adapter.add(user);
		}
	}
    
	@OptionsItem(R.id.menu_user_add)
	public void onAddUser()
	{
		Intent intent = new Intent(this, EditUserActivity_.class);
		startActivity(intent);
	}
	
	@OptionsItem(R.id.menu_user_del)
	public void onDeleteUser()
	{
		deleteMode = true;
		Toast.makeText(this, "Select User to Delete", Toast.LENGTH_LONG).show();
	}
	
	@ItemClick
	public void listItemClicked(User user)
	{
		if (deleteMode) {
			userManager.deleteUser(user.getId());
			refreshUsers();
		} else {
			Intent intent = new Intent(this, EditUserActivity_.class);
			intent.putExtra("user", user);
			startActivity(intent);
		}
		
		deleteMode = false;
	}
}
