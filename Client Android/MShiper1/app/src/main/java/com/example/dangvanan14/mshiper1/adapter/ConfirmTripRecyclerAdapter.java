package com.example.dangvanan14.mshiper1.adapter;

import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.activity.TripDetailActivity;
import com.example.dangvanan14.mshiper1.model.Trip;

import java.util.List;

public class ConfirmTripRecyclerAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {
    private static final String TAG = "TripRecyclerAdapter";
    private List<Trip> trips;

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_assign_driver, parent, false);
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


    public ConfirmTripRecyclerAdapter(List<Trip> trips) {
        this.trips = trips;
    }

    private class ViewHolder extends RecyclerView.ViewHolder {
        private TextView txtTripFrom;
        private TextView txtTripTo;
        private TextView txtNumberPlate;
        private TextView txtTon;
        private TextView txtTripTime;
        private View layout;

        ViewHolder(View itemView) {
            super(itemView);
            txtTripFrom = (TextView) itemView.findViewById(R.id.tripFrom);
            txtTripTo = (TextView) itemView.findViewById(R.id.tripTo);
            txtNumberPlate = (TextView) itemView.findViewById(R.id.txtNumberPlate);
            txtTon = (TextView) itemView.findViewById(R.id.ton);
            txtTripTime = (TextView) itemView.findViewById(R.id.tripTime);
            layout = itemView.findViewById(R.id.layout_assign);
        }

        void bind(Trip trip, int position) {
            txtTripFrom.setText("Trip " + position);
            txtTripTo.setText("Trip " + position);
            txtNumberPlate.setText("Trip " + position);
            txtTon.setText("Trip " + position);
            txtTripTime.setText(trip.getPercent() != 100 ? String.valueOf(trip.getPercent()) + "%" : "DONE");
            layout.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent i = new Intent(v.getContext(), TripDetailActivity.class);
                    i.putExtra("tripDetail", trip);
                    v.getContext().startActivity(i);
                }
            });
        }
    }
}
