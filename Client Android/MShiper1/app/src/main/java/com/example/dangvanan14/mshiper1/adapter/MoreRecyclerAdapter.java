package com.example.dangvanan14.mshiper1.adapter;

import android.content.Intent;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.activity.TripActivity;
import com.example.dangvanan14.mshiper1.activity.ContactActivity;
import com.example.dangvanan14.mshiper1.model.More;

import java.util.List;

public class MoreRecyclerAdapter extends RecyclerView.Adapter<MoreRecyclerAdapter.ViewHolder> {
    private static final String TAG = "MoreRecyclerAdapter";
    private List<More> more;

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_more, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        More order = more.get(position);
        holder.bind(order);
    }

    @Override
    public int getItemCount() {
        return more.size();
    }


    public MoreRecyclerAdapter(List<More> more) {
        this.more = more;
    }

    static class ViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        private TextView txtName;
        private ImageView imageView;
        private View layout;
        private More more;

        ViewHolder(View itemView) {
            super(itemView);
            txtName = (TextView) itemView.findViewById(R.id.name_more);
            imageView = (ImageView) itemView.findViewById(R.id.ic_more);
            layout = itemView.findViewById(R.id.layout_more);
        }

        void bind(More more) {
            this.more = more;
            txtName.setText(more.get_name());
            layout.setOnClickListener(this);
//            imageView.setImageResource(more.ic);
        }

        @Override
        public void onClick(View v) {
            Intent i;
            switch (more.get_id()) {
                case 0:
                    Toast.makeText(v.getContext(), more.get_name(), Toast.LENGTH_SHORT).show();
                    break;
                case 1:
                    i = new Intent(v.getContext(), ContactActivity.class);
                    v.getContext().startActivity(i);
                    break;
                case 2:
                    i = new Intent(v.getContext(), TripActivity.class);
                    v.getContext().startActivity(i);
            }
        }
    }
}
