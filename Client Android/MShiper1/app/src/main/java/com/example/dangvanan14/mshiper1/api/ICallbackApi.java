package com.example.dangvanan14.mshiper1.api;


import android.app.Activity;
import android.support.v4.app.Fragment;

import org.slf4j.Logger;

public interface ICallbackApi<E> {
    void onResponse(Fragment fragment, E body, Logger LOG);
    void onResponse(Activity activity, E body, Logger LOG);
    void onResponse(E body, Logger log);
    void onFailure(Fragment fragment, Throwable t, Logger LOG);
    void onFailure(Activity activity, Throwable t, Logger LOG);
    void onFailure(Throwable t, Logger LOG);
}
