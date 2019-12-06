module.exports = {
    "allTransactionsApproved": true,
    "creationDateTimeMs": 1569335442936,
    "failureReason": "NONE",
    "originatingPayment": {
        "additionalData": {
            "data": {}
        },
        "amounts": {
            "additionalAmounts": {},
            "baseAmount": 1408,
            "currency": "EUR",
            "currencyExchangeRate": 0.0,
            "totalAmount": 1408
        },
        "basket": {
            "additionalBasketData": {
                "data": {}
            },
            "basketName": "sampleBasket",
            "displayItems": [
                {
                    "amount": 300,
                    "baseAmount": 250.0,
                    "category": "coffee",
                    "id": "2b7365d2-2d1b-418d-9ee1-c05def144b75",
                    "label": "Flat White",
                    "modifiers": [
                        {
                            "amount": 50.0,
                            "name": "Extra shot",
                            "type": "extra"
                        }
                    ],
                    "quantity": 1,
                    "totalAmount": 300,
                    "totalBaseAmount": 250.0,
                    "hasItemData": false,
                    "hasMeasurement": false,
                    "hasModifiers": true,
                    "hasReferences": false
                },
                {
                    "amount": 150,
                    "baseAmount": 150.0,
                    "category": "drinks",
                    "id": "221b6941-5216-43b9-8078-655e81cf7352",
                    "label": "Water",
                    "quantity": 1,
                    "totalAmount": 150,
                    "totalBaseAmount": 150.0,
                    "hasItemData": false,
                    "hasMeasurement": false,
                    "hasModifiers": false,
                    "hasReferences": false
                },
                {
                    "amount": 250,
                    "baseAmount": 250.0,
                    "category": "cake",
                    "id": "1234-abcd",
                    "label": "Chocolate Cake",
                    "quantity": 2,
                    "totalAmount": 500,
                    "totalBaseAmount": 500.0,
                    "hasItemData": false,
                    "hasMeasurement": false,
                    "hasModifiers": false,
                    "hasReferences": false
                },
                {
                    "amount": 458,
                    "baseAmount": 458.0,
                    "id": "59093dd4-9537-439f-9471-9d4164ae51ec",
                    "label": "Coffee Beans",
                    "measurement": {
                        "unit": "kg",
                        "value": 1.5
                    },
                    "quantity": 1,
                    "totalAmount": 458,
                    "totalBaseAmount": 458.0,
                    "hasItemData": false,
                    "hasMeasurement": true,
                    "hasModifiers": false,
                    "hasReferences": false
                }
            ],
            "primaryBasket": true,
            "roundingStrategy": "NEAREST",
            "id": "fb6387c9-d6ba-4928-b9e6-8850bcd2961e",
            "totalBasketValue": 1408,
            "totalNumberOfItems": 5
        },
        "flowType": "sale",
        "isExternalId": false,
        "source": "AEVI AppFlow",
        "splitEnabled": false,
        "id": "ec4f340a-d0f9-4c36-915c-1b899c9126af"
    },
    "outcome": "FULFILLED",
    "totalAmountsProcessed": {
        "additionalAmounts": {},
        "baseAmount": 1408,
        "currency": "EUR",
        "currencyExchangeRate": 0.0,
        "totalAmount": 1408
    },
    "totalAmountsRequested": {
        "additionalAmounts": {},
        "baseAmount": 1408,
        "currency": "EUR",
        "currencyExchangeRate": 0.0,
        "totalAmount": 1408
    },
    "transactions": [
        {
            "additionalData": {
                "data": {}
            },
            "baskets": [
                {
                    "additionalBasketData": {
                        "data": {}
                    },
                    "basketName": "sampleBasket",
                    "displayItems": [
                        {
                            "amount": 300,
                            "baseAmount": 250.0,
                            "category": "coffee",
                            "id": "2b7365d2-2d1b-418d-9ee1-c05def144b75",
                            "label": "Flat White",
                            "modifiers": [
                                {
                                    "amount": 50.0,
                                    "name": "Extra shot",
                                    "type": "extra"
                                }
                            ],
                            "quantity": 1,
                            "totalAmount": 300,
                            "totalBaseAmount": 250.0,
                            "hasItemData": false,
                            "hasMeasurement": false,
                            "hasModifiers": true,
                            "hasReferences": false
                        },
                        {
                            "amount": 150,
                            "baseAmount": 150.0,
                            "category": "drinks",
                            "id": "221b6941-5216-43b9-8078-655e81cf7352",
                            "label": "Water",
                            "quantity": 1,
                            "totalAmount": 150,
                            "totalBaseAmount": 150.0,
                            "hasItemData": false,
                            "hasMeasurement": false,
                            "hasModifiers": false,
                            "hasReferences": false
                        },
                        {
                            "amount": 250,
                            "baseAmount": 250.0,
                            "category": "cake",
                            "id": "1234-abcd",
                            "label": "Chocolate Cake",
                            "quantity": 2,
                            "totalAmount": 500,
                            "totalBaseAmount": 500.0,
                            "hasItemData": false,
                            "hasMeasurement": false,
                            "hasModifiers": false,
                            "hasReferences": false
                        },
                        {
                            "amount": 458,
                            "baseAmount": 458.0,
                            "id": "59093dd4-9537-439f-9471-9d4164ae51ec",
                            "label": "Coffee Beans",
                            "measurement": {
                                "unit": "kg",
                                "value": 1.5
                            },
                            "quantity": 1,
                            "totalAmount": 458,
                            "totalBaseAmount": 458.0,
                            "hasItemData": false,
                            "hasMeasurement": true,
                            "hasModifiers": false,
                            "hasReferences": false
                        }
                    ],
                    "primaryBasket": true,
                    "roundingStrategy": "NEAREST",
                    "id": "fb6387c9-d6ba-4928-b9e6-8850bcd2961e",
                    "totalBasketValue": 1408,
                    "totalNumberOfItems": 5
                }
            ],
            "executedFlowApps": [
                {
                    "augmentedData": [],
                    "flowAppId": "com.aevi.sdk.pos.flow.flowservicesample",
                    "stage": "POST_CARD_READING"
                },
                {
                    "augmentedData": [],
                    "flowAppId": "com.aevi.sdk.pos.flow.flowservicesample",
                    "stage": "POST_TRANSACTION"
                }
            ],
            "requestedAmounts": {
                "additionalAmounts": {},
                "baseAmount": 1408,
                "currency": "EUR",
                "currencyExchangeRate": 0.0,
                "totalAmount": 1408
            },
            "transactionResponses": [
                {
                    "amounts": {
                        "additionalAmounts": {},
                        "baseAmount": 1408,
                        "currency": "EUR",
                        "currencyExchangeRate": 0.0,
                        "totalAmount": 1408
                    },
                    "card": {
                        "additionalData": {
                            "data": {
                                "cardProducedInSample": {
                                    "type": "java.lang.Boolean",
                                    "value": true
                                },
                                "languages": {
                                    "type": "[Ljava.lang.String;",
                                    "value": [
                                        "en",
                                        "de",
                                        "fr"
                                    ]
                                },
                                "entryMethod": {
                                    "type": "java.lang.String",
                                    "value": "insert"
                                },
                                "aid": {
                                    "type": "java.lang.String",
                                    "value": "A0000000031010"
                                },
                                "network": {
                                    "type": "java.lang.String",
                                    "value": "VISA"
                                }
                            }
                        },
                        "cardToken": {
                            "algorithm": "random",
                            "source": "card",
                            "value": "9c1464f8-3cbd-448b-b9c4-30003fd296a6"
                        },
                        "cardholderName": "Joanna Doe",
                        "expiryDate": "2506",
                        "maskedPan": "461234XXXXXX3456"
                    },
                    "flowServiceId": "com.aevi.sdk.pos.flow.paymentservicesample",
                    "flowStage": "TRANSACTION_PROCESSING",
                    "outcome": "APPROVED",
                    "outcomeMessage": "User approved manually",
                    "paymentMethod": "card",
                    "references": {
                        "data": {
                            "merchantId": {
                                "type": "java.lang.String",
                                "value": "87654321"
                            },
                            "transactionDateTime": {
                                "type": "java.lang.String",
                                "value": "1569335437525"
                            },
                            "sampleTransactionReference": {
                                "type": "java.lang.String",
                                "value": "3b5ad02e-f614-48ff-b579-b2fc9d960660"
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
                    "responseCode": "00",
                    "id": "1471413a-6736-4ace-92d1-5ea3a9ebaa26"
                }
            ],
            "id": "c1044874-d4ef-41dd-a9b4-621613469ddb",
            "processedAmounts": {
                "additionalAmounts": {},
                "baseAmount": 1408,
                "currency": "EUR",
                "currencyExchangeRate": 0.0,
                "totalAmount": 1408
            },
            "remainingAmounts": {
                "additionalAmounts": {},
                "baseAmount": 0,
                "currency": "EUR",
                "currencyExchangeRate": 0.0,
                "totalAmount": 0
            },
            "hasProcessedRequestedAmounts": true
        }
    ],
    "id": "ec4f340a-d0f9-4c36-915c-1b899c9126af"
};