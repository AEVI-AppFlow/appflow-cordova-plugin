module.exports = {
    "flowServiceId":"com.aevi.sdk.pos.flow.flowservicesample",
    "originatingRequest":{
        "processInBackground":false,
        "requestData":{
            "data":{
                "customer":{
                    "type":"com.aevi.sdk.flow.model.Customer",
                    "value":{
                        "customerDetails":{
                            "data":{
                                "phone":{
                                    "type":"java.lang.String",
                                    "value":"12345678"
                                },
                                "generatedBy":{
                                    "type":"java.lang.String",
                                    "value":"Payment Initiation Sample"
                                },
                                "email":{
                                    "type":"java.lang.String",
                                    "value":"joanna@doe.com"}
                                }
                            },
                            "fullName":"Joanna Doe",
                            "tokens":[
                                {"algorithm":"random","source":"card","value":"f31fa21f-913a-4b31-9574-dc476292a438"}
                            ],
                            "id":"18562da3-0442-4a55-91f7-a32f0f24b689"
                        }
                    }
                }
            },
            "requestType":"showLoyaltyPointsBalance",
            "id":"ddfdee8d-0629-4d6d-9d9f-dbf21db60838"
        },
        "outcomeMessage":"Loyalty balance presented",
        "processedInBackground":false,
        "responseData":{
            "data":{}
        },
        "success":true,"id":"ddfdee8d-0629-4d6d-9d9f-dbf21db60838"
    }

