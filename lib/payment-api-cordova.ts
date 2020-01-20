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
import { PaymentClientCordova } from './payment-client-cordova';

export class PaymentApiCordova implements PaymentApi {

    private static instance: PaymentApiCordova;

    private paymentClient = new PaymentClientCordova();

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
     * @return A Promise that will resolve to the current API version
     */
    public getApiVersion(): Promise<string> {
        return this.paymentClient.cordovaExec<string>('getApiVersion');
    }

    /**
     * Returns true if the processing service that handles API requests is installed.
     *
     * If not installed, none of the API calls will function.
     *
     * @return A Promise that will resolve to True if API processing service is installed, false otherwise
     */
    public isProcessingServiceInstalled(): Promise<boolean> {
        return this.paymentClient.cordovaExec<boolean>('isProcessingServiceInstalled');
    }

    /**
     * Get the processing service version installed on this device.
     *
     * @return A promise that will resolve to the processing service version (semver format)
     */
    public getProcessingServiceVersion(): Promise<string> {
        return this.paymentClient.cordovaExec<string>('getProcessingServiceVersion');
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