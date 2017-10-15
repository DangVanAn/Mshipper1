package com.example.dangvanan14.mshiper1.adapter;

import android.app.Activity;
import android.content.Intent;
import android.os.Parcelable;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
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
        ViewHolder view1 = (ViewHolder) holder;
        view1.bind(chat);
    }

    @Override
    public int getItemCount() {
        return chatList.size();
    }


    public ChatListRecyclerAdapter(List<Chat> chatList, User user) {
        this.chatList = chatList;
        this.user1 = user;
    }

    class ViewHolder extends RecyclerView.ViewHolder {
        private TextView txtName;
        private TextView txtMessage;
        private TextView txtTimeSend;
        private TextView txtTimeReceive;

        ViewHolder(View itemView) {
            super(itemView);
            txtName = (TextView) itemView.findViewById(R.id.user_name);
            txtMessage = (TextView) itemView.findViewById(R.id.message);
            txtTimeSend = (TextView) itemView.findViewById(R.id.time_send);
            txtTimeReceive = (TextView) itemView.findViewById(R.id.time_receiver);
        }

        void bind(Chat chat) {
            txtName.setText(chat.get_sender_name());
            txtMessage.setText(chat.get_message());
            SimpleDateFormat format = new SimpleDateFormat("hh:mm dd/MM/yyyy",Locale.US);
            String date = format.format(new Date(chat.get_timestamp_sender()));
            txtTimeSend.setText("Gửi: " + date);
        }
    }
}
