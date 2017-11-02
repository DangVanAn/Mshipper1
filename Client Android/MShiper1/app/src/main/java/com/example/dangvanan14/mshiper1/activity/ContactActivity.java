package com.example.dangvanan14.mshiper1.activity;

import android.app.Activity;
import android.os.Bundle;
import android.os.Handler;
import android.support.annotation.Nullable;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.support.v7.widget.SearchView;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.view.View;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.LoadData;
import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.adapter.ContactRecyclerAdapter;
import com.example.dangvanan14.mshiper1.adapter.SearchContactRecyclerAdapter;
import com.example.dangvanan14.mshiper1.api.ICallbackApi;
import com.example.dangvanan14.mshiper1.application.App;
import com.example.dangvanan14.mshiper1.application.DefinedApp;
import com.example.dangvanan14.mshiper1.model.GroupChat;
import com.example.dangvanan14.mshiper1.model.User;
import com.example.dangvanan14.mshiper1.response.RepPost;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import org.slf4j.Logger;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.Callable;

import retrofit2.Call;

public class ContactActivity extends BaseActivity implements SearchView.OnQueryTextListener {
    private static final String TAG = "ContactActivity";
    private List<User> resultSearch = new ArrayList<>();
    private List<GroupChat> contactList = new ArrayList<>();

    private SearchContactRecyclerAdapter mAdapterSearch;
    private ContactRecyclerAdapter mAdapterContact;
    private RecyclerView rvSearch;
    private RecyclerView rvContact;
    private Handler mHandler = new Handler();
    public User user1;
    public User user2;

    @Override
    public void onPermissionsGranted(int requestCode) {
        Toast.makeText(this, "Permissions Received.", Toast.LENGTH_LONG).show();
    }

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_contact_search);

        user1 = App.getUser();

        setupToolbar();

        rvSearch = (RecyclerView) findViewById(R.id.rv_search);
        rvSearch.setLayoutManager(new LinearLayoutManager(getApplicationContext()));
        mAdapterSearch = new SearchContactRecyclerAdapter(this, resultSearch);
        rvSearch.setAdapter(mAdapterSearch);

        rvContact = (RecyclerView) findViewById(R.id.rv_contact);
        rvContact.setLayoutManager(new LinearLayoutManager(getApplicationContext()));
        mAdapterContact = new ContactRecyclerAdapter(this, contactList);
        rvContact.setAdapter(mAdapterContact);

        rvSearch.setVisibility(View.GONE);

        getContact(App.getUser().get_id());
    }

    public void setupToolbar() {
        Toolbar toolbar = (Toolbar) findViewById(R.id.my_toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setTitle(R.string.textContact);
        toolbar.setNavigationOnClickListener(v -> onBackPressed());
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater menuInflater = getMenuInflater();
        menuInflater.inflate(R.menu.search_menu, menu);

        MenuItem searchItem = menu.findItem(R.id.action_search);

        SearchView searchView = (SearchView) searchItem.getActionView();
        searchView.setOnQueryTextListener(this);
        searchView.setFocusable(false);
        searchView.setIconified(true);
        searchView.clearFocus();
        searchView.setQueryHint(getString(R.string.searchContact));
        searchView.setOnCloseListener(() -> {
            rvContact.setVisibility(View.VISIBLE);
            rvSearch.setVisibility(View.GONE);
            return false;
        });
        searchView.setOnSearchClickListener(v -> {
            if (resultSearch.size() != 0){
                resultSearch.clear();
            }
            rvContact.setVisibility(View.GONE);
            rvSearch.setVisibility(View.VISIBLE);
        });
        return true;
    }

    @Override
    public boolean onQueryTextSubmit(String query) {
        return false;
    }

    @Override
    public boolean onQueryTextChange(final String newText) {
        Log.d(TAG, "onQueryTextChange: " + newText);
        if (!newText.equals("")) {
            resultSearch.clear();
            mHandler.removeCallbacksAndMessages(null);

            mHandler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    postFind(newText);
                }
            }, 300);
        }
        return true;
    }

    private void postFind(final String phone) {
        final LoadData<RepPost> loadData = new LoadData<>();
        loadData.loadData(new Callable<Call<RepPost>>() {
            @Override
            public Call<RepPost> call() throws Exception {
                return loadData.CreateRetrofit().postFindByPhone(new User(phone));
            }
        }, new LoadData.CallbackDelegate<RepPost>(this, new CallBackSearchImpl()));
    }

    private static class CallBackSearchImpl extends ICallbackApi<RepPost> {
        @Override
        public void onResponse(Activity activity, RepPost body, Logger LOG) {
            ContactActivity ac = (ContactActivity) activity;
            ac.dismissProgressDialog();
            if (body.isSuccess()) {
                Log.d(TAG, "onResponse: " + body.getMessage());
                Log.d(TAG, "onResponse data: " + body.getData());
                Gson gson = new Gson();
                Type listType = new TypeToken<List<User>>() {
                }.getType();
                List<User> user = gson.fromJson(body.getData(), listType);

                Iterator itr = user.iterator();
                try {
                    while (itr.hasNext()) {
                        User u = (User) itr.next();
                        if (ac.user1.get_id().equals(u.get_id())) {
                            itr.remove();
                            break;
                        }
                    }
                    ac.resultSearch.addAll(user);

                    ac.mAdapterSearch.notifyDataSetChanged();
                    ac.rvSearch.scrollToPosition(0);
                } catch (Exception e) {
                    e.printStackTrace();
                    Toast.makeText(ac, "Lỗi id null", Toast.LENGTH_SHORT).show();
                }
            } else {
                Toast.makeText(ac, body.getMessage(), Toast.LENGTH_SHORT).show();
            }
        }

        @Override
        public void onFailure(Throwable t, Logger LOG) {
            Log.e("TAG", "onFailure: Sai rồi nè");
        }
    }

    private void getContact(final String id) {
        contactList.clear();
        showProgressDialog();
        final LoadData<RepPost> loadData = new LoadData<>(DefinedApp.API.CHAT);
        loadData.loadData(new Callable<Call<RepPost>>() {
            @Override
            public Call<RepPost> call() throws Exception {
                User u = new User();
                u.set_id(id);
                return loadData.CreateRetrofit().getContact(u);
            }
        }, new LoadData.CallbackDelegate<>(this, new CallBackContactImpl()));
    }

    private static class CallBackContactImpl extends ICallbackApi<RepPost> {
        @Override
        public void onResponse(Activity activity, RepPost body, Logger LOG) {
            ContactActivity ac = (ContactActivity) activity;
            ac.dismissProgressDialog();
            if (body.isSuccess()) {
                Log.d(TAG, "onResponse: " + body.getMessage());
                Log.d(TAG, "onResponse data: " + body.getData());
                Gson gson = new Gson();
                Type listType = new TypeToken<List<GroupChat>>() {
                }.getType();
                List<GroupChat> groupChats = gson.fromJson(body.getData(), listType);

                try {
                    ac.contactList.addAll(groupChats);
                    ac.mAdapterContact.notifyDataSetChanged();
                    ac.rvContact.scrollToPosition(0);
                } catch (Exception e) {
                    e.printStackTrace();
                    Toast.makeText(ac, "Lỗi id null", Toast.LENGTH_SHORT).show();
                }
            } else {
                Toast.makeText(ac, body.getMessage(), Toast.LENGTH_SHORT).show();
            }
        }

        @Override
        public void onFailure(Throwable t, Logger LOG) {
            Log.e("TAG", "onFailure: Sai rồi nè");
        }
    }
}
