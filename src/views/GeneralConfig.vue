<template>
    <ConfigForm v-model="general_config"
                config_url="/api/config/general/general">
        <p>
            <label for="set_time">Set current time</label>
            <button name="set_time"
                    class="form-button"
                    @click="get_local_time()">
                        Set Time
            </button>
        </p>
        <p>
            <label for="button_ap_enabled">Extra Button available:</label>
            <input type="checkbox"
                   name="button_ap_enabled"
                   v-model="general_config.button_ap_enabled">
        </p>    
        <p v-if="general_config.button_ap_enabled">
            <label for="pin_dout">Data Pin (DOUT/DT):</label>
            <ConfigPinSelect name="pin_dout"
                             v-model="general_config.button_ap_pin" />
        </p>
    </ConfigForm>
</template>

<script>

import ConfigForm from '@/components/ConfigForm'
import ConfigPinSelect from '@/components/ConfigPinSelect'

export default {
    name: 'GeneralConfig',
    data() {
        return {
            general_config: {
                initial_time: 0
            }
        }
    },
    components: {
        ConfigForm,
        ConfigPinSelect
    },
    methods: {
        get_local_time() {
            this.$set(this.general_config, "initial_time", new Date().getTime());
        }
    }
}
</script>

<style>

</style>
