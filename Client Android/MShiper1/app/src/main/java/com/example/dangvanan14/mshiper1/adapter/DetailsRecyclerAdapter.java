package com.example.dangvanan14.mshiper1.adapter;

import android.graphics.Color;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.model.Detail;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class DetailsRecyclerAdapter extends RecyclerView.Adapter<DetailsRecyclerAdapter.ViewHolder> {
    private List<Detail> details;
    private String Id = "123";

    public DetailsRecyclerAdapter() {
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_detail, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        Detail detail = details.get(position);
        holder.bind(detail);
    }

    @Override
    public int getItemCount() {
        return details.size();
    }


    public DetailsRecyclerAdapter(List<Detail> details) {
        this.details = details;
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        private TextView txtTime;
        private TextView txtId;
        private TextView txtMoney;
        private ImageView imageView;
        private TextView txtName;
        private CardView cardView;
        private boolean isCheck = true;

        public ViewHolder(View itemView) {
            super(itemView);
            txtId = (TextView) itemView.findViewById(R.id.id);
            txtMoney = (TextView) itemView.findViewById(R.id.money);
            txtTime = (TextView) itemView.findViewById(R.id.deliveryTime);
            txtName = (TextView) itemView.findViewById(R.id.name);
            imageView = (ImageView) itemView.findViewById(R.id.icOrder);
            cardView = (CardView) itemView.findViewById(R.id.card_view);
            cardView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (isCheck) {
                        isCheck = false;
                        imageView.setImageResource(android.R.drawable.checkbox_off_background);
                    } else {
                        isCheck = true;
                        imageView.setImageResource(android.R.drawable.checkbox_on_background);
                    }
                }
            });
        }

        void bind(Detail detail) {
            txtId.setText(detail.get_id_package());
            txtMoney.setText(detail.get_pay_type());
            txtName.setText("");
            Date date = new Date(detail.get_delivery_daytime());
            SimpleDateFormat df2 = new SimpleDateFormat("dd/MM/yy");
            txtTime.setText(df2.format(date));

            if (detail.get_status() == null)
                return;

            if (detail.get_status().equals(R.string.completeDetail))
                cardView.setCardBackgroundColor(Color.parseColor("#C8E6C9"));
            else if (detail.get_status().equals(R.string.cancelDetail))
                cardView.setCardBackgroundColor(Color.parseColor("#FFCDD2"));
        }
    }
}
