<template>
  <div>
    <h1>{{ $t('beep.title') }}</h1>

    <ConfigForm v-model="beep_config"
                config_url="/api/config/telemetry/beep">
        <p>
            <label for="enabled">{{ $t('general.enabled') }}:</label>
            <input type="checkbox"
                   name="enabled"
                   v-model="beep_config.enabled">
        </p>
        <p>
            <label for="enabled">{{ $t('beep.server') }}:</label>
            <input type="text"
                   name="server"
                   v-model="beep_config.server">
        </p>
        <p>
            <label for="enabled">{{ $t('beep.sensor_key') }}:</label>
            <input type="text"
                    name="sensor_key"
                    v-model="beep_config.sensor_key">
        </p>
    </ConfigForm>
  </div>
</template>

<script>

import ConfigForm from '@/components/ConfigForm'

export default {
    name: 'TelemetryBEEP',
    data() {
        return {
            beep_config: {
                enabled: true,
                sensor_key: '',
                server: ''
            }
        }
    },
    methods: {
        generate_key() {
            let name = "";
            let possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

            for (let i = 0; i < 16; i++) {
                name += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            this.$set(this.beep_config, 'sensor_key', name);
        }
    },
    components: {
        ConfigForm
    }
}
</script>

<style>

</style>
