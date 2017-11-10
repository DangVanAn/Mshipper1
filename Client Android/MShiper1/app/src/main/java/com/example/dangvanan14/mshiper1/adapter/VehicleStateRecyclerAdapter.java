package com.example.dangvanan14.mshiper1.adapter;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.dialog.CancelOrderDialogFragment;
import com.example.dangvanan14.mshiper1.dialog.ConfirmVehicleStateDialogFragment;
import com.example.dangvanan14.mshiper1.model.Detail;
import com.example.dangvanan14.mshiper1.model.PreOrderSumAssign;

import java.util.ArrayList;
import java.util.List;

public class VehicleStateRecyclerAdapter extends RecyclerView.Adapter<VehicleStateRecyclerAdapter.ViewHolder> {
    private static final String TAG = "VehicleStateRA";
    private static final String TAG_VEHICLE_CONFIRM_DIALOG = "TAG_VEHICLE_CONFIRM_DIALOG";
    private FragmentManager fm;
    private int status;
    private List<PreOrderSumAssign> preOrderSumAssignList;

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_vehicle, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        PreOrderSumAssign preOrderSumAssign = preOrderSumAssignList.get(position);
        holder.bind(preOrderSumAssign);
    }

    @Override
    public int getItemCount() {
        return preOrderSumAssignList.size();
    }


    public VehicleStateRecyclerAdapter(FragmentManager fm, List<PreOrderSumAssign> preOrderSumAssigns, int status) {
        this.fm = fm;
        this.preOrderSumAssignList = preOrderSumAssigns;
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

        void bind(final PreOrderSumAssign preOrderSumAssign) {
            txtNumberPlate.setText(preOrderSumAssign.get_number_plate());
            cardView.setOnClickListener(v -> {
                Fragment prevFrag = fm.findFragmentByTag(TAG_VEHICLE_CONFIRM_DIALOG);
                FragmentTransaction ft = fm.beginTransaction();

                if (prevFrag == null) {
                    ConfirmVehicleStateDialogFragment newFrag = ConfirmVehicleStateDialogFragment.newInstance(preOrderSumAssign, status);
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
