<template>
    <div>
        <h1>{{ $t('network_config.title') }}</h1>

        <ConfigForm v-model="network_config"
                    config_url="/api/config/networking/network_config">

          <p>
              <label for="enabled">{{ $t('network_config.enable') }}:</label>
              <input type="checkbox"
                  name="enabled"
                  v-model="network_config.enabled">
          </p>
          <p>
              <label for="using">{{ $t('network_config.network_select') }}:</label>
              <select name="using"
                      v-model="network_config.using">
                  <option value="wlan">WLan</option>
                  <option value="lte_M1">lte_M1</option>
                  <option value="lte_NB1">lte_NB1</option>
              </select>
          </p>
          <div v-if="network_config.using === 'lte_NB1'">
            <div class="lte_warning_text">Not jet implemented!</div>
            <p>
                <label for="apn">{{ $t('lte.apn') }}:</label>
                <input type="text"
                       name="apn"
                       v-model="network_config.apn">
            </p>
            <p>
                <label for="band">{{ $t('lte.band') }}:</label>
                <input type="text"
                       name="band"
                       v-model="network_config.band">
            </p>
          </div>
          <div v-if="network_config.using === 'lte_M1' || network_config.using === 'lte_NB1'" class="lte_warning_text">
            <div v-html="$t('lte.warning')" /><br/>
            {{ $t('lte.info')}} <br/>
            <a href="https://community.hiveeyes.org/t/fipy-mit-lte-cat-m1-nutzen/3446">https://community.hiveeyes.org/t/fipy-mit-lte-cat-m1-nutzen/3446</a>
          </div>
          <div v-if="network_config.using === 'wlan'">
              <p>
                  <label for="antenna_external">{{ $t('wlan.antenna_external') }}:</label>
                  <input type="checkbox"
                      name="antenna_external"
                      v-model="network_config.antenna_external">
              </p>
              <p>
                  <label for="pin_dout">{{ $t('wlan.antenna_pin') }}:</label>
                  <ConfigPinSelect name="pin_dout"
                                   v-model="network_config.antenna_pin" />
              </p>
              <p v-if="ssid_visible">
                  <label for="ssid">{{ $t('networking_general.ssid') }}:</label>
                  <select name="ssid"
                          v-model="network_config.ssid"
                          @change="update_encryption()">
                      <option disabled
                              value="">
                          {{ $t('wlan.ssid_select') }}
                      </option>
                      <option v-for="ap in network_config.available"
                              :value="ap.ssid"
                              :key="ap.bssid">
                          {{ ap.ssid }}
                      </option>
                  </select>
              </p>
              <p v-if="network_config.ssid_visible" id="ssid_not_listed">
                  <label for="ssid_visible">
                  </label>
                  <button @click="ssid_visible = false">{{ $t('wlan.ssid_not_listed') }}</button>
              </p>
              <p v-else>
                  <label for="ssid">{{ $t('networking_general.ssid') }}:</label>
                  <input type="text"
                         name="ssid"
                         v-model="network_config.ssid">
              </p>
              <p>
                  <label for="encryption">{{ $t('networking_general.encryption') }}:</label>
                  <select name="encryption"
                          v-model="network_config.encryption">
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
                         v-model="network_config.password">
              </p>
              <p>
                  <label for="ifconfig">{{ $t('wlan.ip_address') }}:</label>
                  <span>
                      <input type="radio"
                          name="ifconfig"
                          value="dhcp"
                          v-model="network_config.ifconfig"> DHCP
                      <input type="radio"
                          name="ifconfig"
                          value="static"
                          v-model="network_config.ifconfig"> Static
                  </span>
              </p>
              <div id="ipv4_static"
                  v-if="network_config.ifconfig === 'static'">
                  <p>
                      <label for="ipaddress">{{ $t('wlan.address') }}:</label>
                      <input type="text"
                             name="ipaddress"
                             v-model="network_config.ipaddress">
                  </p>
                  <p>
                      <label for="subnet">{{ $t('wlan.subnet') }}:</label>
                      <input type="text"
                             name="subnet"
                             v-model="network_config.subnet">
                  </p>
                  <p>
                      <label for="gateway">{{ $t('wlan.gateway') }}:</label>
                      <input type="text"
                             name="gateway"
                             v-model="network_config.gateway">
                  </p>
                  <p>
                      <label for="dns">{{ $t('wlan.dns') }}:</label>
                      <input type="text"
                             name="dns"
                             v-model="network_config.dns">
                  </p>
              </div>
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
            network_config: {
              using: '',
              antenna_pin: '',
              available: [],
              ssid: '',
              encryption: '',
              password: '',
              ifconfig: 'dhcp',
              ipaddress: '',
              subnet: '',
              gateway: '',
              dns: '',
              apn: '',
              band: ''
            }
        }
    },

    methods: {
        update_encryption() {
            let ap = this.network_config.available.filter(ap => {
                return ap.ssid === this.network_config.ssid;
            });
            if (ap.length > 0) {
                this.$set(this.network_config, 'encryption', ap[0].sec);
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
    background-color: red;
}
</style>
