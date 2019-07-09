package com.example.reactnativetoast;

import android.widget.Toast;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by GXZ on 16/7/10.
 */
public class ToastModule extends ReactContextBaseJavaModule {
    private static final String DURATION_SHORT_KEY = "SHORT";
    private static final String DURATION_LONG_KEY = "LONG";

    public ToastModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "ToastModule";//特别注意这里对应的NativeModules要调用的名字
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
        constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
        return constants;
    }

    @ReactMethod
    public void show(String message, int duration) {
        Toast.makeText(getReactApplicationContext(), message, duration).show();
    }

    @ReactMethod
    public void myCallBack(Callback callback){
        callback.invoke("ganxz",100);
    }

    @ReactMethod
    public void myCallBack2(ReadableMap vo, Callback callback){
        String str ="hello";

        Field[] field = vo.getClass().getDeclaredFields();        //获取实体类的所有属性，返回Field数组
        str += "length:"+field.length;
        for(int j=0 ; j<field.length ; j++){
            //遍历所有属性
            str += field[j].getName();    //获取属性的名字
        }

        callback.invoke(str);
    }

}
