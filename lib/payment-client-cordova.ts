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
import { Observable, NEVER, Subject, ReplaySubject } from 'rxjs';
import { finalize, share } from 'rxjs/operators';
import { PaymentClient, Payment, PaymentResponse, ResponseQuery, FlowEvent, Device, PaymentSettings, Request, Response, AppMessage, AppMessageTypes, ResponseMechanisms, InternalData,AdditionalData } from 'appflow-payment-initiation-api';

declare var cordova: Cordova;

abstract class ResponseHandler<T> {
    protected responseSubject = new ReplaySubject<T>();

    public abstract handler(json: string): void;

    public onResponse(json: string) {
        if(json === "") {
            this.responseSubject.complete();
        } else {
            this.handler(json);
        }
    }

    public observe(): Observable<T> {
        return this.responseSubject.asObservable();
    }
}

class PaymentResponseHandler extends ResponseHandler<PaymentResponse> {
    public handler(json: string): void {
        var paymentResponse = PaymentResponse.fromJson(json);
        this.responseSubject.next(paymentResponse);
    }
}

class GenericResponseHandler extends ResponseHandler<Response> {
    public handler(json: string): void {
        var response = Response.fromJson(json);
        this.responseSubject.next(response);
    }
}

export class PaymentClientCordova implements PaymentClient {

    private static paymentResponseSubject = new Subject<PaymentResponse>();
    private static responseSubject = new Subject<Response>();
    private static eventsSubject = new Subject<FlowEvent>();

    private static responseQuerySubject: Subject<Response>;

    private paymentSettings: ReplaySubject<PaymentSettings> = new ReplaySubject(1);

    private websock: WebSocket;

    constructor() {

        this.websock = new WebSocket("ws://192.168.178.37:9876");

        PaymentClientCordova.eventsSubject.pipe(
            finalize(() => {
                this.cordovaExec<string>('clearEventsCallback').then(() => {
                    console.log("Events callback cleared");
                });
            }), 
            share()
        );

        // setup the response callbacks
        this.cordovaExecCallback<string>('setPaymentResponseCallback', this.onPaymentResponse);
        this.cordovaExecCallback<string>('setResponseCallback', this.onResponse);
    }

    /**
     * Retrieve a snapshot of the current payment settings.
     *
     * This includes system settings, flow configurations, information about flow services, etc.
     *
     * Subscribe to system events via {@link #subscribeToSystemEvents()} for updates when the state changes.
     *
     * @return Single emitting a {@link PaymentSettings} instance
     */
    public getPaymentSettings(): Observable<PaymentSettings> {
        this.cordovaExec<string>('getPaymentSettings').then((json) => {
            var ps = PaymentSettings.fromJson(json);
            this.paymentSettings.next(ps);
        }).catch((e) => {
            this.paymentSettings.error(e);
        });

        return this.paymentSettings.asObservable();
    }

    /**
     * Initiate processing of the provided {@link Request}.
     *
     * Due to the nature of Android component lifecycles, AppFlow can not guarantee that your activity/service is still alive when a flow is complete,
     * meaning it may not be able to receive the response via this rx chain. To ensure that your application receives a response in a reliable way,
     * your application must instead implement a {@link BaseResponseListenerService}.
     *
     * This method returns a {@link Completable} that will complete successfully if the request is accepted, or send an error if the request is invalid.
     *
     * If your request is rejected or an error occurs during the flow, a {@link FlowException} will be delivered to the `onError` handler. This
     * {@link FlowException} contains an error code that can be mapped to one of the constants in {@link ErrorConstants} and an error message
     * that further describes the problem. These values are not intended to be presented directly to the merchant.
     *
     * @param request The request
     * @return Completable that represents the acceptance of the request
     */
    public initiateRequest(request: Request): Promise<void> {
        return this.cordovaExec<void>('initiateRequest', [request.toJson()]);
    }

    /**
     * Initiate payment processing based on the provided {@link Payment}.
     *
     * Due to the nature of Android component lifecycles, AppFlow can not guarantee that your activity/service is still alive when a flow is complete,
     * meaning it may not be able to receive the response via this rx chain. To ensure that your application receives a response in a reliable way,
     * your application must instead implement a {@link BasePaymentResponseListenerService}.
     *
     * This method returns a {@link Completable} that will complete successfully if the request is accepted, or send an error if the request is invalid.
     *
     * If your request is rejected or an error occurs during the flow, a {@link FlowException} will be delivered to the `onError` handler. This
     * {@link FlowException} contains an error code that can be mapped to one of the constants in {@link ErrorConstants} and an error message
     * that further describes the problem. These values are not intended to be presented directly to the merchant.
     *
     * @param payment The payment to process
     * @return Completable that represents the acceptance of the request
     */
    public initiatePayment(payment: Payment): Promise<void> {
        console.log("initiatePayment");
        return this.cordovaExec('initiatePayment', [payment.toJson()]);
    }

    /**
     * Returns a stream of completed PaymentResponses for the given parameters.
     *
     * This query will <strong>only</strong> return {@link PaymentResponse} objects that were generated in response to requests by your application (package name)
     *
     * Responses will <strong>only</strong> be returned for completed flows. Responses for incomplete or in-progress flows will not be returned by this method
     *
     * @param responseQuery An object representing some parameters to limit the query by
     * @return An Observable stream of payment responses
     */
    public queryPaymentResponses(responseQuery: ResponseQuery):  Observable<PaymentResponse> {
        console.log("queryPaymentResponses");        
        var handler = new PaymentResponseHandler();
        this.cordovaExecHandler('queryPaymentResponses', handler, [responseQuery.toJson(), {keepCallback: true}]);
        return handler.observe();
    }

    /**
     * Returns a stream of completed Responses for the given parameters
     *
     * This query will <strong>only</strong> return {@link Response} objects that were generated in response to requests by your application (package name)
     *
     * Responses will <strong>only</strong> be returned for completed flows. Responses for incomplete or in-progress flows will not be returned by this method
     *
     * @param responseQuery An object representing some parameters to limit the query by
     * @return An Observable stream of responses
     */
    public queryResponses(responseQuery: ResponseQuery): Observable<Response> {
        console.log("queryResponses");
        var handler = new GenericResponseHandler();
        this.cordovaExecHandler('queryResponses', handler, [responseQuery.toJson(), {keepCallback: true}]);
        return handler.observe();
    }

    /**
     * Query for devices connected to the processing service, if multi-device is enabled.
     *
     * It is up to the flow processing service configuration if multi-device is enabled or not. See {@link PaymentSettings} for more details.
     *
     * Returns a single that emits a list of currently connected devices.
     *
     * This should be queried each time a selection is required to ensure an up-to-date list.
     *
     * You can subscribe to {@link #subscribeToSystemEvents()} for updates on changes to the available devices.
     *
     * @return Single emitting a list of {@link Device} objects containing basic device info
     */
    public getDevices(): Observable<Array<Device>> {
        console.log("getDevices - Not implemented yet!");
        return NEVER;
    }

    /**
     * Subscribe to general system events.
     *
     * Examples are when there are changed to devices, applications or system settings.
     *
     * @return A stream that will emit {@link FlowEvent} items
     */
    public subscribeToSystemEvents(): Observable<FlowEvent> {
        this.cordovaExecCallback('setSystemEventsCallback', this.onFlowEvent, [{keepCallback: true}]);
        return PaymentClientCordova.eventsSubject.asObservable();
    }

    private onFlowEvent(data: string) {
        var event = FlowEvent.fromJson(data);
        PaymentClientCordova.eventsSubject.next(event);
    }

    private onPaymentResponse(json: string) {
        console.log("Got payment response in callback");
        var paymentResponse = PaymentResponse.fromJson(json);
        PaymentClientCordova.paymentResponseSubject.next(paymentResponse);
    }

    private onResponse(json: string) {
        console.log("Got response in callback");
        var response = Response.fromJson(json);
        PaymentClientCordova.responseSubject.next(response);
    }

    public subscribeToPaymentResponses(): Observable<PaymentResponse> {
        return PaymentClientCordova.paymentResponseSubject.asObservable();
    }

    public subscribeToResponses(): Observable<Response> {
        return PaymentClientCordova.responseSubject.asObservable();
    }

    public cordovaExec<T>(action: string, args?: any[]): Promise<T> {

        if(args && args.length > 0) {
            return new Promise<T>((resolve, reject) => {                        
                console.log("Sending message over websocket");
                
                var appMessage = this.createAppMessageForPayment(Payment.fromJson(args[0]), ResponseMechanisms.MESSENGER_CONNECTION);
                this.websock.send(appMessage.toJson());
                this.websock.onmessage = function(event) {
                    console.log("Got reply");
                    console.log(event.data);
                    var response = Response.fromJson(event.data);
                    var paymentResponse = response.responseData.getValue("payment", PaymentResponse);
                    PaymentClientCordova.paymentResponseSubject.next(paymentResponse);
                    resolve(event.data);
                }
                this.websock.onerror = function(err) {
                    reject(err);
                }
            });
        } else {
            return new Promise<T>((resolve, reject) => { 
                cordova.exec((response) => { 
                    resolve(response); 
                }, (e) => { 
                    reject(`${e}`); 
                }, 'AppFlowPlugin', action, args); 
            }) 
        }

    }
    
    protected createAppMessageForPayment(payment: Payment, responseMechanism: string): AppMessage {
        var paymentData = new AdditionalData();
        paymentData.addData(AppMessageTypes.PAYMENT_MESSAGE, payment);
        var request = Request.from(payment.flowType, paymentData);
        request.deviceId = payment.deviceId;
        var appMessage = AppMessage.from(AppMessageTypes.PAYMENT_MESSAGE, request.toJson(), this.getInternalData(), responseMechanism);
        return appMessage;
    }

    private getInternalData(): InternalData {
        var internalData = new InternalData();
        internalData.senderApiVersion = "2.1.2"; //FIXME
        internalData.senderPackageName = "com.aevi.sdk.demo.webapp"; //FIXME
        return internalData;
    }

    public cordovaExecCallback<T>(action: string, callback: (data: string) => void, args?: any[]) {
        cordova.exec(callback, (e) => {
            console.log(`Failed to setup callback action ${e}`);
        }, 'AppFlowPlugin', action, args);
    }

    public cordovaExecHandler<T>(action: string, handler: ResponseHandler<T>, args?: any[]) {
        cordova.exec((response) => {
            handler.onResponse(response);
        }, (e) => {
            console.log(`Failed to setup callback action ${e}`);
        }, 'AppFlowPlugin', action, args);
    }
    
}