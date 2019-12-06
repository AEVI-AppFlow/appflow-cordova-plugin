module.exports = { 
    "flowServiceId": "com.aevi.sdk.pos.flow.flowservicesample", 
    "originatingRequest": { 
        "processInBackground": false, 
        "requestData": { 
            "data": { 
                "receiptAmounts": { 
                    "type": "com.aevi.sdk.pos.flow.model.Amounts", 
                    "value": { 
                        "additionalAmounts": {}, 
                        "baseAmount": 15000, 
                        "currency": "EUR", 
                        "currencyExchangeRate": 0.0 } 
                    }, 
                    "receiptOutcome": { 
                        "type": "java.lang.String", 
                        "value": "APPROVED" 
                    }, 
                    "receiptPaymentMethod": { 
                        "type": "java.lang.String", 
                        "value": "cash" 
                    } 
                } 
            }, 
            "requestType": "receiptDelivery", 
            "id": "30c69776-a263-464e-8582-a9a47b02adaf" 
        }, 
        "outcomeMessage": "Receipt data presented", 
        "processedInBackground": false, 
        "responseData": { 
            "data": {} 
        }, 
        "success": true, 
        "id": "30c69776-a263-464e-8582-a9a47b02adaf" 
    }
