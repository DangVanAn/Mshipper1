package com.example.dangvanan14.mshiper1.adapter;

import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.MainActivity;
import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.model.Order;

import java.util.List;

/**
 * Created by Sherman on 2/23/2017.
 */
public class OrderListRecyclerAdapter extends RecyclerView.Adapter<OrderListRecyclerAdapter.ViewHolder> {
    private List<Order> listOfOrder;

    public OrderListRecyclerAdapter() {
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_order, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        Order order = listOfOrder.get(position);
        holder.bind(order);
    }

    @Override
    public int getItemCount() {
        return listOfOrder.size();
    }


    public OrderListRecyclerAdapter(List<Order> listOfOrder) {
        this.listOfOrder = listOfOrder;
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        private TextView txtId;
        private TextView txtTime;
        private TextView txtAddress;
        private CardView cardView;
        public ViewHolder(View itemView) {
            super(itemView);
            txtId = (TextView) itemView.findViewById(R.id.id);
            txtTime = (TextView) itemView.findViewById(R.id.time);
            txtAddress = (TextView) itemView.findViewById(R.id.address);
            cardView = (CardView) itemView.findViewById(R.id.card_view);
            cardView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Toast.makeText(v.getContext(), "ádasdasdasdasdasdasdasd", Toast.LENGTH_SHORT).show();
                }
            });
        }

        void bind(Order order) {
            txtId.setText(order.getId());
            txtTime.setText(order.getTime());
            txtAddress.setText(order.getAddress());
        }
    }
}
