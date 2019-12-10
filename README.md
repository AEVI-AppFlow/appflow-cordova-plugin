# AppFlow Cordova Plugin

This plugin provides an implementation of the AppFlow API for Cordova based applications.

## Installation

To install this plugin into your cordova application

```
cordova plugin add appflow-cordova-plugin
```

## Usage

Once installed into you application you can obtain a handle to the API as follows along with an instance of the payment client upon which you can initiate payments and other request.

```
var paymentApi = PaymentApiCordova.getInstance();

var paymentClient = paymentApi.getPaymentClient();

```

See the [AppFlow Payment Initiation API](https://github.com/AEVI-AppFlow/pos-javascript-api) for details on how to use the payment API and models.


## Bugs and Feedback
For bugs, feature requests and questions please use GitHub Issues.

## Contributions
Contributions to any of our repos via pull requests are welcome. We follow the git flow branching model.

## LICENSE
Copyright 2020 AEVI International GmbH

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.