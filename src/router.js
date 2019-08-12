import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

import GeneralConfig from './views/GeneralConfig'

import SensorsDS1820 from './views/SensorsDS1820'
import SensorsHX711 from './views/SensorsHX711'
import SensorsHX711Calibration from './views/SensorsHX711Calibration'
import SensorsBME280 from './views/SensorsBME280'
import SensorsTest from './views/SensorsTest'


import TelemetryBEEP from './views/TelemetryBEEP'

import NetworkingWLan from './views/NetworkingWLan'
import NetworkingAccessPoint from './views/NetworkingAccessPoint'

import Restart from './views/Restart'
import SystemLog from './views/SystemLog'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/config/general',
        name: 'general',
        component: GeneralConfig
    },    
    {
        path: '/sensors/ds1820',
        name: 'ds1820',
        component: SensorsDS1820
    },
    {
        path: '/sensors/test',
        name: 'sensortest',
        component: SensorsTest
    },
    {
        path: '/sensors/hx711/calibrate',
        name: 'hx711calibration',
        component: SensorsHX711Calibration
    },
    {
        path: '/sensors/hx711',
        name: 'hx711',
        component: SensorsHX711
    },
    {
        path: '/sensors/bme280',
        name: 'bme280',
        component: SensorsBME280
    },
    {
        path: '/networking/wlan',
        name: 'wlan',
        component: NetworkingWLan
    },
    {
        path: '/networking/ap',
        name: 'ap',
        component: NetworkingAccessPoint
    },
    {
        path: '/telemetry/beep',
        name: 'beep',
        component: TelemetryBEEP
    },
    {
        path: '/restart',
        name: 'restart',
        component: Restart
    },
    {
        path: '/log',
        name: 'log',
        component: SystemLog
    }
  ]
})
