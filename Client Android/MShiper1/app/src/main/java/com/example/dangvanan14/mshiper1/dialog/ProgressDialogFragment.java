package com.example.dangvanan14.mshiper1.dialog;

import android.app.Dialog;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatDialogFragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;

import com.example.dangvanan14.mshiper1.R;

/**
 * Created by Sherman on 2/23/2017.
 */

public class ProgressDialogFragment extends AppCompatDialogFragment {

    public static ProgressDialogFragment newInstance() {
        ProgressDialogFragment dialogFragment = new ProgressDialogFragment();
        dialogFragment.setCancelable(false);
        return dialogFragment;
    }

    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        Dialog dialog = super.onCreateDialog(savedInstanceState);
        dialog.getWindow().requestFeature(Window.FEATURE_NO_TITLE);
        dialog.getWindow().setBackgroundDrawableResource(android.R.color.transparent);
        return dialog;
    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.dialog_progress, container,false);
    }
}
