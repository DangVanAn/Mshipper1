package com.example.dangvanan14.mshiper1.adapter;

import android.app.Activity;
import android.content.Intent;
import android.os.Parcelable;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.activity.BaseActivity;
import com.example.dangvanan14.mshiper1.activity.DetailActivity;
import com.example.dangvanan14.mshiper1.model.Chat;
import com.example.dangvanan14.mshiper1.model.Order;
import com.example.dangvanan14.mshiper1.model.User;
import com.google.common.base.Predicate;
import com.google.common.collect.Collections2;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.Locale;

public class ChatListRecyclerAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {
    private static final String TAG = "ChatListRecyclerAdapter";
    private List<Chat> chatList;
    private User user1;

    @Override
    public int getItemViewType(int position) {
        Chat chat = chatList.get(position);
        if (chat.get_sender().equals(user1.get_id())) {
            return 1;
        }
        return 0;
    }

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v;
        if (viewType == 1) {
            v = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_chat2, parent, false);
        } else {
            v = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_chat, parent, false);
        }
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
        Chat chat = chatList.get(position);
        boolean isShowName = true;
        if (position - 1 >= 0){
            Chat previus = chatList.get(position - 1);
            if (previus.get_sender().equals(chat.get_sender())){
                isShowName = false;
            }
        }
        ViewHolder view1 = (ViewHolder) holder;
        view1.bind(chat, isShowName);
    }

    @Override
    public int getItemCount() {
        return chatList.size();
    }


    public ChatListRecyclerAdapter(List<Chat> chatList, User user) {
        this.chatList = chatList;
        this.user1 = user;
    }

    private class ViewHolder extends RecyclerView.ViewHolder {
        private TextView txtName;
        private TextView txtMessage;
        private TextView txtTimeSend;
        private TextView txtTimeReceive;
        private int heightName;
        ViewHolder(View itemView) {
            super(itemView);
            txtName = (TextView) itemView.findViewById(R.id.user_name);
            if (txtName != null) {
                heightName = txtName.getLineHeight();
                Log.d(TAG, "ViewHolder: " + heightName);
            }
            txtMessage = (TextView) itemView.findViewById(R.id.message);
            txtTimeSend = (TextView) itemView.findViewById(R.id.time_send);
            txtTimeReceive = (TextView) itemView.findViewById(R.id.time_receiver);
        }

        void bind(Chat chat, boolean isShowName) {
            if (txtName != null) {
                if (isShowName) {
                    txtName.setText(chat.get_sender_name());

                    if (txtName.getHeight() == 0)
                        txtName.setHeight(heightName);
                } else {
                    txtName.setHeight(0);
                }
            }

            txtMessage.setText(chat.get_message());
            SimpleDateFormat format = new SimpleDateFormat("hh:mm dd/MM/yyyy",Locale.US);
            String date = format.format(new Date(chat.get_timestamp_sender()));
            txtTimeSend.setText("Gửi: " + date);
        }
    }
}
