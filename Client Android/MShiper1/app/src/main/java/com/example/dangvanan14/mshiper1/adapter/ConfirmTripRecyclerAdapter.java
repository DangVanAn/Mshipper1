package com.example.dangvanan14.mshiper1.adapter;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.LoadData;
import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.activity.BaseActivity;
import com.example.dangvanan14.mshiper1.activity.ConfirmTripActivity;
import com.example.dangvanan14.mshiper1.activity.TripDetailActivity;
import com.example.dangvanan14.mshiper1.api.ICallbackApi;
import com.example.dangvanan14.mshiper1.application.App;
import com.example.dangvanan14.mshiper1.fragment.TripDetailStepFragment;
import com.example.dangvanan14.mshiper1.model.AssignDriver;
import com.example.dangvanan14.mshiper1.model.PreOrderSumAssign;
import com.example.dangvanan14.mshiper1.model.Trip;
import com.example.dangvanan14.mshiper1.response.RepPost;

import org.slf4j.Logger;
import org.w3c.dom.Text;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.Callable;

import retrofit2.Call;

public class ConfirmTripRecyclerAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {
    private static final String TAG = "TripRecyclerAdapter";
    private Context context;
    private List<Trip> trips;

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_confirm_trip, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
        Trip trip = trips.get(position);
        ViewHolder view = (ViewHolder) holder;
        view.bind(trip, position);
    }

    @Override
    public int getItemCount() {
        return trips.size();
    }


    public ConfirmTripRecyclerAdapter(Context context, List<Trip> trips) {
        this.trips = trips;
        this.context = context;
    }

    private class ViewHolder extends RecyclerView.ViewHolder {
        private TextView txtSumTon;
        private TextView txtTripFrom;
        private TextView txtTripTo;
        private TextView txtNumberPlate;
        private TextView txtTon;
        private TextView txtTripTimeFrom;
        private TextView txtTripTimeTo;
        private ImageButton btnConfirm;
        private ImageButton btnCancel;
        private View layout;

        ViewHolder(View itemView) {
            super(itemView);
            txtTripFrom = itemView.findViewById(R.id.tripFrom);
            txtTripTo = itemView.findViewById(R.id.tripTo);
            txtNumberPlate = itemView.findViewById(R.id.txtNumberPlate);
            txtTon = itemView.findViewById(R.id.ton);
            txtSumTon = itemView.findViewById(R.id.sumTon);
            txtTripTimeFrom = itemView.findViewById(R.id.tripTimeFrom);
            txtTripTimeTo = itemView.findViewById(R.id.tripTimeTo);
            btnCancel = itemView.findViewById(R.id.btnConfirm);
            btnConfirm = itemView.findViewById(R.id.btnCancel);
            layout = itemView.findViewById(R.id.layout_assign);
        }

        void bind(Trip trip, int position) {
            List<AssignDriver> assignDriverList = trip.getData();
            if (assignDriverList == null || assignDriverList.size() == 0) {
                return;
            }
            String from = assignDriverList.get(0).get_pre_order_sum_assign().get(0).get_pre_order_sum().get(0).get_address_warehouse();
            String numberPlate = assignDriverList.get(0).get_pre_order_sum_assign().get(0).get_number_plate();
            StringBuilder destinations = new StringBuilder();
            StringBuilder tonStrBuilder = new StringBuilder();
            StringBuilder timedes = new StringBuilder();
            double tonDouble = 0;
            String timeFrom = assignDriverList.get(0).get_pre_order_sum_assign().get(0).get_pre_order_sum().get(0).get_etd();

            List<String> idPreOrderSumAssign = new ArrayList<>();

            for (int i = 0; i < assignDriverList.size(); i++) {
                boolean isEnd = i == assignDriverList.size() - 1;
                PreOrderSumAssign preOrderSumAssign = assignDriverList.get(i).get_pre_order_sum_assign().get(0);

                idPreOrderSumAssign.add(preOrderSumAssign.get_id());
                destinations.append(i + 1).append(".     ").append(preOrderSumAssign.get_pre_order_sum().get(0).get_address_delivery()).append(isEnd ? "" : "\n");
                tonStrBuilder.append(i + 1).append(".     ").append(String.format("%.3f", preOrderSumAssign.get_ton_real())).append(isEnd ? "" : "\n");
                tonDouble += preOrderSumAssign.get_ton_real();

                timedes.append(i + 1).append(". ").append(preOrderSumAssign.get_pre_order_sum().get(0).get_eta()).append(isEnd ? "" : "\n");
            }

            txtTripFrom.setText(from);
            txtTripTo.setText(destinations.toString());
            txtNumberPlate.setText(numberPlate);
            txtTon.setText(tonStrBuilder.toString());
            txtTripTimeFrom.setText(timeFrom);
            txtTripTimeTo.setText(timedes);
            txtSumTon.setText(String.format("%.3f", tonDouble));
            layout.setOnClickListener(v -> {
                Intent i = new Intent(v.getContext(), TripDetailActivity.class);
                i.putExtra("tripDetail", trip);
                v.getContext().startActivity(i);
            });

            btnCancel.setOnClickListener(view -> {
                long timeNow = (new Date()).getTime();
                ((ConfirmTripActivity)context).confirmTrip(idPreOrderSumAssign, "_driver_cancel", timeNow, position);
            });

            btnCancel.setOnClickListener(view -> {
                long timeNow = (new Date()).getTime();
                ((ConfirmTripActivity)context).confirmTrip(idPreOrderSumAssign, "_driver_accept", timeNow, position);
            });
        }
    }
}
