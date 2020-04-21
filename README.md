# bob-webinterface

## Introduction

This is a demo webinterface for the BOB project build with VueJS.
To test it set up a FiPy with the [demo webserver](https://github.com/vkuhlen/bob-webserver-demo) or with https://github.com/Hiverize/FiPy. 

## If you want to use the webinterface in development mode

In this case you can see changes instantly and don't have to copy compiled files to the Hiverize/FiPy repository and wait until the FiPy is in development mode.

* Find the IP of you FiPy: Use a FiPy and establish a wifi connection, e.g. with the Hiverize/FiPy code. In Repl-mode (Control-D in atom) you can obtain your IP by typing:
  ```python
  import network
  w = network.WLAN(id=0)
  w.ifconfig()[0]
  ```
* Rename `.env.example` to `.env` and edit it to add the URL or IP of your FiPy.
For example:
```
VUE_APP_FIPY_URL= http://192.168.1.102
```
* If you use hiverize/FiPy: Comment following line in the enable_ap() function:
```
# getattr(_wm, 'enable_ap')()
```
We have to start the webserver, but if the FiPy is in ap-mode we cannnot connect.

* Project setup
```
yarn install
```

* Compiles and hot-reloads for development
```
yarn run serve
```
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
