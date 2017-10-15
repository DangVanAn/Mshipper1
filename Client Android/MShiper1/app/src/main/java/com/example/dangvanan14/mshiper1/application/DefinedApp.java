package com.example.dangvanan14.mshiper1.application;

/**
 * Created by LAP10186-local on 8/24/2017.
 */

public class DefinedApp {
    //các key của SharedPreferences
    public static final String SharedPreferencesKey = "com.example.app";
    public static final String UserShaPreKey = "com.example.app.User";


//    public static final String URL_SOCKET_GPS = "https://servergpsmhiper.herokuapp.com";
    public static final String URL_SOCKET_GPS = "http://192.168.137.1:6969/";
    public static final String URL_SOCKET_CHAT = "http://192.168.137.1:6968/";

    public static final String URL_SERVER = "http://192.168.137.1:9999/";

    public enum API{
        MAIN, CHAT, GPS
    }
}
