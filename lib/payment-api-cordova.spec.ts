import { Observable } from 'rxjs';

import { PaymentApiCordova } from "./payment-api-cordova";
import { CordovaMock } from "./__mocks__/cordova-mock";

window.cordova = new CordovaMock("hello.test.api", true, "hello.processing.ver");

function verfiyObservableValues<T>(observable: Observable<T>, vals: T[], done: jest.DoneCallback) {
    var indx = 0;
    observable.subscribe({
        next: value => {
            expect(value).toBe(vals[indx++]);
            if (indx == vals.length) {
                done();
            }
        }
    });
}

describe('PaymentApiCordova', () => {
    it('should create an instance', () => {
      expect(PaymentApiCordova.getInstance()).toBeTruthy();
    });

    it('should return a version number', done => {
        var version = PaymentApiCordova.getInstance().getApiVersion();
        let vals = ["Unknown", "hello.test.api"];
        verfiyObservableValues(version, vals, done);
    });

    it('should return installed correctly', done => {
        var installed = PaymentApiCordova.getInstance().isProcessingServiceInstalled();
        let vals = [false, true];
        verfiyObservableValues(installed, vals, done);
    });

    it('should return processing service version number', done => {
        var version = PaymentApiCordova.getInstance().getProcessingServiceVersion();
        let vals = ["Unknown", "hello.processing.ver"];
        verfiyObservableValues(version, vals, done);
    });
});