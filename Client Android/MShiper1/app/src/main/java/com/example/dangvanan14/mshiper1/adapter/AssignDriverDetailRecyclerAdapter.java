package com.example.dangvanan14.mshiper1.adapter;

import android.os.Parcel;
import android.os.Parcelable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.model.PreOrderSum;
import com.example.dangvanan14.mshiper1.model.PreOrderSumAssign;
import com.thoughtbot.expandablerecyclerview.ExpandableRecyclerViewAdapter;
import com.thoughtbot.expandablerecyclerview.models.ExpandableGroup;
import com.thoughtbot.expandablerecyclerview.viewholders.ChildViewHolder;
import com.thoughtbot.expandablerecyclerview.viewholders.GroupViewHolder;

import java.util.List;

public class AssignDriverDetailRecyclerAdapter extends ExpandableRecyclerViewAdapter<AssignDriverDetailRecyclerAdapter.SectionViewHolder, AssignDriverDetailRecyclerAdapter.RowViewHolder> {
    private static final String TAG = "AssignDriverRecyclerAdapter";

    public AssignDriverDetailRecyclerAdapter(List<? extends ExpandableGroup> groups) {
        super(groups);
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
        holder.onBind(preOrderSumAssign);
    }

    @Override
    public void onBindGroupViewHolder(SectionViewHolder holder, int flatPosition,
                                      ExpandableGroup group) {
        holder.bind((Step) group);
    }

    static class SectionViewHolder extends GroupViewHolder {
        private TextView txtName;
        private ImageView imageConfirm;

        SectionViewHolder(View itemView) {
            super(itemView);
            txtName = (TextView) itemView.findViewById(R.id.name_step);
            imageConfirm = (ImageView) itemView.findViewById(R.id.image_confirm);
        }

        void bind(Step step) {
            txtName.setText(step.getTitle());
            if (step.isCheck) {
                imageConfirm.setImageResource(R.drawable.check_ok);
            } else {
                imageConfirm.setImageResource(0);
            }
        }
    }

    static class RowViewHolder extends ChildViewHolder {
        private TextView address_warehouse;
        private TextView address_delivery;
        private TextView type_product;
        private TextView ton;
        private TextView etd;
        private TextView eta;

        RowViewHolder(View itemView) {
            super(itemView);
            address_warehouse = (TextView) itemView.findViewById(R.id.address_warehouse);
            address_delivery = (TextView) itemView.findViewById(R.id.address_delivery);
            type_product = (TextView) itemView.findViewById(R.id.type_product);
            ton = (TextView) itemView.findViewById(R.id._ton);
            etd = (TextView) itemView.findViewById(R.id._etd);
            eta = (TextView) itemView.findViewById(R.id._eta);
        }

        void onBind(PreOrderSumAssign preOrderSumAssign) {
            List<PreOrderSum> preOrderSum = preOrderSumAssign.get_pre_order_sum();
            if (preOrderSum != null && preOrderSum.size() != 0) {
                address_warehouse.setText(preOrderSum.get(0).get_address_warehouse());
                address_delivery.setText(preOrderSum.get(0).get_address_delivery());
                type_product.setText(preOrderSum.get(0).get_type_product());
                ton.setText(String.valueOf(preOrderSum.get(0).get_ton()));
                etd.setText(preOrderSum.get(0).get_etd());
                eta.setText(preOrderSum.get(0).get_eta());
            }
        }
    }

    public static class Step extends ExpandableGroup<PreOrderSumAssign> {
        boolean isCheck = false;

        public Step(String title, boolean isCheck, List<PreOrderSumAssign> items) {
            super(title, items);
            this.isCheck = isCheck;
        }
    }
}
