# bob-webinterface

## Introduction

This is a demo webinterface for the BOB project build with VueJS.
To test it set up a FiPy with the [demo webserver](https://github.com/vkuhlen/bob-webserver-demo) or with https://github.com/Hiverize/FiPy.

## If you want to use the webinterface in development mode

In this case you can see changes instantly and don't have to copy compiled files to the hiverize/FiPy repository and wait until the FiPy is in development mode.

* Find the IP of your FiPy: Use a FiPy and establish a wifi connection, e.g. with the hiverize/FiPy code [(FiPy setup tutorial)](https://hiverize.org/installation-des-sensor-kits/). In Repl-mode (Control-D in atom) you can obtain your IP by typing:
  ```python
  import network
  w = network.WLAN(id=0)
  w.ifconfig()[0]
  ```
  If this is not working for you. Try to find the FiPys IP with the interface of your router. The FiPy shoud be named something like "expressive" or "espressif". Otherwise you can use https://stackoverflow.com/a/43546432 to detect which IPs are in your network. Now you can disconnected your FiPy and scan a second time. Compare those tow outputs. The missing IP should be your FiPys IP.

* Rename the `.env.example` file in the hiverize/webinterface project to `.env` and edit it to add the URL or IP of your FiPy.
For example:
```
VUE_APP_FIPY_URL= http://192.168.1.102
```
* If you use hiverize/FiPy: Open the hiverize/FiPy project and open the `main.py` file. Now comment following lines in the `enable_ap()` function:
```
# getattr(_wm, 'enable_ap')()
# log("AP enabled")
```
upload the updated Project to your FiPy.
This is needed because we have to start the webserver, but if the FiPy is in ap-mode we cannot connect.

* Open your Command Line and execute the following commands

Note: Make sure to install [yarn](https://classic.yarnpkg.com/en/docs/install/#windows-stable) and at least [Node.js](https://nodejs.org/en/download/) 4.0.
```
yarn install
```
sets up your Project.

```
yarn run serve
```
compiles and hot-reloads for development.

You should then have access to the webinterface under the specified IP.

## If you have a version you want to use for production

* Project setup
```
yarn install
```


* Compiles and minifies for production
```
yarn run build
```

* copy the generated files in the www directory of hiverize/FiPy and upload them



## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
