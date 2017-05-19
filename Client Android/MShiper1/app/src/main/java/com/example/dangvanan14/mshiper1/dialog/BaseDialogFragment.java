package com.example.dangvanan14.mshiper1.dialog;

import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;
import android.support.v7.app.AppCompatDialogFragment;


public class BaseDialogFragment extends AppCompatDialogFragment {
    private static final String TAG_PROGRESS_DIALOG = "progressDialog" ;

    public void showProgressDialog() {
        FragmentTransaction ft = getFragmentManager().beginTransaction();
        Fragment prevFrag = getFragmentManager().findFragmentByTag(TAG_PROGRESS_DIALOG);
        if (prevFrag == null) {
            ProgressDialogFragment newFrag = ProgressDialogFragment.newInstance();
            ft.add(newFrag, TAG_PROGRESS_DIALOG);
        } else {
            ft.remove(prevFrag);
        }
        ft.commitAllowingStateLoss();
    }

    public void dismissProgressDialog() {
        FragmentTransaction ft = getFragmentManager().beginTransaction();
        Fragment prevFrag = getFragmentManager().findFragmentByTag(TAG_PROGRESS_DIALOG);
        if (prevFrag != null) {
            ft.remove(prevFrag);
        }
        ft.commitAllowingStateLoss();
    }
}
