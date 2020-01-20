var paymentSettings = require('../../src/browser/payment-settings');
var paymentResponse = require('../../src/browser/payment-response');
var response = require('../../src/browser/reversal-response');

import { FlowEvent, ErrorConstants, FlowException } from 'appflow-payment-initiation-api';

export class CordovaMock implements Cordova {
    
    version: string;
    plugins: CordovaPlugins;
    platformId: string;

    paymentResponseCallback: (data: any) => void;
    paymentResponseCallbackError: (err: any) => void;
    responseCallback: (data: any) => void;
    responseCallbackError: (err: any) => void;
    eventsCallback: (data: any) => void;

    paymentSettingsError = false;
    paymentInitiateError = false;
    requestInitiateError = false;

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
                success("Bleep");
                if(this.paymentResponseCallback) {
                    if(this.paymentInitiateError) {
                        var fe = FlowException.from(ErrorConstants.INVALID_REQUEST, "Its all gone wrong Gromit!");
                        this.paymentResponseCallbackError(fe.toJson());
                    } else {
                        let paymentResp = JSON.stringify(paymentResponse);
                        this.paymentResponseCallback(paymentResp);
                    }
                    delete this.paymentResponseCallback;
                    delete this.paymentResponseCallbackError;
            }
                return;
            case "initiateRequest":
                success("Bleep");
                if(this.responseCallback) {
                    if(this.requestInitiateError) {
                        var fe = FlowException.from(ErrorConstants.INVALID_REQUEST, "I've got a bad feeling about this!");
                        this.responseCallbackError(fe.toJson());
                    } else {
                        let theResponse = JSON.stringify(response);
                        this.responseCallback(theResponse);
                    }
                    delete this.responseCallback;
                    delete this.responseCallbackError;
                }
                return;
            case "setPaymentResponseCallback":
                this.paymentResponseCallback = success;
                this.paymentResponseCallbackError = fail;
                return;
            case "setResponseCallback":
                this.responseCallback = success;
                this.responseCallbackError = fail;
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

    shouldErrorOnInitiatePayment(shouldError: boolean) {
        this.paymentInitiateError = shouldError;
    }

    shouldErrorOnInitiateRequest(shouldError: boolean) {
        this.requestInitiateError = shouldError;
    }

    shouldErrorOnGetPaymentSettings(shouldError: boolean) {
        this.paymentSettingsError = shouldError;
    }
}