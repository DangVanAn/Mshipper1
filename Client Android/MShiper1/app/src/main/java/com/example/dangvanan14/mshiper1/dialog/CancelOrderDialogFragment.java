package com.example.dangvanan14.mshiper1.dialog;

import android.app.Dialog;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatDialogFragment;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.example.dangvanan14.mshiper1.R;

/**
 * Created by Sherman on 3/10/2017.
 */

public class CancelOrderDialogFragment extends AppCompatDialogFragment implements View.OnClickListener {
    public static CancelOrderDialogFragment newInstance() {
        CancelOrderDialogFragment dialogFragment = new CancelOrderDialogFragment();
        dialogFragment.setCancelable(false);
        return dialogFragment;
    }

    @NonNull
    @Override
    public Dialog onCreateDialog(Bundle savedInstanceState) {
        Dialog dialog = super.onCreateDialog(savedInstanceState);
        dialog.getWindow().requestFeature(Window.FEATURE_NO_TITLE);
        dialog.getWindow().setBackgroundDrawableResource(android.R.color.white);
        return dialog;
    }

    String arr[] = {
            "Hàng 1",
            "Hàng 2",
            "Hàng 3"};

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Nullable
    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View v = inflater.inflate(R.layout.dialog_cancel_order, container, false);

        Spinner spin = (Spinner) v.findViewById(R.id.spn_note);
        Button btnCancel = (Button) v.findViewById(R.id.btnCancel);
        Button btnSubmit = (Button) v.findViewById(R.id.btnCash);

        btnCancel.setOnClickListener(this);
        btnSubmit.setOnClickListener(this);

        EditText edtNote = (EditText) v.findViewById(R.id.edt_note);
        edtNote.requestFocus();


        InputMethodManager imm = (InputMethodManager) getActivity().getSystemService(Context.INPUT_METHOD_SERVICE);
        //show soft keyboard fragment
        imm.toggleSoftInput(InputMethodManager.SHOW_FORCED, InputMethodManager.HIDE_IMPLICIT_ONLY);
        imm.showSoftInput(edtNote, InputMethodManager.SHOW_IMPLICIT);

        ArrayAdapter<String> adapter = new ArrayAdapter<>(getContext(), android.R.layout.simple_spinner_item, arr);
        adapter.setDropDownViewResource(android.R.layout.simple_list_item_single_choice);
        spin.setAdapter(adapter);
        spin.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
            }
        });
        return v;
    }

    @Override
    public void onResume() {
        ViewGroup.LayoutParams params = getDialog().getWindow().getAttributes();
        params.width = WindowManager.LayoutParams.MATCH_PARENT;
        params.height = WindowManager.LayoutParams.WRAP_CONTENT;
        getDialog().getWindow().setAttributes((android.view.WindowManager.LayoutParams) params);

        getDialog().setOnKeyListener(new DialogInterface.OnKeyListener() {
            @Override
            public boolean onKey(android.content.DialogInterface dialog, int keyCode,
                                 android.view.KeyEvent event) {
                if ((keyCode == android.view.KeyEvent.KEYCODE_BACK)) {
                    if (event.getAction() != KeyEvent.ACTION_DOWN)
                        return true;
                    else {
                        dismiss();
                        return true;
                    }
                } else
                    return false;
            }
        });
        super.onResume();
    }

    @Override
    public void onClick(View v) {
        InputMethodManager imm = (InputMethodManager)getContext().getSystemService(Context.INPUT_METHOD_SERVICE);
        switch (v.getId()) {
            case R.id.btnCancel:
                imm.hideSoftInputFromWindow(v.getWindowToken(), 0);
                dismiss();
                break;
            case R.id.btnCash:
                Toast.makeText(getActivity(), "Submit thành công !!!", Toast.LENGTH_SHORT).show();
                imm.hideSoftInputFromWindow(v.getWindowToken(), 0);
                dismiss();
                break;
        }
    }

}
