module.exports = {
    "flowServiceId": "com.aevi.sdk.pos.flow.paymentservicesample",
    "originatingRequest": {
        "processInBackground": false, 
        "requestData": { 
            "data": {} 
        }, 
        "requestType": "tokenisation", 
        "id": "b885a91b-78b1-4aa1-80d3-1e577ee491a3"
    }, 
    "outcomeMessage": "Sample token generated", 
    "processedInBackground": false, 
    "responseData": { 
        "data": { 
            "token": { 
                "type": "com.aevi.sdk.flow.model.Token", 
                "value": { 
                    "algorithm": "random", 
                    "source": "card", 
                    "value": "216d1b3c-49c9-4bb8-b564-278b6c751a89" 
                } 
            }, 
            "postGeneric": { 
                "type": "java.lang.String", 
                "value": "wasHere" 
            } 
        } 
    }, 
    "success": true, 
    "id": "b885a91b-78b1-4aa1-80d3-1e577ee491a3"
}