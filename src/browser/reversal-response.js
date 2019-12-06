module.exports = { 
    "flowServiceId": "com.aevi.sdk.pos.flow.paymentservicesample", 
    "originatingRequest": { 
        "processInBackground": true, 
        "requestData": { 
            "data": { 
                "merchantId": { 
                    "type": "java.lang.String", 
                    "value": "87654321" 
                }, 
                "transactionDateTime": { 
                    "type": "java.lang.String", 
                    "value": "1574338333585" 
                }, 
                "sampleTransactionReference": { 
                    "type": "java.lang.String", 
                    "value": "39e2e610-c4e2-4e4d-92f6-d21fdae1083b" 
                }, 
                "terminalId": { 
                    "type": "java.lang.String", 
                    "value": "12345678" 
                }, 
                "merchantName": { 
                    "type": "java.lang.String", 
                    "value": "Sample Merchant" 
                } 
            } 
        }, 
        "requestType": "reversal", 
        "id": "2168fc00-36e4-4d72-929c-47a0e4caf4a7" 
    }, 
    "outcomeMessage": "Reversed transaction: 39e2e610-c4e2-4e4d-92f6-d21fdae1083b", 
    "processedInBackground": true, 
    "responseData": { "data": {} }, 
    "success": true, 
    "id": "2168fc00-36e4-4d72-929c-47a0e4caf4a7" 
}