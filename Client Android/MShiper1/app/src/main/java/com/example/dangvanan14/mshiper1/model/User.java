package com.example.dangvanan14.mshiper1.model;

import android.os.Parcel;
import android.os.Parcelable;

public class User implements Parcelable{
    private String _id;
    private String _identify_card;
    private String _name;
    private String _email;
    private String _hashed_password;
    private String _token;
    private String _assign_code;
    private String _pass_code;
    private String _date_of_birth;
    private String _address;
    private String _phone;
    private String _gender;
    private String _permission_id;
    private boolean _is_enabled ;
    private String _company ;
    private String _image ;
    private String _id_delivery_manager ;
    private String _name_delivery_manager ;
    private String _driverLicenseNumber ;
    private String _driverLicenseName ;
    private String _id_customer ;
    private String _id_delivery ;
    private String _deliveryAddress ;
    private String _latitude ;
    private String _longitude;
    private double _radius;
    private String _polygon;
    private String _device_token;// token để firebase biết thiết bị nào để gửi notify
    private String _password;

    public User(String _phone, String _device_token) {
        this._phone = _phone;
        this._device_token = _device_token;
    }

    public User() {
    }

    public User(String _phone) {
        this._phone = _phone;
    }

    public User(String _password, String _phone, String _device_token) {
        this._password = _password;
        this._phone = _phone;
        this._device_token = _device_token;
    }


    protected User(Parcel in) {
        _id = in.readString();
        _identify_card = in.readString();
        _name = in.readString();
        _email = in.readString();
        _hashed_password = in.readString();
        _token = in.readString();
        _assign_code = in.readString();
        _pass_code = in.readString();
        _date_of_birth = in.readString();
        _address = in.readString();
        _phone = in.readString();
        _gender = in.readString();
        _permission_id = in.readString();
        _is_enabled = in.readByte() != 0;
        _company = in.readString();
        _image = in.readString();
        _id_delivery_manager = in.readString();
        _name_delivery_manager = in.readString();
        _driverLicenseNumber = in.readString();
        _driverLicenseName = in.readString();
        _id_customer = in.readString();
        _id_delivery = in.readString();
        _deliveryAddress = in.readString();
        _latitude = in.readString();
        _longitude = in.readString();
        _radius = in.readDouble();
        _polygon = in.readString();
        _device_token = in.readString();
        _password = in.readString();
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(_id);
        dest.writeString(_identify_card);
        dest.writeString(_name);
        dest.writeString(_email);
        dest.writeString(_hashed_password);
        dest.writeString(_token);
        dest.writeString(_assign_code);
        dest.writeString(_pass_code);
        dest.writeString(_date_of_birth);
        dest.writeString(_address);
        dest.writeString(_phone);
        dest.writeString(_gender);
        dest.writeString(_permission_id);
        dest.writeByte((byte) (_is_enabled ? 1 : 0));
        dest.writeString(_company);
        dest.writeString(_image);
        dest.writeString(_id_delivery_manager);
        dest.writeString(_name_delivery_manager);
        dest.writeString(_driverLicenseNumber);
        dest.writeString(_driverLicenseName);
        dest.writeString(_id_customer);
        dest.writeString(_id_delivery);
        dest.writeString(_deliveryAddress);
        dest.writeString(_latitude);
        dest.writeString(_longitude);
        dest.writeDouble(_radius);
        dest.writeString(_polygon);
        dest.writeString(_device_token);
        dest.writeString(_password);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static final Creator<User> CREATOR = new Creator<User>() {
        @Override
        public User createFromParcel(Parcel in) {
            return new User(in);
        }

        @Override
        public User[] newArray(int size) {
            return new User[size];
        }
    };

    public User(String _id, String _identify_card, String _name, String _email, String _hashed_password, String _token, String _assign_code, String _pass_code, String _date_of_birth, String _address, String _phone, String _gender, String _permission_id, boolean _is_enabled, String _company, String _image, String _id_delivery_manager, String _name_delivery_manager, String _driverLicenseNumber, String _driverLicenseName, String _id_customer, String _id_delivery, String _deliveryAddress, String _latitude, String _longitude, double _radius, String _polygon, String _device_token, String _password) {
        this._id = _id;
        this._identify_card = _identify_card;
        this._name = _name;
        this._email = _email;
        this._hashed_password = _hashed_password;
        this._token = _token;
        this._assign_code = _assign_code;
        this._pass_code = _pass_code;
        this._date_of_birth = _date_of_birth;
        this._address = _address;
        this._phone = _phone;
        this._gender = _gender;
        this._permission_id = _permission_id;
        this._is_enabled = _is_enabled;
        this._company = _company;
        this._image = _image;
        this._id_delivery_manager = _id_delivery_manager;
        this._name_delivery_manager = _name_delivery_manager;
        this._driverLicenseNumber = _driverLicenseNumber;
        this._driverLicenseName = _driverLicenseName;
        this._id_customer = _id_customer;
        this._id_delivery = _id_delivery;
        this._deliveryAddress = _deliveryAddress;
        this._latitude = _latitude;
        this._longitude = _longitude;
        this._radius = _radius;
        this._polygon = _polygon;
        this._device_token = _device_token;
        this._password = _password;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String get_identify_card() {
        return _identify_card;
    }

    public void set_identify_card(String _identify_card) {
        this._identify_card = _identify_card;
    }

    public String get_name() {
        return _name;
    }

    public void set_name(String _name) {
        this._name = _name;
    }

    public String get_email() {
        return _email;
    }

    public void set_email(String _email) {
        this._email = _email;
    }

    public String get_hashed_password() {
        return _hashed_password;
    }

    public void set_hashed_password(String _hashed_password) {
        this._hashed_password = _hashed_password;
    }

    public String get_token() {
        return _token;
    }

    public void set_token(String _token) {
        this._token = _token;
    }

    public String get_assign_code() {
        return _assign_code;
    }

    public void set_assign_code(String _assign_code) {
        this._assign_code = _assign_code;
    }

    public String get_pass_code() {
        return _pass_code;
    }

    public void set_pass_code(String _pass_code) {
        this._pass_code = _pass_code;
    }

    public String get_date_of_birth() {
        return _date_of_birth;
    }

    public void set_date_of_birth(String _date_of_birth) {
        this._date_of_birth = _date_of_birth;
    }

    public String get_address() {
        return _address;
    }

    public void set_address(String _address) {
        this._address = _address;
    }

    public String get_phone() {
        return _phone;
    }

    public void set_phone(String _phone) {
        this._phone = _phone;
    }

    public String get_gender() {
        return _gender;
    }

    public void set_gender(String _gender) {
        this._gender = _gender;
    }

    public String get_permission_id() {
        return _permission_id;
    }

    public void set_permission_id(String _permission_id) {
        this._permission_id = _permission_id;
    }

    public boolean is_is_enabled() {
        return _is_enabled;
    }

    public void set_is_enabled(boolean _is_enabled) {
        this._is_enabled = _is_enabled;
    }

    public String get_company() {
        return _company;
    }

    public void set_company(String _company) {
        this._company = _company;
    }

    public String get_image() {
        return _image;
    }

    public void set_image(String _image) {
        this._image = _image;
    }

    public String get_id_delivery_manager() {
        return _id_delivery_manager;
    }

    public void set_id_delivery_manager(String _id_delivery_manager) {
        this._id_delivery_manager = _id_delivery_manager;
    }

    public String get_name_delivery_manager() {
        return _name_delivery_manager;
    }

    public void set_name_delivery_manager(String _name_delivery_manager) {
        this._name_delivery_manager = _name_delivery_manager;
    }

    public String get_driverLicenseNumber() {
        return _driverLicenseNumber;
    }

    public void set_driverLicenseNumber(String _driverLicenseNumber) {
        this._driverLicenseNumber = _driverLicenseNumber;
    }

    public String get_driverLicenseName() {
        return _driverLicenseName;
    }

    public void set_driverLicenseName(String _driverLicenseName) {
        this._driverLicenseName = _driverLicenseName;
    }

    public String get_id_customer() {
        return _id_customer;
    }

    public void set_id_customer(String _id_customer) {
        this._id_customer = _id_customer;
    }

    public String get_id_delivery() {
        return _id_delivery;
    }

    public void set_id_delivery(String _id_delivery) {
        this._id_delivery = _id_delivery;
    }

    public String get_deliveryAddress() {
        return _deliveryAddress;
    }

    public void set_deliveryAddress(String _deliveryAddress) {
        this._deliveryAddress = _deliveryAddress;
    }

    public String get_latitude() {
        return _latitude;
    }

    public void set_latitude(String _latitude) {
        this._latitude = _latitude;
    }

    public String get_longitude() {
        return _longitude;
    }

    public void set_longitude(String _longitude) {
        this._longitude = _longitude;
    }

    public double get_radius() {
        return _radius;
    }

    public void set_radius(double _radius) {
        this._radius = _radius;
    }

    public String get_polygon() {
        return _polygon;
    }

    public void set_polygon(String _polygon) {
        this._polygon = _polygon;
    }

    public String get_device_token() {
        return _device_token;
    }

    public void set_device_token(String _device_token) {
        this._device_token = _device_token;
    }

    public String get_password() {
        return _password;
    }

    public void set_password(String _password) {
        this._password = _password;
    }
}
