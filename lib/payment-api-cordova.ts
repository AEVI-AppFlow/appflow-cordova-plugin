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
import { PaymentApi, PaymentClient } from 'appflow-payment-initiation-api';
import { cordovaExec, PaymentClientCordova } from './payment-client-cordova';
import { Observable, BehaviorSubject } from 'rxjs';

export class PaymentApiCordova implements PaymentApi {

    private static instance: PaymentApiCordova;

    private paymentClient = new PaymentClientCordova();
    private apiVersion: BehaviorSubject<string> = new BehaviorSubject("Unknown");
    private processingServiceInstalled: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private processingServiceVersion: BehaviorSubject<string> = new BehaviorSubject("Unknown");

    public static getInstance(): PaymentApi {
        if (!PaymentApiCordova.instance) {
            PaymentApiCordova.instance = new PaymentApiCordova();
        }

        return PaymentApiCordova.instance;
    }

    private constructor() { }

    /**
     * Get the API version.
     *
     * The API versioning follows semver rules with major.minor.patch versions.
     *
     * @return The API version
     */
    public getApiVersion(): Observable<string> {
        cordovaExec<string>('getApiVersion').then((version) => {
            this.apiVersion.next(version);
        }).catch((e) => {
            this.apiVersion.error(e);
        });

        return this.apiVersion.asObservable();
    }

    /**
     * Returns true if the processing service that handles API requests is installed.
     *
     * If not installed, none of the API calls will function.
     *
     * @return True if API processing service is installed, false otherwise
     */
    public isProcessingServiceInstalled(): Observable<boolean> {
        cordovaExec<boolean>('isProcessingServiceInstalled').then((installed) => {
            this.processingServiceInstalled.next(installed);
        }).catch((e) => {
            this.processingServiceInstalled.error(e);
        });

        return this.processingServiceInstalled.asObservable();
    }

    /**
     * Get the processing service version installed on this device.
     *
     * @return The processing service version (semver format)
     */
    public getProcessingServiceVersion(): Observable<string> {
        cordovaExec<string>('getProcessingServiceVersion').then((version) => {
            this.processingServiceVersion.next(version);
        }).catch((e) => {
            this.processingServiceVersion.error(e);
        });;

        return this.processingServiceVersion.asObservable();
    }

    /**
     * Get a new instance of a {@link PaymentClient} to initiate payments.
     *
     * @return An instance of {@link PaymentClient}
     */
    public getPaymentClient(): PaymentClient {
        return this.paymentClient;
    }


}