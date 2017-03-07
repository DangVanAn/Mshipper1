package com.example.dangvanan14.mshiper1.fragment;


import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentTransaction;

import com.example.dangvanan14.mshiper1.dialog.ProgressDialogFragment;

/**
 * Created by Sherman on 2/23/2017.
 */

public class BaseFragment extends Fragment {
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

//    public HttpLoggingInterceptor newDefaultLogging() {
//        HttpLoggingInterceptor logging = new HttpLoggingInterceptor();
//        if (App.isInDebugMode()) {
//            logging.setLevel(HttpLoggingInterceptor.Level.BODY);
//        } else {
//            logging.setLevel(HttpLoggingInterceptor.Level.BASIC);
//        }
//        return logging;
//    }
}
