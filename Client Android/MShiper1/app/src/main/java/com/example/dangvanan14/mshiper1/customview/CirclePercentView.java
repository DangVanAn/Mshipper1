package com.example.dangvanan14.mshiper1.customview;

import android.content.Context;
import android.content.res.TypedArray;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.RectF;
import android.util.AttributeSet;
import android.view.View;

import com.example.dangvanan14.mshiper1.R;


public class CirclePercentView extends View {

    private float mRadius;
    private float mStripeWidth;
    private int mHeight;
    private int mWidth;
    private int mCurPercent;
    private int mPercent;
    private float x;
    private float y;
    private int mEndAngle;
    private int mSmallColor;
    private int mBigColor;
    private float mCenterTextSize;

    private Paint bigCirclePaint;
    private Paint sectorPaint;
    private RectF rect;
    private Paint smallCirclePaint;
    private Paint textPaint;

    private Bitmap rada = BitmapFactory.decodeResource(getResources(), R.drawable.rada1);

    public CirclePercentView(Context context) {
        this(context, null);
    }

    public CirclePercentView(Context context, AttributeSet attrs) {
        this(context, attrs, 0);
    }

    public CirclePercentView(Context context, AttributeSet attrs, int defStyleAttr) {
        super(context, attrs, defStyleAttr);
        TypedArray a = context.obtainStyledAttributes(attrs, R.styleable.CirclePercentView, defStyleAttr, 0);
        mStripeWidth = a.getDimension(R.styleable.CirclePercentView_stripeWidth, PxUtils.dpToPx(30, context));
        mCurPercent = a.getInteger(R.styleable.CirclePercentView_percent, 0);
        mSmallColor = a.getColor(R.styleable.CirclePercentView_smallColor, 0xffafb4db);
        mBigColor = a.getColor(R.styleable.CirclePercentView_bigColor, 0xff6950a1);
        mCenterTextSize = a.getDimensionPixelSize(R.styleable.CirclePercentView_centerTextSize, PxUtils.spToPx(20, context));
        mRadius = a.getDimensionPixelSize(R.styleable.CirclePercentView_radius, PxUtils.dpToPx(100, context));

        Init();
    }

    public void Init() {
        bigCirclePaint = new Paint();
        bigCirclePaint.setAntiAlias(true);
        bigCirclePaint.setColor(mBigColor);

        sectorPaint = new Paint();
        sectorPaint.setColor(mSmallColor);
        sectorPaint.setAntiAlias(true);

        smallCirclePaint = new Paint();
        smallCirclePaint.setAntiAlias(true);
        smallCirclePaint.setColor(mBigColor);

        textPaint = new Paint();
        textPaint.setTextSize(mCenterTextSize);
        textPaint.setColor(Color.WHITE);

    }

    @Override
    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
        int widthMode = MeasureSpec.getMode(widthMeasureSpec);
        int heightMode = MeasureSpec.getMode(heightMeasureSpec);
        int widthSize = MeasureSpec.getSize(widthMeasureSpec);
        int heightSize = MeasureSpec.getSize(heightMeasureSpec);

        if (widthMode == MeasureSpec.EXACTLY && heightMode == MeasureSpec.EXACTLY) {
            mRadius = widthSize / 2;
            x = widthSize / 2;
            y = heightSize / 2;
            mWidth = widthSize;
            mHeight = heightSize;
        }

        if (widthMode == MeasureSpec.AT_MOST && heightMode == MeasureSpec.AT_MOST) {
            mWidth = (int) (mRadius * 2);
            mHeight = (int) (mRadius * 2);
            x = mRadius;
            y = mRadius;
        }

        setMeasuredDimension(mWidth, mHeight);
    }

    @Override
    protected void onDraw(Canvas canvas) {
        mEndAngle = (int) (mCurPercent * 3.6);
        //canvas.drawCircle(x, y, mRadius, bigCirclePaint);

        rect = new RectF(0, 0, mWidth, mHeight);
        canvas.drawArc(rect, 270, mEndAngle, true, sectorPaint);

        canvas.drawBitmap(rada, null, rect, null);
    }

    public void setPercent(int percent) {
        if (percent > 100) {
            throw new IllegalArgumentException("percent must less than 100!");
        }

        setCurPercent(percent);
    }

    private void setCurPercent(final int percent) {

        mPercent = percent;

        new Thread(new Runnable() {
            @Override
            public void run() {

                mCurPercent = percent;
                CirclePercentView.this.postInvalidate();
            }

        }).start();

    }
}
