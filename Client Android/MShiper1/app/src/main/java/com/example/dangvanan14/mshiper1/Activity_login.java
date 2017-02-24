package com.example.dangvanan14.mshiper1;

import android.content.DialogInterface;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

/**
 * Created by dangvanan14 on 2/16/2017.
 */

public class Activity_login extends AppCompatActivity {

    @BindView(R.id.tv_username)
    EditText tv_usernamee;

    @BindView(R.id.tv_password)
    EditText tv_passwordd;

    @BindView(R.id.btn_signin)
    Button btn_signinn;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        ButterKnife.bind(this);
    }

    @OnClick(R.id.btn_signin)
    public void submit() {

        if (tv_usernamee.getText().toString().equals("aaa") && tv_passwordd.getText().toString().equals("bbb")) {
            Toast.makeText(Activity_login.this,
                    "Xin chào mừng đến Mshipper", Toast.LENGTH_SHORT).show();
        }
    }

    @OnClick(R.id.txtforgotpassword)
    public void submit1() {

        AlertDialog alertDialog = new AlertDialog.Builder(Activity_login.this).create();
        alertDialog.setTitle("Quên mật khẩu");
        alertDialog.setMessage("Vui lòng liên hệ 1900 9191");
        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "OK",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                });
        alertDialog.show();
    }
}
