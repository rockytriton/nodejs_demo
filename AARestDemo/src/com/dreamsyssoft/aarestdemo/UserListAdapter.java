package com.dreamsyssoft.aarestdemo;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.TextView;

import com.dreamsyssoft.aarestdemo.model.User;

public class UserListAdapter extends ArrayAdapter<User>
{
	public UserListAdapter(Context context) {
		super(context, R.layout.row);
	}
	
	@Override
	public View getView(int position, View convertView, ViewGroup parent) {
		View v = convertView;
		
		if (v == null) {
			LayoutInflater li = (LayoutInflater)getContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
			v = li.inflate(R.layout.row, null);
		}
		
		User user = getItem(position);
		
		if (user != null) {
			TextView txtTop = (TextView)v.findViewById(R.id.txtTop);
			TextView txtBottom = (TextView)v.findViewById(R.id.txtBottom);
			
			txtTop.setText(user.getName());
			txtBottom.setText(user.getCity() + ", " + user.getState());
		}
		
		return v;
	}
}
