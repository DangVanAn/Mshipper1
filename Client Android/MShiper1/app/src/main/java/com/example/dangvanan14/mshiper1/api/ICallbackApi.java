package com.example.dangvanan14.mshiper1.api;


import android.app.Activity;
import android.support.v4.app.Fragment;

import org.slf4j.Logger;

public abstract class ICallbackApi<E> {
    public void onResponse(Fragment fragment, E body, Logger LOG) {

    }

    public void onResponse(Activity activity, E body, Logger LOG) {

    }

    public void onResponse(E body, Logger log) {

    }

    public void onFailure(Fragment fragment, Throwable t, Logger LOG) {

    }

    public void onFailure(Activity activity, Throwable t, Logger LOG) {

    }

    public void onFailure(Throwable t, Logger LOG) {

    }
}
