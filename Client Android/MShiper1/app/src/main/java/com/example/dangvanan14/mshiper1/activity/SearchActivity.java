package com.example.dangvanan14.mshiper1.activity;

import android.content.Intent;
import android.os.Bundle;
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

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.adapter.OrderListRecyclerAdapter;
import com.example.dangvanan14.mshiper1.model.Order;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;

import java.util.ArrayList;
import java.util.List;

public class SearchActivity extends BaseActivity implements SearchView.OnQueryTextListener {
    private static final String TAG = "SearchActivity";
    private SearchView searchView;
    private List<Order> orders = new ArrayList<>();
    private List<Order> resultSearch = new ArrayList<>();

    private OrderListRecyclerAdapter mAdapter;
    private RecyclerView recyclerView;
    @Override
    public void onPermissionsGranted(int requestCode) {
        Toast.makeText(this, "Permissions Received.", Toast.LENGTH_LONG).show();
    }
    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search);

        orders = getIntent().getParcelableArrayListExtra("orders");

        Toolbar toolbar = (Toolbar) findViewById(R.id.my_toolbar);
        setSupportActionBar(toolbar);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setTitle(R.string.textSearch);
        toolbar.setNavigationOnClickListener(v -> onBackPressed());

        recyclerView = (RecyclerView) findViewById(R.id.rv_order);
        recyclerView.setLayoutManager(new LinearLayoutManager(getApplicationContext()));
        mAdapter = new OrderListRecyclerAdapter(resultSearch);
        recyclerView.setAdapter(mAdapter);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        MenuInflater menuInflater = getMenuInflater();
        menuInflater.inflate(R.menu.search_menu, menu);

        MenuItem searchItem = menu.findItem(R.id.action_search);

        searchView = (SearchView) searchItem.getActionView();
        searchView.setOnQueryTextListener(this);
        searchView.setFocusable(true);
        searchView.setIconified(false);
        searchView.requestFocusFromTouch();
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        switch (item.getItemId()) {
            case R.id.action_search:
                Intent intent = new Intent(this, SearchActivity.class);
                startActivity(intent);
                return true;
            case R.id.action_encode:
                new IntentIntegrator(this).initiateScan();
                return true;
        }

        return true;
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
        if (result != null) {
            if (result.getContents() == null) {
                Log.d(TAG, "onActivityResult: Cancelled");
            } else {
                Log.d(TAG, "onActivityResult: Scanned");
            }
        } else {
            super.onActivityResult(requestCode, resultCode, data);
        }
    }

    @Override
    public boolean onQueryTextSubmit(String query) {
        return false;
    }

    @Override
    public boolean onQueryTextChange(String newText) {
        Log.d(TAG, "onQueryTextChange: " + newText);
        resultSearch.clear();
        if (!newText.equals("")) {
            filter(orders, newText, resultSearch);
        }
        mAdapter.notifyDataSetChanged();
        recyclerView.scrollToPosition(0);

        return true;
    }

    private static List<Order> filter(List<Order> models, String query, List<Order> resultSearch) {
        final String lowerCaseQuery = query.toLowerCase();

        for (Order model : models) {
            final String text = model.get_id().toLowerCase();
            if (text.contains(lowerCaseQuery)) {
                resultSearch.add(model);
            }
        }
        return resultSearch;
    }
}
