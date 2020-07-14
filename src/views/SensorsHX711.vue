<template>
  <div>
    <h1>{{ $t('hx711_config.title') }}</h1>

    <ConfigForm v-model="hx711_config"
                config_url="/api/config/sensors/hx711">
        <p>
            <label for="enabled">{{ $t('general.enabled') }}:</label>
            <input type="checkbox"
                   name="enabled"
                   v-model="hx711_config.enabled">
        </p>
        <p>
            <label for="pin_dout">{{ $t('hx711_config.pin_data') }}:</label>
            <ConfigPinSelect name="pin_dout"
                             v-model="hx711_config.pin_dout" />
        </p>
        <p>
            <label for="pin_dout">{{ $t('hx711_config.pin_clock') }}:</label>
            <ConfigPinSelect name="pin_dout"
                             v-model="hx711_config.pin_pdsck" />
        </p>
        <p>
            <button @click="$router.push('/' + $i18n.locale + '/sensors/hx711/calibrate')">
                {{ $t('hx711_config.start_calibration') }}
            </button>
        </p>
    </ConfigForm>
  </div>
</template>

<script>

import ConfigForm from '@/components/ConfigForm'
import ConfigPinSelect from '@/components/ConfigPinSelect'

export default {
    name: 'SensorsHX711',
    data() {
        return {
            hx711_config: {
                enabled: true,
                pin_pdsck: '',
                pin_dout: '',
                tare_offset: 0,
                calibration_factor: 0
            }
        }
    },
    computed: {
        is_calibrated() {
            return (
                this.hx711_config.hasOwnProperty('tare_offset')
                && this.hx711_config['tare_offset'] !== 0
                && this.hx711_config.hasOwnProperty('calibration_factor')
                && this.hx711_config['calibration_factor'] !== 1
            )
        }
    },
    components: {
        ConfigForm,
        ConfigPinSelect
    }
}
</script>

<style>

</style>
