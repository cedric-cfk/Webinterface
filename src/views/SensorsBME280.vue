<template>
  <div>
    <h1>{{ $t('bme280.title') }}</h1>

    <ConfigForm v-model="bme280_config"
                config_url="/api/config/sensors/bme280">
        <p>
            <label for="enabled">{{ $t('general.enabled') }}:</label>
            <input type="checkbox"
                   name="enabled"
                   v-model="bme280_config.enabled">
        </p>
        <p>
            <label for="pin_dout">{{ $t('bme280.pin_sda') }}:</label>
            <ConfigPinSelect name="pin_dout"
                             v-model="bme280_config.pin_sda" />
        </p>
        <p>
            <label for="pin_dout">{{ $t('bme280.pin_scl') }}:</label>
            <ConfigPinSelect name="pin_dout"
                             v-model="bme280_config.pin_scl" />
        </p>
    </ConfigForm>
  </div>
</template>

<script>

import ConfigForm from '@/components/ConfigForm'
import ConfigPinSelect from '@/components/ConfigPinSelect'

export default {
    name: 'SensorsBME280',
    data() {
        return {
            bme280_config: {
                enabled: true,
                pin_sda: '',
                pin_scl: ''
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

</style>
