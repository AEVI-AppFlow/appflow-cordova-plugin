var paymentSettings = require('./payment-settings');
var paymentResponse = require('./payment-response');
var reversalResponse = require('./reversal-response');
var receiptResponse = require('./receipt-delivery-response');
var tokenisationResponse = require('./tokenisation-response');
var loyaltyResponse = require('./loyalty-response');
var basketUpdateResponse = require('./basket-status-response');

var responseCallback;
var paymentResponseCallback;
var eventsCallback;
var count = 0;

module.exports = {
    
    getApiVersion: function(success, error, opts) {
        success("javascript.mock.api");
    },
    isProcessingServiceInstalled: function(success, error, opts) {
        success("true");
    },
    getProcessingServiceVersion: function(success, error, opts) {
        success("javascript.mock.api");
    },
    setPaymentResponseCallback: function(success, error, opts) {
        console.log("joijofjofs");
        console.log(success);
        paymentResponseCallback = success;
    },
    setResponseCallback: function(success, error, opts) {
        responseCallback = success;
    },
    setSystemEventsCallback: function(success, error, opts) {
        eventsCallback = success;

        function sendEvents() {
            var msg = JSON.stringify({type: "flowStateChanged " + count, data: { data: { eventKeyFlowConfigsChanged: { type: "java.lang.Boolean", value: true }, eventKeySettingsChanged: { type: "java.lang.Boolean", value: true }} }, eventTrigger: 'configAppUpdate'});
            eventsCallback(msg, { keepCallback: true});
            count++;
            setTimeout(sendEvents, 1000);
        }
        setTimeout(sendEvents, 1000);
    },    
    clearEventsCallback: function(success, error, opts) {
        eventsCallback = null;
        clearTimeout();
    },
    initiatePayment: function(success, error, opts) {
        success("Payment initiated");
        if(paymentResponseCallback) {
            console.log("Responding with default payment response");
            paymentResponseCallback(JSON.stringify(paymentResponse), { keepCallback: true});
        }
    },
    initiateRequest: function(success, error, opts) {
        success("Request initiated");
        if(responseCallback) {
            var request = JSON.parse(opts[0]);
            switch(request.requestType) {
                case "reversal":
                    console.log("Responding with default response");
                    responseCallback(JSON.stringify(reversalResponse), { keepCallback: true});
                    break;
                case "tokenisation":
                    console.log("Responding with tokenisation response");
                    responseCallback(JSON.stringify(tokenisationResponse), { keepCallback: true});
                    break;
                case "receiptDelivery":
                    console.log("Responding with receipt response");
                    responseCallback(JSON.stringify(receiptResponse), { keepCallback: true});
                    break;
                case "showLoyaltyPointsBalance":
                    console.log("Responding with loyalty response");
                    responseCallback(JSON.stringify(loyaltyResponse), { keepCallback: true});
                    break;
                case "basketStatusUpdate":
                    console.log("Responding with basket update response");
                    responseCallback(JSON.stringify(basketUpdateResponse), { keepCallback: true});
                    break;
                default:
                    console.log("AppFlowPlugin: Unexpected request type in browser");
                    break;
            }
        }
    },
    getPaymentSettings: function(success, error, opts) {
        success(JSON.stringify(paymentSettings));
    }
};

require('cordova/exec/proxy').add('AppFlowPlugin', module.exports);;