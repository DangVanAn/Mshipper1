package com.example.dangvanan14.mshiper1.activity;

import android.content.Intent;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.adapter.ChatListRecyclerAdapter;
import com.example.dangvanan14.mshiper1.application.App;
import com.example.dangvanan14.mshiper1.application.DefinedApp;
import com.example.dangvanan14.mshiper1.model.Chat;
import com.example.dangvanan14.mshiper1.model.User;
import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;
import com.google.gson.Gson;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ChatActivity extends BaseActivity implements View.OnClickListener {
    private String idGroup;
    private ChatListRecyclerAdapter mAdapter;
    private EditText inputChat;
    private RecyclerView recyclerView;
    private List<Chat> chatList = new ArrayList<>();
    private User user1;
    private User user2;
    private boolean isJoin = false;

    private static final String TAG = "ChatActivity";

    private Socket mSocket;

    {
        try {
            mSocket = IO.socket(DefinedApp.URL_SOCKET_CHAT);
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onPermissionsGranted(int requestCode) {
        Toast.makeText(this, "Permissions Received.", Toast.LENGTH_LONG).show();
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_chat);

        Intent i = getIntent();
        idGroup = i.getStringExtra("idGroup");

        user1 = App.getUser();
        user2 = i.getParcelableExtra("user2");

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar_chat);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setTitle(user2.get_name());
        toolbar.setNavigationOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });

        this.inputChat = (EditText) findViewById(R.id.inputChat);
        ImageView btnSend = (ImageView) findViewById(R.id.btnSendChat);
        btnSend.setOnClickListener(this);
        recyclerView = (RecyclerView) findViewById(R.id.rv_chat);
        LinearLayoutManager mLayoutManager = new LinearLayoutManager(this);
        mLayoutManager.setStackFromEnd(true);
        recyclerView.setLayoutManager(mLayoutManager);

        mAdapter = new ChatListRecyclerAdapter(chatList, user1);
        recyclerView.setAdapter(mAdapter);

        mSocket.on("connectUser", onConnect);
        mSocket.on("join", onJoin);
        mSocket.on("chat", onNewMessage);
        mSocket.connect();
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        return true;
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        mSocket.disconnect();
        mSocket.off("connectUser", onConnect);
        mSocket.off("chat", onNewMessage);
    }

    @Override
    public void onClick(View v) {
        if (v.getId() == R.id.btnSendChat) {
            String text = inputChat.getText().toString();
            if (text.isEmpty()) {
                return;
            }
            if (!mSocket.connected() || !isJoin) {
                Toast.makeText(this, "Chưa kết nối !!!", Toast.LENGTH_SHORT).show();
                return;
            }
            inputChat.setText("");
            long time = (new Date()).getTime();
            Chat chat = new Chat(text, user1.get_id(), user1.get_name(), user2.get_id(), user2.get_name(), time, idGroup, true);
            chatList.add(chat);

            Gson gson = new Gson();
            mSocket.emit("chat", gson.toJson(chat));

            int id = chatList.size() - 1;
            mAdapter.notifyItemInserted(id);
            recyclerView.scrollToPosition(id);
        }
    }

    private Emitter.Listener onConnect = new Emitter.Listener() {
        @Override
        public void call(final Object... args) {
            String json = (String) args[0];
            Log.d(TAG, "run: " + json + "   ");
            if (json.equals("Connected")) {
                mSocket.emit("join", idGroup);
            }
        }
    };

    private Emitter.Listener onJoin = new Emitter.Listener() {
        @Override
        public void call(final Object... args) {
            String json = (String) args[0];
            Log.d(TAG, "run: " + json + "   ");
            if (json.equals("Joined")){
                isJoin = true;
            }
        }
    };

    private Emitter.Listener onNewMessage = new Emitter.Listener() {
        @Override
        public void call(final Object... args) {
            String json = (String) args[0];
            Log.d(TAG, "run: " + json + "   ");
            Gson gson = new Gson();
            Chat chat = gson.fromJson(json, Chat.class);

            chatList.add(chat);
            final int id = chatList.size() - 1;

            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    mAdapter.notifyItemInserted(id);
                    recyclerView.scrollToPosition(id);
                }
            });
        }
    };
}
