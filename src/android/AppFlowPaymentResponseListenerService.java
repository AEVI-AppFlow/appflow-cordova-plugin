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

import android.content.Intent;
import android.util.Log;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.PluginResult;

import com.aevi.sdk.flow.cordova.AppFlowPlugin;
import com.aevi.sdk.flow.model.FlowException;
import com.aevi.sdk.pos.flow.model.PaymentResponse;
import com.aevi.sdk.pos.flow.service.BasePaymentResponseListenerService;

public class AppFlowPaymentResponseListenerService extends BasePaymentResponseListenerService {

    @Override
    protected void notifyResponse(PaymentResponse paymentResponse) {
        Log.d("AppFlowPaymentResponseListenerService", "Got response: " + paymentResponse.toJson());
        CallbackContext callback = AppFlowPlugin.getPaymentResponseCallback();
        if(callback != null) {
            PluginResult result = new PluginResult(PluginResult.Status.OK, paymentResponse.toJson());
            result.setKeepCallback(true);
            callback.sendPluginResult(result);
        }
    }

    @Override
    protected void notifyError(String errorCode, String errorMessage) {
        Log.d("AppFlowPaymentResponseListenerService", "Got response error: " + errorCode + " " + errorMessage);
        CallbackContext callback = AppFlowPlugin.getPaymentResponseCallback();
        if(callback != null) {
            FlowException fe = new FlowException(errorCode, errorMessage);
            PluginResult result = new PluginResult(PluginResult.Status.ERROR, fe.toJson());
            result.setKeepCallback(true);
            callback.sendPluginResult(result);
        }
    }
}
