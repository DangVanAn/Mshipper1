package com.example.dangvanan14.mshiper1.fragment;

import android.media.Image;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageView;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.adapter.ChatListRecyclerAdapter;
import com.example.dangvanan14.mshiper1.adapter.OrderListRecyclerAdapter;
import com.example.dangvanan14.mshiper1.application.DefinedApp;
import com.example.dangvanan14.mshiper1.model.Chat;
import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ChatFragment extends BaseFragment implements View.OnClickListener {
    private ChatListRecyclerAdapter mAdapter;
    EditText inputChat;
    ImageView btnSend;
    private List<Chat> chatList = new ArrayList<>();

    public static ChatFragment newInstance() {
        ChatFragment chat = new ChatFragment();
//        Bundle args = new Bundle();
//        args.putParcelableArrayList("data", (ArrayList<? extends Parcelable>) orders);
//        order.setArguments(args);
        return chat;
    }
    private Emitter.Listener onNewMessage = new Emitter.Listener() {
        @Override
        public void call(final Object... args) {
            String username = (String) args[0];
            Log.d("TAG", "run: " + username + "   ");
        }
    };
    private Socket mSocket;
    {
        try {
            mSocket = IO.socket(DefinedApp.URL_SOCKET_CHAT);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }
    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        Bundle args = getArguments();
        View v = inflater.inflate(R.layout.fragment_chat, container, false);

        this.inputChat = (EditText) v.findViewById(R.id.inputChat);
        this.btnSend = (ImageView) v.findViewById(R.id.btnSendChat);
        this.btnSend.setOnClickListener(this);
        RecyclerView recyclerView = (RecyclerView) v.findViewById(R.id.rv_chat);
        LinearLayoutManager mLayoutManager = new LinearLayoutManager(getActivity());
        mLayoutManager.setStackFromEnd(true);
//        mLayoutManager.setReverseLayout(true);
        recyclerView.setLayoutManager(mLayoutManager);

        mAdapter = new ChatListRecyclerAdapter(chatList);
        recyclerView.setAdapter(mAdapter);

        mSocket.on("messages", onNewMessage);
        mSocket.on("chat", onNewMessage);
        mSocket.connect();

//        mSocket.emit("messages", gson.toJson(data));
        return v;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        mSocket.disconnect();
        mSocket.off("messages", onNewMessage);
    }

    @Override
    public void onClick(View v) {
        if (v.getId() == R.id.btnSendChat) {
            String text = inputChat.getText().toString();
            long time = (new Date()).getTime();
            chatList.add(new Chat(text, "Me", time));
            mAdapter.notifyDataSetChanged();
        }
    }
}
