package com.gifthub.sim;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.List;
import java.util.TimeZone;

import android.os.Build;
import android.Manifest;
import android.content.Intent;
import android.content.Context;
import android.content.pm.PackageManager;
import android.telephony.TelephonyManager;
import android.telephony.SubscriptionInfo;
import android.telephony.SubscriptionManager;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;

import javax.annotation.Nullable;

public class RNSimModule extends ReactContextBaseJavaModule {

  ReactApplicationContext reactContext;

  public RNSimModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "RNSimInfo";
  }

  @Override
  public @Nullable Map<String, Object> getConstants() {

    final Map<String, Object> constants = new HashMap<>();

    PackageManager packageManager = this.reactContext.getPackageManager();
    String packageName            = this.reactContext.getPackageName();

    TelephonyManager telManager = (TelephonyManager) this.reactContext.getSystemService(Context.TELEPHONY_SERVICE);

    int phoneCount = telManager.getPhoneCount();
    int activeSubscriptionInfoCount = 0;
    int activeSubscriptionInfoCountMax = 0;

    try {
      SubscriptionManager manager = (SubscriptionManager) this.reactContext.getSystemService(Context.TELEPHONY_SUBSCRIPTION_SERVICE);
      activeSubscriptionInfoCount = manager.getActiveSubscriptionInfoCount();
      activeSubscriptionInfoCountMax = manager.getActiveSubscriptionInfoCountMax();

      List<SubscriptionInfo> subscriptionInfos = manager.getActiveSubscriptionInfoList();

      int sub = 0;
      for (SubscriptionInfo subInfo : subscriptionInfos) {
        CharSequence carrierName = subInfo.getCarrierName();
        String countryIso        = subInfo.getCountryIso();
        int dataRoaming          = subInfo.getDataRoaming();  // 1 is enabled ; 0 is disabled
        CharSequence displayName = subInfo.getDisplayName();
        String iccId             = subInfo.getIccId();
        int mcc                  = subInfo.getMcc();
        int mnc                  = subInfo.getMnc();
        String number            = subInfo.getNumber();
        int simSlotIndex         = subInfo.getSimSlotIndex();
        int subscriptionId       = subInfo.getSubscriptionId();
        boolean networkRoaming   = telManager.isNetworkRoaming();
        String deviceId          = telManager.getDeviceId(simSlotIndex);

        constants.put("carrierName" + sub, carrierName.toString());
        constants.put("displayName" + sub, displayName.toString());
        constants.put("countryCode" + sub, countryIso);
        constants.put("mcc" + sub, mcc);
        constants.put("mnc" + sub, mnc);
        constants.put("isNetworkRoaming" + sub, networkRoaming);
        constants.put("isDataRoaming"    + sub, (dataRoaming == 1));
        constants.put("simSlotIndex"     + sub, simSlotIndex);
        constants.put("phoneNumber"      + sub, number);
        constants.put("deviceId"         + sub, deviceId);
        constants.put("simSerialNumber"  + sub, iccId);
        constants.put("subscriptionId"   + sub, subscriptionId);
        constants.put("getLine1Number"   + sub, telManager.getLine1Number());
        constants.put("dataActivity"   + sub, telManager.getDataActivity());
        constants.put("getDataState"   + sub, telManager.getDataState());
        constants.put("getNetworkCountryIso"   + sub, telManager.getNetworkCountryIso());
        constants.put("getNetworkOperator"   + sub, telManager.getNetworkOperator());
        constants.put("getNetworkOperatorName"   + sub, telManager.getNetworkOperatorName());
        constants.put("getDataState"   + sub, telManager.getDataState());
        constants.put("getDataState"   + sub, telManager.getDataState());
        constants.put("getDataState"   + sub, telManager.getDataState());
        sub++;
      }
    } catch (Exception e) {
      e.printStackTrace();
    }

    return constants;
  }
}