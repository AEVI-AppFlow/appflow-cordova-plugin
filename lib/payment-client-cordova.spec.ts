import { Observable } from 'rxjs';

import { PaymentClientCordova } from "./payment-client-cordova";
import { PaymentSettings, PaymentBuilder, Amounts, PaymentResponse, Request, Response, FlowEvent } from 'appflow-payment-initiation-api';

import { CordovaMock } from "./__mocks__/cordova-mock";
window.cordova = new CordovaMock("hello.test.api", true, "hello.processing.ver");

var paymentSettings = require('../src/browser/payment-settings'); // test/mock settings data
var paymentResponse = require('../src/browser/payment-response'); // test/mock response data
var response = require('../src/browser/reversal-response'); // test/mock response data

function verfiyObservableValues<T>(observable: Observable<T>, vals: T[], done: jest.DoneCallback) {
    var indx = 0;
    observable.subscribe({
        next: value => {
            expect(value).toStrictEqual(vals[indx++]);
            if (indx == vals.length) {
                done();
            }
        },
        error: error => {
            done.fail("Failed with error: " + error);
        }
    });
}

function verfiyObservableFails<T>(observable: Observable<T>, done: jest.DoneCallback) {
    observable.subscribe({
        next: value => {
            fail("We were expecting you to fai!");
        },
        error: error => {
            done();
        }
    });
}

describe('PaymentCLientCordova', () => {
    it('should create an instance', () => {
        expect(new PaymentClientCordova()).toBeTruthy();
    });

    it('should get payment settings', done => {
        var pcc = new PaymentClientCordova();

        verfiyObservableValues<PaymentSettings>(pcc.getPaymentSettings(), [PaymentSettings.fromJson(JSON.stringify(paymentSettings))], done);
    });

    it('should handle payment settings error', done => {
        var pcc = new PaymentClientCordova();
        (<CordovaMock>window.cordova).shouldErrorOnGetPaymentSettings(true);

        verfiyObservableFails<PaymentSettings>(pcc.getPaymentSettings(), done);
    });

    it('should initiate a payment request', done => {
        var pcc = new PaymentClientCordova();

        var payment = new PaymentBuilder()
                            .withPaymentFlow("sale")
                            .withAmounts(Amounts.from(1000, "GBP"))
                            .build();

        verfiyObservableValues(pcc.subscribeToPaymentResponses(), [PaymentResponse.fromJson(JSON.stringify(paymentResponse))], done);

        pcc.initiatePayment(payment).then(() => {
            // nothing
        }).catch((e) => {
            done("Failed to initiate payment: " + e);
        });
    });

    it('should handle payment initiation error', done => {
        var pcc = new PaymentClientCordova();
        (<CordovaMock>window.cordova).shouldErrorOnGetPaymentSettings(true);

        verfiyObservableFails<PaymentSettings>(pcc.getPaymentSettings(), done);
    });

    it('should initiate a request', done => {
        var pcc = new PaymentClientCordova();

        var request = Request.from("blahdeblah");
        verfiyObservableValues(pcc.subscribeToResponses(), [Response.fromJson(JSON.stringify(response))], done);

        pcc.initiateRequest(request).then(() => {
            // nothing
        }).catch((e) => {
            done("Failed to initiate request: " + e);
        });
    });

    it('should be able to subscribe to flow events', done => {
        var pcc = new PaymentClientCordova();
        var events = [
            FlowEvent.from("eventy", "trggoooorrr"),
            FlowEvent.from("eventywnety", "trggoooorrr"),
            FlowEvent.from("boom", "trggoooorrr"),
            FlowEvent.from("boop", "trggoooorrr"),
        ];

        verfiyObservableValues(pcc.subscribeToSystemEvents(), events, done);

        (<CordovaMock>window.cordova).fireFlowEvents(events);
    });

});