package com.example.dangvanan14.mshiper1.fragment;

import android.hardware.Sensor;
import android.hardware.SensorManager;
import android.os.Bundle;
import android.support.v4.app.FragmentActivity;
import android.widget.TextView;

import com.example.dangvanan14.mshiper1.R;
import com.example.dangvanan14.mshiper1.customview.CirclePercentView;

/**
 * Created by dangvanan14 on 3/1/2017.
 */

public class FragmentChart extends FragmentActivity {

    private CirclePercentView mCirclePercentView;
    private TextView viewX;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.fragment_charts);
        mCirclePercentView = (CirclePercentView) findViewById(R.id.circleView);


        viewX = (TextView) findViewById(R.id.textViewX);

        mCirclePercentView.setPercent((int) 60);
    }
}
