var paymentSettings = require('../../src/browser/payment-settings');
var paymentResponse = require('../../src/browser/payment-response');
var response = require('../../src/browser/reversal-response');

import { FlowEvent } from 'appflow-payment-initiation-api';

export class CordovaMock implements Cordova {
    
    version: string;
    plugins: CordovaPlugins;
    platformId: string;

    paymentResponseCallback: (data: any) => void;
    responseCallback: (data: any) => void;
    eventsCallback: (data: any) => void;

    paymentSettingsError = false;

    constructor(private apiVersion: string, private processingServiceInstalled: boolean, private processingServiceVersion: string) {

    }

    exec(success: (data: any) => void, fail: (err: any) => void, service: string, action: string, args?: any[] | undefined): void {
        expect(service).toBe("AppFlowPlugin");
        switch(action) {
            case "getApiVersion":
                success(this.apiVersion);
                return;
            case "isProcessingServiceInstalled":
                success(this.processingServiceInstalled);
                return;
            case "getProcessingServiceVersion":
                success(this.processingServiceVersion);
                return;
            case "getPaymentSettings":
                if(!this.paymentSettingsError) {
                    success(JSON.stringify(paymentSettings));
                } else {
                    fail("You failed");
                }
                return;
            case "initiatePayment":
                if(this.paymentResponseCallback) {
                    let paymentResp = JSON.stringify(paymentResponse);
                    this.paymentResponseCallback(paymentResp);
                    delete this.paymentResponseCallback;
                }
                success("Bleep");
                return;
            case "initiateRequest":
                if(this.responseCallback) {
                    let theResponse = JSON.stringify(response);
                    this.responseCallback(theResponse);
                    delete this.responseCallback;
                }
                success("Bleep");
                return;
            case "setPaymentResponseCallback":
                this.paymentResponseCallback = success;
                return;
            case "setResponseCallback":
                this.responseCallback = success;
                return;
            case "setSystemEventsCallback":
                this.eventsCallback = success;
                return;
            case "queryPaymentResponses":
                success(JSON.stringify(paymentResponse));
                success(JSON.stringify(paymentResponse));
                success(JSON.stringify(paymentResponse));
                success(JSON.stringify(paymentResponse));
                success(JSON.stringify(paymentResponse));
                success(JSON.stringify(paymentResponse));
                success(JSON.stringify(paymentResponse));
                success("");
                return;
            case "queryResponses":
                success(JSON.stringify(response));
                success(JSON.stringify(response));
                success(JSON.stringify(response));
                success(JSON.stringify(response));
                success(JSON.stringify(response));
                success(JSON.stringify(response));
                success(JSON.stringify(response));
                success("");
                return;
        }
        throw new Error("Method not implemented.");
    }

    define(moduleName: string, factory: (require: any, exports: any, module: any) => void): void {
        throw new Error("Method not implemented.");
    }

    require(moduleName: string) {
        throw new Error("Method not implemented.");
    }

    fireFlowEvents(flowEvents: FlowEvent[]) {
        if(this.eventsCallback != null) {
            for(let flowEvent of flowEvents) {
                this.eventsCallback(flowEvent.toJson());
            }
        }
    }

    shouldErrorOnGetPaymentSettings(shouldError: boolean) {
        this.paymentSettingsError = shouldError;
    }
}