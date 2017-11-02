package com.example.dangvanan14.mshiper1.adapter;

import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.activity.AssignDriverDetailActivity;
import com.example.dangvanan14.mshiper1.model.AssignDriver;

import java.util.List;

public class AssignDriverRecyclerAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {
    private static final String TAG = "AssignDriverRecyclerAdapter";
    private List<AssignDriver> assignDrivers;

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_assign_driver, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
        AssignDriver assignDriver = assignDrivers.get(position);
        ViewHolder view = (ViewHolder) holder;
        view.bind(assignDriver, position);
    }

    @Override
    public int getItemCount() {
        return assignDrivers.size();
    }


    public AssignDriverRecyclerAdapter(List<AssignDriver> assignDrivers) {
        this.assignDrivers = assignDrivers;
    }

    private class ViewHolder extends RecyclerView.ViewHolder {
        private TextView txtName;
        private TextView txtComplete;
        private TextView txtIsLeader;
        private View layout;


        ViewHolder(View itemView) {
            super(itemView);
            txtName = (TextView) itemView.findViewById(R.id.name_assign);
            txtComplete = (TextView) itemView.findViewById(R.id.percent_complete);
            txtIsLeader = (TextView) itemView.findViewById(R.id.is_leader);
            layout = itemView.findViewById(R.id.layout_assign);
        }

        void bind(AssignDriver assignDriver, int position) {
            txtName.setText("Assign " + position);
            txtComplete.setText(assignDriver.get_percent() != 100 ? String.valueOf(assignDriver.get_percent()) + "%" : "DONE");
            txtIsLeader.setText(assignDriver.is_lead_driver() ? "Chính" : "Phụ");
            layout.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Intent i = new Intent(v.getContext(), AssignDriverDetailActivity.class);
                    i.putExtra("assignDetail", assignDriver);
                    v.getContext().startActivity(i);
                }
            });
        }
    }
}
