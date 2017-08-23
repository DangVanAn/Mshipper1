package com.example.dangvanan14.mshiper1;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.activity.MainActivity;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

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
            Intent i = new Intent(this, MainActivity.class);
            startActivity(i);

//            AlertDialog alertDialog = new AlertDialog.Builder(Activity_login.this).create();
//            alertDialog.setTitle("Quên mật khẩu");
//            alertDialog.setMessage("Vui lòng liên hệ 1900 9191");
//            alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "OK",
//                    new DialogInterface.OnClickListener() {
//                        public void onClick(DialogInterface dialog, int which) {
//                            dialog.dismiss();
//                        }
//                    });
//            alertDialog.show();
        }
    }
}
