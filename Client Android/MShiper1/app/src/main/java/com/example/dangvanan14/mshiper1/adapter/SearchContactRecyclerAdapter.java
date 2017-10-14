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
import com.example.dangvanan14.mshiper1.model.Order;
import com.example.dangvanan14.mshiper1.model.User;
import com.google.common.base.Predicate;
import com.google.common.collect.Collections2;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

public class SearchContactRecyclerAdapter extends RecyclerView.Adapter<SearchContactRecyclerAdapter.ViewHolder> {
    private List<User> users;

    public SearchContactRecyclerAdapter() {
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_contact, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        User user = users.get(position);
        holder.bind(user);
    }

    @Override
    public int getItemCount() {
        return users.size();
    }


    public SearchContactRecyclerAdapter(List<User> users) {
        this.users = users;
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        private TextView txtName;
        private TextView txtIsActive;
        private ImageView imageView;
        private TextView txtPhone;
        private CardView cardView;

        ViewHolder(View itemView) {
            super(itemView);
            txtName = (TextView) itemView.findViewById(R.id.user_name);
            txtIsActive = (TextView) itemView.findViewById(R.id.is_active);
            txtPhone = (TextView) itemView.findViewById(R.id.phone);
            imageView = (ImageView) itemView.findViewById(R.id.ic_user);
            cardView = (CardView) itemView.findViewById(R.id.card_view);
        }

        void bind(final User user) {
            txtName.setText(user.get_name());
            txtPhone.setText(user.get_phone());
            cardView.setOnClickListener(v -> {
//                Predicate<Order> predicate = input -> order.get_id().equals(input != null ? input.get_id() : "");
//                Collection<Order> result2 = Collections2.filter(users, predicate);
//                List<Order> order1 = new ArrayList<>(result2);
//                if ("MainActivity".equals(v.getContext().getClass().getSimpleName())) {
//                    Intent intent = new Intent(v.getContext(), DetailActivity.class);
//                    intent.putExtra("ID", order.get_id());
//                    intent.putExtra("order", order1.get(0));
//                    intent.putParcelableArrayListExtra("users", (ArrayList<? extends Parcelable>) users);
//                    v.getContext().startActivity(intent);
//                }
//
//                if ("SearchActivity".equals(v.getContext().getClass().getSimpleName())) {
//                    Intent intent = new Intent();
//                    intent.putExtra("ID", order.get_id());
//                    intent.putExtra("order", order1.get(0));
//                    ((Activity)(v.getContext())).setResult(BaseActivity.RESULT_SEARCH, intent);
//                    ((Activity)(v.getContext())).finish();
//                }
            });
        }
    }
}
