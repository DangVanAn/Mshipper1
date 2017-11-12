package com.example.dangvanan14.mshiper1.adapter;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.dialog.ConfirmVehicleStateDialogFragment;
import com.example.dangvanan14.mshiper1.fragment.VehicleStateFragment;
import com.example.dangvanan14.mshiper1.model.PreOrderSumAssign;
import com.example.dangvanan14.mshiper1.model.Trip;
import com.example.dangvanan14.mshiper1.model.TripVehicle;

import java.util.List;

public class VehicleStateRecyclerAdapter extends RecyclerView.Adapter<VehicleStateRecyclerAdapter.ViewHolder> {
    private static final String TAG = "VehicleStateRA";
    private static final String TAG_VEHICLE_CONFIRM_DIALOG = "TAG_VEHICLE_CONFIRM_DIALOG";
    private final Fragment fragment;
    private FragmentManager fm;
    private int status;
    private List<TripVehicle> trips;

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_vehicle, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        TripVehicle trip = trips.get(position);
        holder.bind(trip);
    }

    @Override
    public int getItemCount() {
        return trips.size();
    }

    public VehicleStateRecyclerAdapter(Fragment fragment, FragmentManager fm, List<TripVehicle> trips, int status) {
        this.fm = fm;
        this.fragment = fragment;
        this.trips = trips;
        this.status = status;
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        private TextView txtNumberPlate;
        private ImageView imageView;
        private CardView cardView;

        public ViewHolder(View itemView) {
            super(itemView);
            txtNumberPlate = (TextView) itemView.findViewById(R.id.txtNumberPlate);
            imageView = (ImageView) itemView.findViewById(R.id.icVehicleState);
            cardView = (CardView) itemView.findViewById(R.id.card_view);
        }

        void bind(final TripVehicle trip) {
            txtNumberPlate.setText(trip.getData().get(0).get_number_plate());
            cardView.setOnClickListener(v -> {
                Fragment prevFrag = fm.findFragmentByTag(TAG_VEHICLE_CONFIRM_DIALOG);
                FragmentTransaction ft = fm.beginTransaction();

                if (prevFrag == null) {
                    ConfirmVehicleStateDialogFragment newFrag = ConfirmVehicleStateDialogFragment.newInstance(trip, status);
                    newFrag.setTargetFragment(fragment, 100);

                    ft.add(newFrag, TAG_VEHICLE_CONFIRM_DIALOG);
                } else {
                    ft.remove(prevFrag);
                }
                ft.commitAllowingStateLoss();
            });
//            imageView.setImageResource(ic);
        }
    }
}
