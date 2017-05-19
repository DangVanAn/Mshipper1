package com.example.dangvanan14.mshiper1.adapter;

import android.content.Context;
import android.graphics.Color;
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
import com.example.dangvanan14.mshiper1.fragment.BoxDetailFragment;
import com.example.dangvanan14.mshiper1.model.Detail;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class DetailsRecyclerAdapter extends RecyclerView.Adapter<DetailsRecyclerAdapter.ViewHolder> {
    private BoxDetailFragment.OnSendDataEventListener onSendDataEventListener;
    private BoxDetailFragment.OnSendDataEventListener adapterSendDataEventListener;
    private List<Detail> details;
    private ArrayList<String> selectedDetail = new ArrayList<>();

    public DetailsRecyclerAdapter() {
    }

    Context context;

    public DetailsRecyclerAdapter(Context context, List<Detail> details, BoxDetailFragment.OnSendDataEventListener onSendDataEventListener, BoxDetailFragment.OnSendDataEventListener adapterSendDataEventListener) {
        this.details = details;
        this.onSendDataEventListener = onSendDataEventListener;
        this.adapterSendDataEventListener = adapterSendDataEventListener;
        this.context = context;
        for (Detail d : details) {
            if (!(d.get_status().equals(context.getResources().getString(R.string.completeDetail))
                    || d.get_status().equals(context.getResources().getString(R.string.cancelDetail))))
                this.selectedDetail.add(d.get_id_package());
        }
        onSendDataEventListener.sendSelectedDetail(selectedDetail);
        adapterSendDataEventListener.sendSelectedDetail(selectedDetail);
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

    void updateListSelectedDetail(Detail detail, boolean isAdd) {
        if (isAdd)
            selectedDetail.add(detail.get_id_package());
        else
            selectedDetail.remove(detail.get_id_package());
        onSendDataEventListener.sendSelectedDetail(selectedDetail);
        adapterSendDataEventListener.sendSelectedDetail(selectedDetail);

    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        private TextView txtTime;
        private TextView txtId;
        private TextView txtMoney;
        private ImageView imageView;
        private TextView txtStatus;
        private CardView cardView;
        private boolean isCheck = true;
        private Detail detail;

        public ViewHolder(View itemView) {
            super(itemView);
            txtId = (TextView) itemView.findViewById(R.id.id);
            txtMoney = (TextView) itemView.findViewById(R.id.money);
            txtTime = (TextView) itemView.findViewById(R.id.deliveryTime);
            txtStatus = (TextView) itemView.findViewById(R.id.status);
            imageView = (ImageView) itemView.findViewById(R.id.icOrder);
            cardView = (CardView) itemView.findViewById(R.id.card_view);
            cardView.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    if (detail.get_status() == null)
                        return;

                    if (detail.get_status().equals(txtMoney.getContext().getResources().getString(R.string.completeDetail))) {
                        Toast.makeText(v.getContext(), "Gói hàng đã hoàn thành.", Toast.LENGTH_SHORT).show();
                        return;
                    } else if (detail.get_status().equals(txtMoney.getContext().getResources().getString(R.string.cancelDetail))) {
                        Toast.makeText(v.getContext(), "Gói hàng đã hủy.", Toast.LENGTH_SHORT).show();
                        return;
                    }

                    if (isCheck) {
                        isCheck = false;
                        imageView.setImageResource(android.R.drawable.checkbox_off_background);
                        updateListSelectedDetail(detail, false);
                    } else {
                        isCheck = true;
                        imageView.setImageResource(android.R.drawable.checkbox_on_background);
                        updateListSelectedDetail(detail, true);
                    }
                }
            });
        }

        void bind(Detail detail) {
            this.detail = detail;
            txtId.setText(detail.get_id_package());
            txtMoney.setText((detail.get_total_pay() == 0 ? "" : detail.get_total_pay()) + txtMoney.getContext().getResources().getString(R.string.denomination));
            txtStatus.setText(detail.get_status());
            if (detail.get_delivery_daytime() != 0) {
                Date date = new Date(detail.get_delivery_daytime());
                SimpleDateFormat df2 = new SimpleDateFormat("dd/MM/yyyy");
                txtTime.setText(df2.format(date));
            } else
                txtTime.setText("");

            if (detail.get_status().equals(txtMoney.getContext().getResources().getString(R.string.completeDetail))
                    || detail.get_status().equals(txtMoney.getContext().getResources().getString(R.string.cancelDetail))) {
                imageView.setImageResource(R.drawable.ic_none);
            }
        }
    }
}
