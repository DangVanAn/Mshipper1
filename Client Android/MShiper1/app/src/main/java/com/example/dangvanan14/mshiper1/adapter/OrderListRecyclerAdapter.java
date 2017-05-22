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
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.activity.BaseActivity;
import com.example.dangvanan14.mshiper1.activity.DetailActivity;
import com.example.dangvanan14.mshiper1.activity.MainActivity;
import com.example.dangvanan14.mshiper1.activity.SearchActivity;
import com.example.dangvanan14.mshiper1.model.Order;
import com.google.common.base.Predicate;
import com.google.common.collect.Collections2;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

public class OrderListRecyclerAdapter extends RecyclerView.Adapter<OrderListRecyclerAdapter.ViewHolder> {
    private List<Order> orders;

    public OrderListRecyclerAdapter() {
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_order, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        Order order = orders.get(position);
        holder.bind(order);
    }

    @Override
    public int getItemCount() {
        return orders.size();
    }


    public OrderListRecyclerAdapter(List<Order> orders) {
        this.orders = orders;
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        private TextView txtId;
        private TextView txtTime;
        private ImageView imageView;
        private TextView txtAddress;
        private CardView cardView;

        public ViewHolder(View itemView) {
            super(itemView);
            txtId = (TextView) itemView.findViewById(R.id.id);
            txtTime = (TextView) itemView.findViewById(R.id.time);
            txtAddress = (TextView) itemView.findViewById(R.id.address);
            imageView = (ImageView) itemView.findViewById(R.id.icOrder);
            cardView = (CardView) itemView.findViewById(R.id.card_view);
        }

        void bind(final Order order) {
            txtId.setText(order.get_id());
            Date date = new Date(order.get_created_date());
            SimpleDateFormat df2 = new SimpleDateFormat("dd/MM/yyyy");
            txtTime.setText(df2.format(date));
            txtAddress.setText(order.get_address());
            int ic = R.drawable.ic_time;
            if (order.get_order_status().equals(imageView.getContext().getResources().getString(R.string.statusCompleteOrder))) {
                ic = R.drawable.ic_ok;
            } else if (order.get_order_status().equals(imageView.getContext().getResources().getString(R.string.statusCancelOrder))) {
                ic = R.drawable.ic_cancel;
            }
            cardView.setOnClickListener(v -> {

                Predicate<Order> predicate = input -> order.get_id().equals(input != null ? input.get_id() : "");
                Collection<Order> result2 = Collections2.filter(orders, predicate);
                List<Order> order1 = new ArrayList<>(result2);
                if ("MainActivity".equals(v.getContext().getClass().getSimpleName())) {
                    Intent intent = new Intent(v.getContext(), DetailActivity.class);
                    intent.putExtra("ID", order.get_id());
                    intent.putExtra("order", order1.get(0));
                    intent.putParcelableArrayListExtra("orders", (ArrayList<? extends Parcelable>) orders);
                    v.getContext().startActivity(intent);
                }

                if ("SearchActivity".equals(v.getContext().getClass().getSimpleName())) {
                    Intent intent = new Intent();
                    intent.putExtra("ID", order.get_id());
                    intent.putExtra("order", order1.get(0));
                    ((Activity)(v.getContext())).setResult(BaseActivity.RESULT_SEARCH, intent);
                    ((Activity)(v.getContext())).finish();
                }

            });
            imageView.setImageResource(ic);
        }
    }
}
