module.exports = {
    "additionalSettings": {
      "data": {}
    },
    "allServices": {
      "paymentFlowServiceInfoList": [
        {
          "canAdjustAmounts": false,
          "canPayAmounts": false,
          "defaultCurrency": "",
          "paymentMethods": [],
          "supportedCurrencies": [],
          "additionalInfo": {
            "data": {}
          },
          "apiVersion": "2.1.2",
          "customRequestTypes": [
            "downloadFile",
            "uploadFile",
            "storeData",
            "getData"
          ],
          "displayName": "AEVI Developer Data Storage",
          "flowAndStagesDefinitions": {
            "downloadFile": [
              "GENERIC"
            ],
            "uploadFile": [
              "GENERIC"
            ],
            "sampleReversal": [
              "GENERIC",
              "POST_GENERIC"
            ],
            "sampleSale": [
              "POST_FLOW"
            ],
            "storeData": [
              "GENERIC"
            ],
            "sampleRefund": [
              "POST_FLOW"
            ],
            "getData": [
              "GENERIC"
            ]
          },
          "hasAccessibilityMode": false,
          "packageName": "com.aevi.appflow.storage",
          "serviceVersion": "1.0.0",
          "stages": [
            "GENERIC",
            "POST_GENERIC",
            "POST_FLOW"
          ],
          "supportedDataKeys": [],
          "supportedFlowTypes": [
            "sale",
            "reversal",
            "refund"
          ],
          "vendor": "AEVI",
          "id": "com.aevi.appflow.storage"
        },
        {
          "canAdjustAmounts": false,
          "canPayAmounts": false,
          "defaultCurrency": "",
          "paymentMethods": [],
          "supportedCurrencies": [],
          "additionalInfo": {
            "data": {}
          },
          "apiVersion": "2.1.2",
          "customRequestTypes": [],
          "displayName": "AEVI Receipt Printing",
          "flowAndStagesDefinitions": {
            "sampleSale": [
              "POST_TRANSACTION"
            ]
          },
          "hasAccessibilityMode": false,
          "packageName": "com.aevi.appflow.receipt",
          "serviceVersion": "2.0.1",
          "stages": [
            "GENERIC",
            "POST_GENERIC",
            "POST_TRANSACTION"
          ],
          "supportedDataKeys": [],
          "supportedFlowTypes": [
            "sale",
            "reversal",
            "preAuthorisation",
            "receiptDelivery",
            "preAuthCompletion",
            "deposit",
            "motoSale",
            "refund",
            "motoRefund"
          ],
          "vendor": "AEVI",
          "id": "com.aevi.appflow.receipt"
        },
        {
          "canAdjustAmounts": false,
          "canPayAmounts": true,
          "defaultCurrency": "GBP",
          "paymentMethods": [
            "card"
          ],
          "supportedCurrencies": [
            "EUR",
            "GBP",
            "USD"
          ],
          "additionalInfo": {
            "data": {
              "pref_supports_read_card": {
                "type": "java.lang.Boolean",
                "value": true
              },
              "merchants": {
                "type": "com.aevi.sdk.pos.flow.model.Merchant",
                "value": {
                  "name": "Demo Merchant",
                  "id": "28683940"
                }
              }
            }
          },
          "apiVersion": "2.1.1",
          "customRequestTypes": [],
          "displayName": "Demo Payment Service",
          "flowAndStagesDefinitions": {},
          "hasAccessibilityMode": false,
          "packageName": "com.aevi.sdk.demo.pa",
          "serviceVersion": "2.1.1",
          "stages": [
            "GENERIC",
            "PAYMENT_CARD_READING",
            "TRANSACTION_PROCESSING"
          ],
          "supportedDataKeys": [],
          "supportedFlowTypes": [
            "sale",
            "reversal",
            "tokenisation",
            "refund"
          ],
          "vendor": "AEVI",
          "id": "com.aevi.sdk.demo.pa"
        },
        {
          "canAdjustAmounts": true,
          "canPayAmounts": false,
          "defaultCurrency": "",
          "paymentMethods": [],
          "supportedCurrencies": [],
          "additionalInfo": {
            "data": {}
          },
          "apiVersion": "2.1.2",
          "customRequestTypes": [],
          "displayName": "Demo Tipping App",
          "flowAndStagesDefinitions": {},
          "hasAccessibilityMode": false,
          "packageName": "com.aevi.sdk.demo.tip",
          "serviceVersion": "2.1.2",
          "stages": [
            "POST_CARD_READING"
          ],
          "supportedDataKeys": [],
          "supportedFlowTypes": [
            "sale"
          ],
          "vendor": "AEVI SDK",
          "id": "com.aevi.sdk.demo.tip"
        },
        {
          "canAdjustAmounts": true,
          "canPayAmounts": true,
          "defaultCurrency": "",
          "paymentMethods": [
            "giftCard",
            "cash",
            "points"
          ],
          "supportedCurrencies": [],
          "additionalInfo": {
            "data": {}
          },
          "apiVersion": "2.1.2",
          "customRequestTypes": [
            "showLoyaltyPointsBalance"
          ],
          "displayName": "Flow Service Sample",
          "flowAndStagesDefinitions": {
            "sampleBasketStatusUpdate": [
              "STATUS_UPDATE"
            ],
            "showLoyaltyPointsBalance": [
              "GENERIC"
            ],
            "sampleSale": [
              "POST_CARD_READING",
              "POST_TRANSACTION"
            ],
            "sampleReceiptDelivery": [
              "GENERIC"
            ],
            "sampleTokenisation": [
              "POST_GENERIC"
            ]
          },
          "hasAccessibilityMode": false,
          "packageName": "com.aevi.sdk.pos.flow.flowservicesample",
          "serviceVersion": "2.1.2",
          "stages": [
            "GENERIC",
            "POST_GENERIC",
            "POST_CARD_READING",
            "POST_FLOW",
            "STATUS_UPDATE",
            "PRE_FLOW",
            "SPLIT",
            "POST_TRANSACTION",
            "PRE_TRANSACTION"
          ],
          "supportedDataKeys": [],
          "supportedFlowTypes": [
            "sale",
            "receiptDelivery",
            "tokenisation",
            "basketStatusUpdate"
          ],
          "vendor": "AEVI",
          "id": "com.aevi.sdk.pos.flow.flowservicesample"
        },
        {
          "canAdjustAmounts": false,
          "canPayAmounts": true,
          "defaultCurrency": "GBP",
          "paymentMethods": [
            "cash",
            "card",
            "bitcoin"
          ],
          "supportedCurrencies": [
            "EUR",
            "GBP",
            "USD"
          ],
          "additionalInfo": {
            "data": {
              "supportsManualEntry": {
                "type": "java.lang.Boolean",
                "value": false
              },
              "merchants": {
                "type": "com.aevi.sdk.pos.flow.model.Merchant",
                "value": {
                  "name": "Sample Merchant",
                  "id": "87654321"
                }
              }
            }
          },
          "apiVersion": "2.1.2",
          "customRequestTypes": [],
          "displayName": "Payment Service Sample",
          "flowAndStagesDefinitions": {
            "sampleReversal": [
              "GENERIC"
            ],
            "sampleSale": [
              "PAYMENT_CARD_READING",
              "TRANSACTION_PROCESSING"
            ],
            "sampleRefund": [
              "TRANSACTION_PROCESSING"
            ],
            "sampleTokenisation": [
              "GENERIC"
            ]
          },
          "hasAccessibilityMode": false,
          "packageName": "com.aevi.sdk.pos.flow.paymentservicesample",
          "serviceVersion": "2.1.2",
          "stages": [
            "GENERIC",
            "PAYMENT_CARD_READING",
            "TRANSACTION_PROCESSING"
          ],
          "supportedDataKeys": [],
          "supportedFlowTypes": [
            "sale",
            "reversal",
            "tokenisation",
            "refund"
          ],
          "vendor": "AEVI",
          "id": "com.aevi.sdk.pos.flow.paymentservicesample"
        }
      ],
      "supportedCurrencies": [
        "EUR",
        "GBP",
        "USD"
      ],
      "supportedDataKeys": [],
      "supportedPaymentMethods": [
        "giftCard",
        "cash",
        "card",
        "bitcoin",
        "points"
      ],
      "supportedRequestTypes": [
        "downloadFile",
        "uploadFile",
        "showLoyaltyPointsBalance",
        "storeData",
        "getData"
      ]
    },
    "appFlowSettings": {
      "commsChannel": "messenger",
      "dateFormat": "yyyy-MM-dd",
      "primaryLanguage": "en",
      "timeFormat": "HH:mm:ss"
    },
    "flowConfigurations": {
      "flowConfigurations": [
        {
          "apiMajorVersion": 2,
          "description": "Flow service custom type",
          "generatedFromCustomType": true,
          "name": "downloadFile",
          "processInBackground": false,
          "stages": [
            {
              "appExecutionType": "SINGLE_SELECT",
              "flowApps": [
                {
                  "id": "com.aevi.appflow.storage",
                  "mandatory": false
                }
              ],
              "name": "GENERIC"
            }
          ],
          "type": "downloadFile",
          "version": 1
        },
        {
          "apiMajorVersion": 2,
          "description": "Flow service custom type",
          "generatedFromCustomType": true,
          "name": "uploadFile",
          "processInBackground": false,
          "stages": [
            {
              "appExecutionType": "SINGLE_SELECT",
              "flowApps": [
                {
                  "id": "com.aevi.appflow.storage",
                  "mandatory": false
                }
              ],
              "name": "GENERIC"
            }
          ],
          "type": "uploadFile",
          "version": 1
        },
        {
          "apiMajorVersion": 2,
          "description": "Sample basket status update flow",
          "generatedFromCustomType": false,
          "name": "sampleBasketStatusUpdate",
          "processInBackground": false,
          "stages": [
            {
              "appExecutionType": "MULTIPLE",
              "flowApps": [
                {
                  "id": "com.aevi.sdk.pos.flow.flowservicesample",
                  "mandatory": false
                }
              ],
              "name": "STATUS_UPDATE"
            }
          ],
          "type": "basketStatusUpdate",
          "version": 0
        },
        {
          "apiMajorVersion": 2,
          "description": "Sample reversal flow",
          "generatedFromCustomType": false,
          "name": "sampleReversal",
          "processInBackground": true,
          "stages": [
            {
              "appExecutionType": "SINGLE_SELECT",
              "flowApps": [
                {
                  "id": "com.aevi.sdk.pos.flow.paymentservicesample",
                  "mandatory": false
                },
                {
                  "id": "com.aevi.appflow.storage",
                  "mandatory": false
                }
              ],
              "name": "GENERIC"
            },
            {
              "appExecutionType": "SINGLE_SELECT",
              "flowApps": [
                {
                  "id": "com.aevi.appflow.storage",
                  "mandatory": false
                }
              ],
              "name": "POST_GENERIC"
            }
          ],
          "type": "reversal",
          "version": 0
        },
        {
          "apiMajorVersion": 2,
          "description": "Flow service custom type",
          "generatedFromCustomType": true,
          "name": "showLoyaltyPointsBalance",
          "processInBackground": false,
          "stages": [
            {
              "appExecutionType": "SINGLE_SELECT",
              "flowApps": [
                {
                  "id": "com.aevi.sdk.pos.flow.flowservicesample",
                  "mandatory": false
                }
              ],
              "name": "GENERIC"
            }
          ],
          "type": "showLoyaltyPointsBalance",
          "version": 1
        },
        {
          "apiMajorVersion": 2,
          "description": "Sample sale flow (without fulfilled check)",
          "generatedFromCustomType": false,
          "name": "sampleSale",
          "processInBackground": false,
          "stages": [
            {
              "appExecutionType": "SINGLE_SELECT",
              "flowApps": [],
              "name": "PRE_FLOW"
            },
            {
              "appExecutionType": "SINGLE_SELECT",
              "flowApps": [],
              "innerFlow": {
                "apiMajorVersion": 0,
                "generatedFromCustomType": false,
                "name": "N/A",
                "processInBackground": false,
                "stages": [
                  {
                    "appExecutionType": "MULTIPLE",
                    "flowApps": [],
                    "name": "PRE_TRANSACTION"
                  },
                  {
                    "appExecutionType": "SINGLE_SELECT",
                    "flowApps": [
                      {
                        "id": "com.aevi.sdk.pos.flow.paymentservicesample",
                        "mandatory": false
                      }
                    ],
                    "name": "PAYMENT_CARD_READING"
                  },
                  {
                    "appExecutionType": "MULTIPLE",
                    "flowApps": [
                      {
                        "id": "com.aevi.sdk.pos.flow.flowservicesample",
                        "mandatory": false
                      }
                    ],
                    "name": "POST_CARD_READING"
                  },
                  {
                    "appExecutionType": "SINGLE_SELECT",
                    "flowApps": [
                      {
                        "id": "com.aevi.sdk.pos.flow.paymentservicesample",
                        "mandatory": false
                      }
                    ],
                    "name": "TRANSACTION_PROCESSING"
                  },
                  {
                    "appExecutionType": "MULTIPLE",
                    "flowApps": [
                      {
                        "id": "com.aevi.sdk.pos.flow.flowservicesample",
                        "mandatory": false
                      },
                      {
                        "id": "com.aevi.appflow.receipt",
                        "mandatory": false
                      }
                    ],
                    "name": "POST_TRANSACTION"
                  }
                ],
                "type": "transaction",
                "version": 0
              },
              "name": "SPLIT"
            },
            {
              "appExecutionType": "SINGLE_SELECT",
              "flowApps": [
                {
                  "id": "com.aevi.appflow.storage",
                  "mandatory": false
                }
              ],
              "name": "POST_FLOW"
            }
          ],
          "type": "sale",
          "version": 0
        },
        {
          "apiMajorVersion": 2,
          "description": "Flow service custom type",
          "generatedFromCustomType": true,
          "name": "storeData",
          "processInBackground": false,
          "stages": [
            {
              "appExecutionType": "SINGLE_SELECT",
              "flowApps": [
                {
                  "id": "com.aevi.appflow.storage",
                  "mandatory": false
                }
              ],
              "name": "GENERIC"
            }
          ],
          "type": "storeData",
          "version": 1
        },
        {
          "apiMajorVersion": 2,
          "description": "Sample refund flow",
          "generatedFromCustomType": false,
          "name": "sampleRefund",
          "processInBackground": false,
          "stages": [
            {
              "appExecutionType": "SINGLE_SELECT",
              "flowApps": [
                {
                  "id": "com.aevi.sdk.pos.flow.paymentservicesample",
                  "mandatory": false
                }
              ],
              "name": "TRANSACTION_PROCESSING"
            },
            {
              "appExecutionType": "SINGLE_SELECT",
              "flowApps": [
                {
                  "id": "com.aevi.appflow.storage",
                  "mandatory": false
                }
              ],
              "name": "POST_FLOW"
            }
          ],
          "type": "refund",
          "version": 0
        },
        {
          "apiMajorVersion": 2,
          "description": "Sample receipt delivery flow",
          "generatedFromCustomType": false,
          "name": "sampleReceiptDelivery",
          "processInBackground": false,
          "stages": [
            {
              "appExecutionType": "SINGLE_SELECT",
              "flowApps": [
                {
                  "id": "com.aevi.sdk.pos.flow.flowservicesample",
                  "mandatory": false
                }
              ],
              "name": "GENERIC"
            }
          ],
          "type": "receiptDelivery",
          "version": 0
        },
        {
          "apiMajorVersion": 2,
          "description": "Flow service custom type",
          "generatedFromCustomType": true,
          "name": "getData",
          "processInBackground": false,
          "stages": [
            {
              "appExecutionType": "SINGLE_SELECT",
              "flowApps": [
                {
                  "id": "com.aevi.appflow.storage",
                  "mandatory": false
                }
              ],
              "name": "GENERIC"
            }
          ],
          "type": "getData",
          "version": 1
        },
        {
          "apiMajorVersion": 2,
          "description": "Sample tokenisation flow",
          "generatedFromCustomType": false,
          "name": "sampleTokenisation",
          "processInBackground": false,
          "stages": [
            {
              "appExecutionType": "SINGLE_SELECT",
              "flowApps": [
                {
                  "id": "com.aevi.sdk.pos.flow.paymentservicesample",
                  "mandatory": false
                }
              ],
              "name": "GENERIC"
            },
            {
              "appExecutionType": "SINGLE_SELECT",
              "flowApps": [
                {
                  "id": "com.aevi.sdk.pos.flow.flowservicesample",
                  "mandatory": false
                }
              ],
              "name": "POST_GENERIC"
            }
          ],
          "type": "tokenisation",
          "version": 0
        }
      ]
    },
    "fpsSettings": {
      "allowAccessViaStatusBar": false,
      "alwaysAllowDynamicSelect": false,
      "alwaysCallPreFlow": false,
      "appOrDeviceSelectionTimeoutSeconds": 60,
      "databaseRowLimit": 1000,
      "filterServicesByFlowType": true,
      "flowResponseTimeoutSeconds": 120,
      "isCurrencyChangeAllowed": false,
      "isMultiDevice": false,
      "legacyPaymentAppsEnabled": false,
      "paymentResponseTimeoutSeconds": 120,
      "shouldAbortOnFlowAppError": false,
      "shouldAbortOnPaymentError": false,
      "splitResponseTimeoutSeconds": 1200,
      "statusUpdateTimeoutSeconds": 10
    }
  };