package com.example.dangvanan14.mshiper1.tool;

import com.example.dangvanan14.mshiper1.activity.MainActivity;
import com.example.dangvanan14.mshiper1.activity.MainGuardActivity;
import com.example.dangvanan14.mshiper1.activity.MainWarehouseManagerActivity;
import com.example.dangvanan14.mshiper1.application.DefinedApp;

/**
 * Created by LAP10186-local on 11/11/2017.
 */

public class CheckTool {
    static public DefinedApp.ROLE checkRole(String permission) {
        switch (permission) {
            case "A003":
                return DefinedApp.ROLE.MANAGER_WAREHOUSE;
            case "A004":
                return DefinedApp.ROLE.GUARD;
            case "C002":
                return DefinedApp.ROLE.DRIVER;
            default:
                return DefinedApp.ROLE.NOTHING;
        }
    }

    static public Class<?> getActivityMainWith(String permission) {
        switch (checkRole(permission)) {
            case GUARD:
                return MainGuardActivity.class;
            case DRIVER:
                return MainActivity.class;
            case MANAGER_WAREHOUSE:
                return MainWarehouseManagerActivity.class;
            case NOTHING:
                return null;
            default:
                return null;
        }
    }
}
