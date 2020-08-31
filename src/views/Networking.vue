<template>
    <div>
        <h1>{{ $t('network_config.title') }}</h1>

        <ConfigForm v-model="general"
                    config_url="/api/config/networking/general">

          <p>
              <label for="enabled">{{ $t('network_config.enable') }}:</label>
              <input type="checkbox"
                  name="enabled"
                  v-model="general.enabled">
          </p>
          <p>
              <label for="using">{{ $t('network_config.network_select') }}:</label>
              <select name="using"
                      v-model="general.using">
                  <option value="wlan">WLan</option>
                  <option value="lte_M1">lte_M1</option>
                  <option value="lte_NB1">lte_NB1</option>
              </select>
          </p>
          <div v-if="general.using === 'lte_M1' || general.using === 'lte_NB1'" class="lte_warning_text">
            <div v-html="$t('lte.warning')" /><br/>
            {{ $t('lte.info')}} <br/>
            <a href="https://community.hiveeyes.org/t/fipy-mit-lte-cat-m1-nutzen/3446">https://community.hiveeyes.org/t/fipy-mit-lte-cat-m1-nutzen/3446</a>
          </div>
        </ConfigForm>
        <ConfigForm v-if="general.using === 'lte_NB1'"
                    v-model="lte_NB1" config_url="/api/config/networking/lte_NB1">
          <div class="lte_warning_text">Not jet implemented!</div>
          <p>
              <label for="apn">{{ $t('lte.apn') }}:</label>
              <input type="text"
                     name="apn"
                     v-model="lte_NB1.apn">
          </p>
          <p>
              <label for="band">{{ $t('lte.band') }}:</label>
              <input type="text"
                     name="band"
                     v-model="lte_NB1.band">
          </p>
        </ConfigForm>
        <ConfigForm v-else-if="general.using === 'wlan'"
                    v-model="wlan" config_url="/api/config/networking/wlan">
          <p>
              <label for="antenna_external">{{ $t('wlan.antenna_external') }}:</label>
              <input type="checkbox"
                  name="antenna_external"
                  v-model="wlan.antenna_external">
          </p>
          <p>
              <label for="pin_dout">{{ $t('wlan.antenna_pin') }}:</label>
              <ConfigPinSelect name="pin_dout"
                               v-model="wlan.antenna_pin" />
          </p>
          <p v-if="ssid_visible">
              <label for="ssid">{{ $t('networking_general.ssid') }}:</label>
              <select name="ssid"
                      v-model="wlan.ssid"
                      @change="update_encryption()">
                  <option disabled
                          value="">
                      {{ $t('wlan.ssid_select') }}
                  </option>
                  <option v-for="ap in wlan.available"
                          :value="ap.ssid"
                          :key="ap.bssid">
                      {{ ap.ssid }}
                  </option>
              </select>
          </p>
          <p v-if="ssid_visible" id="ssid_not_listed">
              <label for="ssid_visible">
              </label>
              <button @click="ssid_visible = false">{{ $t('wlan.ssid_not_listed') }}</button>
          </p>
          <p v-else>
              <label for="ssid">{{ $t('networking_general.ssid') }}:</label>
              <input type="text"
                     name="ssid"
                     v-model="wlan.ssid">
          </p>
          <p>
              <label for="encryption">{{ $t('networking_general.encryption') }}:</label>
              <select name="encryption"
                      v-model="wlan.encryption">
                  <option value="">None</option>
                  <option value="1">WEP</option>
                  <option value="2">WPA</option>
                  <option value="3">WPA2</option>
                  <option value="5">WPA2 ENT</option>
              </select>
          </p>
          <p>
              <label for="password">{{ $t('networking_general.password') }}:</label>
              <input type="password"
                     name="password"
                     v-model="wlan.password">
          </p>
          <p>
              <label for="ifconfig">{{ $t('wlan.ip_address') }}:</label>
              <span>
                  <input type="radio"
                      name="ifconfig"
                      value="dhcp"
                      v-model="wlan.ifconfig"> DHCP
                  <input type="radio"
                      name="ifconfig"
                      value="static"
                      v-model="wlan.ifconfig"> Static
              </span>
          </p>
          <div id="ipv4_static"
              v-if="wlan.ifconfig === 'static'">
              <p>
                  <label for="ipaddress">{{ $t('wlan.address') }}:</label>
                  <input type="text"
                         name="ipaddress"
                         v-model="wlan.ipaddress">
              </p>
              <p>
                  <label for="subnet">{{ $t('wlan.subnet') }}:</label>
                  <input type="text"
                         name="subnet"
                         v-model="wlan.subnet">
              </p>
              <p>
                  <label for="gateway">{{ $t('wlan.gateway') }}:</label>
                  <input type="text"
                         name="gateway"
                         v-model="wlan.gateway">
              </p>
              <p>
                  <label for="dns">{{ $t('wlan.dns') }}:</label>
                  <input type="text"
                         name="dns"
                         v-model="wlan.dns">
              </p>
          </div>
        </ConfigForm>
    </div>
</template>

<script>

import ConfigForm from '@/components/ConfigForm'
import ConfigPinSelect from '@/components/ConfigPinSelect'

export default {
    name: 'NetworkingWLan',
    data() {
        return {
            ssid_visible: true,
            general: {
              using: ''
            },
            wlan: {
              antenna_pin: '',
              available: [],
              ssid: '',
              encryption: '',
              password: '',
              ifconfig: 'dhcp',
              ipaddress: '',
              subnet: '',
              gateway: '',
              dns: ''
            },
            lte_NB1: {
              apn: '',
              band: ''
            }
        }
    },

    methods: {
        update_encryption() {
            let ap = this.wlan.available.filter(ap => {
                return ap.ssid === this.wlan.ssid;
            });
            if (ap.length > 0) {
                this.$set(this.wlan, 'encryption', ap[0].sec);
            }
        }
    },
    components: {
        ConfigForm,
        ConfigPinSelect
    }
}

</script>

<style>
#ssid_not_listed {
    margin-top: 0em !important;
}
.lte_warning_text {
    color: white;
    background-color: red;
}
</style>
