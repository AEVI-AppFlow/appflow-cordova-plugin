/*
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
package com.aevi.sdk.flow.cordova;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.util.Log;

import io.reactivex.disposables.Disposable;

import com.aevi.sdk.pos.flow.PaymentClient;
import com.aevi.sdk.pos.flow.PaymentApi;
import com.aevi.sdk.pos.flow.model.Payment;
import com.aevi.sdk.flow.model.Request;
import com.aevi.sdk.flow.model.ResponseQuery;

/**
 * This class echoes a string called from JavaScript.
 */
public class AppFlowPlugin extends CordovaPlugin {

    private static final String SET_PAYMENT_RESPONSE_CALLBACK = "setPaymentResponseCallback";
    private static final String SET_RESPONSE_CALLBACK = "setResponseCallback";
    private static final String SET_SYSTEM_EVENTS_CALLBACK = "setSystemEventsCallback";
    private static final String CLEAR_EVENTS_CALLBACK = "clearEventsCallback";

    private static final String GET_API_VERSION = "getApiVersion";
    private static final String IS_PROCESSING_INSTALLED = "isProcessingServiceInstalled";
    private static final String GET_PROCESSING_VERSION = "getProcessingServiceVersion";

    private static final String GET_PAYMENT_SETTINGS = "getPaymentSettings";

    private static final String INITIATE_PAYMENT = "initiatePayment";
    private static final String INITIATE_REQUEST = "initiateRequest";

    private static final String QUERY_PAYMENT_RESPONSES = "queryPaymentResponses";
    private static final String QUERY_RESPONSES = "queryResponses";

    private PaymentClient paymentClient;
    private Context context;

    private static CallbackContext paymentResponseCallback = null;    
    private static CallbackContext responseCallback = null;
    private static CallbackContext eventsCallback = null;

    private static CallbackContext queryPaymentCallback = null;
    private static CallbackContext queryResponseCallback = null;

    private Disposable eventsDispose;

    public static CallbackContext getPaymentResponseCallback() {
        return paymentResponseCallback;
    }

    public static CallbackContext getResponseCallback() {
        return responseCallback;
    }

    public static CallbackContext getEventsCallback() {
        return eventsCallback;
    }

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
        context = cordova.getContext();
        paymentClient = PaymentApi.getPaymentClient(context);

        eventsDispose = paymentClient.subscribeToSystemEvents()
            .subscribe(flowEvent -> {
                if(eventsCallback != null) {
                    PluginResult result = new PluginResult(PluginResult.Status.OK, flowEvent.toJson());
                    result.setKeepCallback(true);
                    eventsCallback.sendPluginResult(result);
                }
            }, throwable -> {
                Log.e(AppFlowPlugin.class.getSimpleName(), "Failed to subscribe", throwable);
                if(eventsCallback != null) {
                    eventsCallback.error("Failed to subscribe to events" + throwable.getMessage());
                }
            });
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        switch(action) {
            case GET_API_VERSION:
                getApiVersion(callbackContext);
                return true;
            case IS_PROCESSING_INSTALLED:
                isProcessingServiceInstalled(callbackContext);
                return true;
            case GET_PROCESSING_VERSION:
                getProcessingServiceVersion(callbackContext);
                return true;
            case GET_PAYMENT_SETTINGS:
                getPaymentSettings(callbackContext);
                return true;
            case INITIATE_PAYMENT:
                initiatePayment(args, callbackContext);
                return true;
            case INITIATE_REQUEST:
                initiateRequest(args, callbackContext);
                return true;
            case SET_PAYMENT_RESPONSE_CALLBACK:
                paymentResponseCallback = callbackContext;
                return true;
            case SET_RESPONSE_CALLBACK:
                responseCallback = callbackContext;
                return true;
            case SET_SYSTEM_EVENTS_CALLBACK:
                eventsCallback = callbackContext;
                return true;
            case QUERY_PAYMENT_RESPONSES:
                queryPaymentCallback = callbackContext;
                queryPayments(args);
                return true;
            case QUERY_RESPONSES:
                queryResponseCallback = callbackContext;
                queryResponses(args);
                return true;
            case CLEAR_EVENTS_CALLBACK:
                eventsCallback = null;
                if(eventsDispose != null) {
                    eventsDispose.dispose();
                }
                return true;

        }
        return false;
    }

    private void getPaymentSettings(CallbackContext callbackContext) {
        paymentClient.getPaymentSettings().subscribe((paymentSettings) -> {
            callbackContext.success(paymentSettings.toJson());
        }, throwable -> {
            callbackContext.error(throwable.getMessage());
        });
    }

    private void initiatePayment(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if(args.length() == 1) {
            String json = args.getString(0);
            Payment payment = Payment.fromJson(json);
            paymentClient.initiatePayment(payment).subscribe(() -> {
                callbackContext.success("Payment accepted");
            }, throwable -> {
                callbackContext.error(throwable.getMessage());
            });
        }
    }

    private void initiateRequest(JSONArray args, CallbackContext callbackContext) throws JSONException {
        if(args.length() == 1) {
            String json = args.getString(0);
            Request request = Request.fromJson(json);
            paymentClient.initiateRequest(request).subscribe(() -> {
                callbackContext.success("Request accepted");
            }, throwable -> {
                callbackContext.error(throwable.getMessage());
            });
        }
    }

    private void isProcessingServiceInstalled(CallbackContext callbackContext) {
        callbackContext.success(String.valueOf(PaymentApi.isProcessingServiceInstalled(context)));
    }

    private void getProcessingServiceVersion(CallbackContext callbackContext) {
        callbackContext.success(PaymentApi.getProcessingServiceVersion(context));
    }

    private void getApiVersion(CallbackContext callbackContext) {
        callbackContext.success(PaymentApi.getApiVersion());
    }

    private void queryPayments(JSONArray args) throws JSONException {
        if(args.length() >= 1) {
            String json = args.getString(0);
            ResponseQuery responseQuery = ResponseQuery.fromJson(json);
            paymentClient.queryPaymentResponses(responseQuery)
                            .doOnComplete(() -> { queryPaymentCallback.success(""); })
                            .subscribe(paymentResponse -> {
                                PluginResult result = new PluginResult(PluginResult.Status.OK, paymentResponse.toJson());
                                result.setKeepCallback(true);
                                queryPaymentCallback.sendPluginResult(result);
                            }, throwable -> {
                                queryPaymentCallback.error(throwable.getMessage());
                            });
        }
    }

    private void queryResponses(JSONArray args) throws JSONException {
        if(args.length() >= 1) {
            String json = args.getString(0);
            ResponseQuery responseQuery = ResponseQuery.fromJson(json);
            paymentClient.queryResponses(responseQuery)
                            .doOnComplete(() -> { queryResponseCallback.success(""); })
                            .subscribe(response -> {
                                PluginResult result = new PluginResult(PluginResult.Status.OK, response.toJson());
                                result.setKeepCallback(true);
                                queryResponseCallback.sendPluginResult(result);
                            }, throwable -> {
                                queryResponseCallback.error(throwable.getMessage());
                            });
        }
    }

}
