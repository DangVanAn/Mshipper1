package com.example.dangvanan14.mshiper1.activity;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;

import com.example.dangvanan14.mshiper1.dialog.ProgressDialogFragment;

/**
 * Created by Sherman on 3/6/2017.
 */

public class BaseActivity extends AppCompatActivity {
    protected static final String TAG_PROGRESS_DIALOG = "progressDialog";

    public void showProgressDialog() {
        FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
        Fragment prevFrag = getSupportFragmentManager().findFragmentByTag(TAG_PROGRESS_DIALOG);
        if (prevFrag == null) {
            ProgressDialogFragment newFrag = ProgressDialogFragment.newInstance();
            ft.add(newFrag, TAG_PROGRESS_DIALOG);
        } else {
            ft.remove(prevFrag);
        }
        ft.commitAllowingStateLoss();
    }

    public void dismissProgressDialog() {
        FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
        Fragment prevFrag = getSupportFragmentManager().findFragmentByTag(TAG_PROGRESS_DIALOG);
        if (prevFrag != null) {
            ft.remove(prevFrag);
        }
        ft.commitAllowingStateLoss();
    }
}
