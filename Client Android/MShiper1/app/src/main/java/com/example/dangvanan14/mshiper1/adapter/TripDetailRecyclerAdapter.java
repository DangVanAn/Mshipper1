package com.example.dangvanan14.mshiper1.adapter;

import android.support.v4.app.Fragment;
import android.support.v4.content.ContextCompat;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.fragment.TripDetailStepFragment;
import com.example.dangvanan14.mshiper1.model.PreOrderSum;
import com.example.dangvanan14.mshiper1.model.PreOrderSumAssign;
import com.example.dangvanan14.mshiper1.model.Step;
import com.thoughtbot.expandablerecyclerview.ExpandableRecyclerViewAdapter;
import com.thoughtbot.expandablerecyclerview.models.ExpandableGroup;
import com.thoughtbot.expandablerecyclerview.viewholders.ChildViewHolder;
import com.thoughtbot.expandablerecyclerview.viewholders.GroupViewHolder;

import java.util.Date;
import java.util.List;

public class TripDetailRecyclerAdapter extends ExpandableRecyclerViewAdapter<TripDetailRecyclerAdapter.SectionViewHolder, TripDetailRecyclerAdapter.RowViewHolder> {
    private static final String TAG = "AssignDriverRA";
    private Fragment fragment;

    public TripDetailRecyclerAdapter(Fragment fragment, List<? extends ExpandableGroup> groups) {
        super(groups);
        this.fragment = fragment;
    }

    @Override
    public SectionViewHolder onCreateGroupViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_assign_driver_detail, parent, false);
        return new SectionViewHolder(view);
    }

    @Override
    public RowViewHolder onCreateChildViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_assign_driver_detail_row, parent, false);
        return new RowViewHolder(view);
    }

    @Override
    public void onBindChildViewHolder(RowViewHolder holder, int flatPosition, ExpandableGroup group,
                                      int childIndex) {
        final PreOrderSumAssign preOrderSumAssign = (PreOrderSumAssign) (group.getItems().get(childIndex));
        holder.onBind(preOrderSumAssign, fragment);
    }

    @Override
    public void onBindGroupViewHolder(SectionViewHolder holder, int flatPosition,
                                      ExpandableGroup group) {
        holder.bind((StepExpandableGroup) group, fragment);
    }

    static class SectionViewHolder extends GroupViewHolder {
        private TextView txtName;
        private ImageView imageConfirm;
        private View layout;

        SectionViewHolder(View itemView) {
            super(itemView);
            txtName = (TextView) itemView.findViewById(R.id.name_step);
            imageConfirm = (ImageView) itemView.findViewById(R.id.image_confirm);
            layout = itemView.findViewById(R.id.layout_assign_driver_detail);
        }

        void bind(StepExpandableGroup group, Fragment fg) {
            txtName.setText(group.step.get_name());
            boolean isConfirm = group.step.is_confirm();
            if (group.step.getElement().equals("_in_delivery_driver")) {
                isConfirm = group.getItems().get(0).get_time_done() != 0;
            }

            if (isConfirm) {
                imageConfirm.setImageResource(R.drawable.check_ok);
            } else {
                imageConfirm.setImageResource(0);
            }
            TripDetailStepFragment ac = (TripDetailStepFragment) fg;
            if (ac.selectedStep != null && group.step.get_id() == ac.selectedStep.get_id()) {
                layout.setBackgroundColor(ContextCompat.getColor(layout.getContext(), R.color.yellow));
            } else {
                layout.setBackgroundColor(ContextCompat.getColor(layout.getContext(), R.color.white));
            }
        }
    }

    static class RowViewHolder extends ChildViewHolder implements View.OnClickListener {
        private TextView address_warehouse;
        private TextView address_delivery;
        private TextView type_product;
        private TextView ton;
        private TextView etd;
        private TextView eta;
        private Button btnArrived;
        private Button btnComplete;
        private Button btnCancel;
        private PreOrderSumAssign preOrderSumAssign;
        private TripDetailStepFragment fragment;

        RowViewHolder(View itemView) {
            super(itemView);
            address_warehouse = (TextView) itemView.findViewById(R.id.address_warehouse);
            address_delivery = (TextView) itemView.findViewById(R.id.address_delivery);
            type_product = (TextView) itemView.findViewById(R.id.type_product);
            ton = (TextView) itemView.findViewById(R.id._ton);
            etd = (TextView) itemView.findViewById(R.id._etd);
            eta = (TextView) itemView.findViewById(R.id._eta);
            btnArrived = (Button) itemView.findViewById(R.id.btn_arrived);
            btnComplete = (Button) itemView.findViewById(R.id.btn_complete);
            btnCancel = (Button) itemView.findViewById(R.id.btn_cancel);

            btnComplete.setOnClickListener(this);
            btnArrived.setOnClickListener(this);
            btnCancel.setOnClickListener(this);
        }

        void onBind(PreOrderSumAssign preOrderSumAssign, Fragment fragment) {
            this.preOrderSumAssign = preOrderSumAssign;
            this.fragment = (TripDetailStepFragment) fragment;
            List<PreOrderSum> preOrderSum = preOrderSumAssign.get_pre_order_sum();
            if (preOrderSum != null && preOrderSum.size() != 0) {
                address_warehouse.setText(preOrderSum.get(0).get_address_warehouse());
                address_delivery.setText(preOrderSum.get(0).get_address_delivery());
                type_product.setText(preOrderSum.get(0).get_type_product());
                ton.setText(String.valueOf(preOrderSum.get(0).get_ton()));
                etd.setText(preOrderSum.get(0).get_etd());
                eta.setText(preOrderSum.get(0).get_eta());
                if (preOrderSumAssign.get_out_warehouse_driver() != 0) {
                    if (preOrderSumAssign.get_in_delivery_driver() == 0) {
                        btnArrived.setEnabled(true);
                        btnComplete.setEnabled(false);
                        btnCancel.setEnabled(true);
                    } else if (preOrderSumAssign.get_time_done() == 0) {
                        btnComplete.setEnabled(true);
                        btnArrived.setEnabled(false);
                        btnCancel.setEnabled(true);
                    } else {
                        btnComplete.setEnabled(false);
                        btnArrived.setEnabled(false);
                        btnCancel.setEnabled(false);
                    }
                }
            }
        }

        @Override
        public void onClick(View v) {
            try {
                if (preOrderSumAssign != null) {
                    long timeNow = (new Date()).getTime();
                    switch (v.getId()) {
                        case R.id.btn_arrived:
                            fragment.showProgressDialog();
                            fragment.postUpdateTimeStep(fragment.selectedStep.getIdAssign(), fragment.selectedStep.getElement(), (new Date()).getTime());
                            fragment.updateTimeTrip(fragment.selectedStep.getIdAssign(), fragment.selectedStep.getElement(), timeNow);
                            break;
                        case R.id.btn_cancel:
                            break;
                        case R.id.btn_complete:
                            fragment.showProgressDialog();
                            String element = "_time_done";
                            fragment.postUpdateTimeStep(fragment.selectedStep.getIdAssign(), element, timeNow);
                            fragment.updateTimeTrip(fragment.selectedStep.getIdAssign(), element, timeNow);

                            break;
                    }
                }
            } catch (Exception e) {
                e.printStackTrace();
                Log.d(TAG, "onClick: " + e.getMessage());
                Toast.makeText(fragment.getContext(), "Có lỗi xảy ra", Toast.LENGTH_SHORT).show();
            }
        }
    }

    public static class StepExpandableGroup extends ExpandableGroup<PreOrderSumAssign> {
        Step step;

        public Step getStep() {
            return step;
        }

        public void setStep(Step step) {
            this.step = step;
        }

        public StepExpandableGroup(Step step, List<PreOrderSumAssign> items) {
            super("", items);
            this.step = step;
        }
    }
}