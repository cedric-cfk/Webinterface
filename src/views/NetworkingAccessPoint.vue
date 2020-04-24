<template>
    <div>
        <h1>{{ $t('ap.title') }}</h1>

        <ConfigForm v-model="ap_config"
                    config_url="/api/config/networking/accesspoint">
            <p>
                <label for="enabled">{{ $t('networking_general.enabled') }}:</label>
                <input type="checkbox"
                    name="enabled"
                    v-model="ap_config.enabled">
            </p>
            <p>
                <label for="ssid">{{ $t('networking_general.ssid') }}:</label>
                <input type="text"
                       name="ssid"
                       v-model="ap_config.ssid">
            </p>
            <p>
                <label for="encryption">{{ $t('networking_general.encryption') }}:</label>
                <select name="encryption"
                        v-model="ap_config.encryption">
                    <option value="">{{ $t('ap.none') }}</option>
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
                       v-model="ap_config.password">
            </p>
            <p>
                <label for="channel">{{ $t('ap.channel') }}:</label>
                <select name="channel"
                        v-model="ap_config.channel">
                    <option v-for="n in 11"
                            :key="n"
                            :value="n">
                        {{ n }}
                    </option>
                </select>
            </p>
        </ConfigForm>
    </div>
</template>

<script>

import ConfigForm from '@/components/ConfigForm'

export default {
    name: 'NetworkingAccesspoint',
    data() {
        return {
            ap_config: {
                ssid: '',
                encryption: '',
                password: '',
                channel: 1
            }
        }
    },
    components: {
        ConfigForm
    }
}

</script>
