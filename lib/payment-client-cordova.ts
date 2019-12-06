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
import { PaymentClient, Payment, PaymentResponse, ResponseQuery, FlowEvent, Device, PaymentSettings, Request, Response } from 'appflow-payment-initiation-api';

declare var cordova: Cordova;

export function cordovaExec<T>(action: string, args?: any[]): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        cordova.exec((response) => {
            resolve(response);
        }, (e) => {
            reject(`${e}`);
        }, 'AppFlowPlugin', action, args);
    })
}

export function cordovaExecCallback<T>(action: string, callback: (data: string) => void, args?: any[]) {
    cordova.exec(callback, (e) => {
        console.log(`Failed to setup callback action ${e}`);
    }, 'AppFlowPlugin', action, args);
}

export class PaymentClientCordova implements PaymentClient {

    private static paymentResponseSubject = new Subject<PaymentResponse>();
    private static responseSubject = new Subject<Response>();
    private static eventsSubject = new Subject<FlowEvent>();

    private paymentSettings: ReplaySubject<PaymentSettings> = new ReplaySubject(1);

    constructor() {
        PaymentClientCordova.eventsSubject.pipe(
            finalize(() => {
                cordovaExec<string>('clearEventsCallback').then(() => {
                    console.log("Events callback cleared");
                });
            }), 
            share()
        );

        // setup the response callbacks
        cordovaExecCallback<string>('setPaymentResponseCallback', this.onPaymentResponse);
        cordovaExecCallback<string>('setResponseCallback', this.onResponse);
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
        cordovaExec<string>('getPaymentSettings').then((json) => {
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
        return cordovaExec<void>('initiateRequest', [request.toJson()]);
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
        return cordovaExec('initiatePayment', [payment.toJson()]);
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
        console.log("queryPaymentResponses - Not implemented yet!");
        return NEVER;
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
        console.log("queryResponses - Not implemented yet!");
        return NEVER;
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
        cordovaExecCallback('setSystemEventsCallback', this.onFlowEvent, [{keepCallback: true}]);
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
}