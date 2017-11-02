package com.example.dangvanan14.mshiper1.adapter;

import android.app.Activity;
import android.content.Intent;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.LoadData;
import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.activity.ChatActivity;
import com.example.dangvanan14.mshiper1.activity.ContactActivity;
import com.example.dangvanan14.mshiper1.api.ICallbackApi;
import com.example.dangvanan14.mshiper1.application.App;
import com.example.dangvanan14.mshiper1.application.DefinedApp;
import com.example.dangvanan14.mshiper1.model.GroupChat;
import com.example.dangvanan14.mshiper1.model.User;
import com.example.dangvanan14.mshiper1.response.RepPost;

import org.slf4j.Logger;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;

import retrofit2.Call;

public class ContactRecyclerAdapter extends RecyclerView.Adapter<ContactRecyclerAdapter.ViewHolder> {
    private static final String TAG = "ContactRecyclerAdapter";
    private final ContactActivity context;
    private List<GroupChat> groupChats;

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_contact, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        GroupChat groupChat = groupChats.get(position);
        holder.bind(groupChat);
    }

    @Override
    public int getItemCount() {
        return groupChats.size();
    }


    public ContactRecyclerAdapter(ContactActivity context, List<GroupChat> groupChats) {
        this.context = context;
        this.groupChats = groupChats;
    }

    class ViewHolder extends RecyclerView.ViewHolder {
        private TextView txtName;
        private TextView txtIsActive;
        private ImageView imageView;
        private CardView cardView;

        ViewHolder(View itemView) {
            super(itemView);
            txtName = (TextView) itemView.findViewById(R.id.user_name);
            txtIsActive = (TextView) itemView.findViewById(R.id.is_active);
            imageView = (ImageView) itemView.findViewById(R.id.ic_user);
            cardView = (CardView) itemView.findViewById(R.id.card_view);
        }

        void bind(final GroupChat groupChat) {
            txtName.setText(groupChat.get_group_name());
            cardView.setOnClickListener(v -> {
                context.showProgressDialog();
//                postContact(groupChat);
            });
        }

        private void postContact(final User user) {
            context.user2 = user;

            final LoadData<RepPost> loadData = new LoadData<>(DefinedApp.API.CHAT);
            loadData.loadData(new Callable<Call<RepPost>>() {
                @Override
                public Call<RepPost> call() throws Exception {
                    User u1 = new User();
                    u1.set_id(App.getUser().get_id());
                    u1.set_name(App.getUser().get_name());

                    Log.d(TAG, "call: ");

                    List<User> userList = new ArrayList<>();
                    userList.add(u1);
                    userList.add(user);
                    return loadData.CreateRetrofit().getGroupChat2Member(userList);
                }
            }, new LoadData.CallbackDelegate<>(context, new CallBackImpl()));
        }
    }

    private static class CallBackImpl extends ICallbackApi<RepPost> {
        @Override
        public void onResponse(Activity activity, RepPost body, Logger LOG) {
            ContactActivity ac = (ContactActivity) activity;
            ac.dismissProgressDialog();
            if (body.isSuccess()) {
                Log.d(TAG, "onResponse: " + body.getMessage());
                Log.d(TAG, "onResponse data: " + body.getData());

                String idGroup = body.getData();

                Intent i = new Intent(ac, ChatActivity.class);
                i.putExtra("idGroup", idGroup);
                i.putExtra("user2", ac.user2);
                ac.startActivity(i);
            } else {
                Toast.makeText(ac, body.getMessage(), Toast.LENGTH_SHORT).show();
            }
        }

        @Override
        public void onFailure(Activity activity, Throwable t, Logger LOG) {
            ContactActivity ac = (ContactActivity) activity;
            ac.dismissProgressDialog();

            Log.e("TAG", "onFailure: Sai rồi nè");
            Toast.makeText(activity, "Không thể kết nối", Toast.LENGTH_SHORT).show();
        }
    }
}
