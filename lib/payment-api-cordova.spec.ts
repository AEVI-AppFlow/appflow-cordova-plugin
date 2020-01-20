import { Observable } from 'rxjs';

import { PaymentApiCordova } from "./payment-api-cordova";
import { CordovaMock } from "./__mocks__/cordova-mock";

window.cordova = new CordovaMock("hello.test.api", true, "hello.processing.ver");

function verfiyPromiseValue<T>(observable: Promise<T>, expected: T, done: jest.DoneCallback) {
    var indx = 0;
    observable.then(value => {
        expect(value).toBe(expected);
        done();
    });
}

describe('PaymentApiCordova', () => {
    it('should create an instance', () => {
      expect(PaymentApiCordova.getInstance()).toBeTruthy();
    });

    it('should return a version number', done => {
        var version = PaymentApiCordova.getInstance().getApiVersion();
        let vals = "hello.test.api";
        verfiyPromiseValue(version, vals, done);
    });

    it('should return installed correctly', done => {
        var installed = PaymentApiCordova.getInstance().isProcessingServiceInstalled();
        let vals = true;
        verfiyPromiseValue(installed, vals, done);
    });

    it('should return processing service version number', done => {
        var version = PaymentApiCordova.getInstance().getProcessingServiceVersion();
        let vals = "hello.processing.ver";
        verfiyPromiseValue(version, vals, done);
    });
});