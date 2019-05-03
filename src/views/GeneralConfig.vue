<template>
    <ConfigForm v-model="general_config"
                config_url="/api/config/general/general">
        <button @click="get_local_time()">Set Time</button>
    </ConfigForm>
</template>

<script>

import ConfigForm from '@/components/ConfigForm'

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
        ConfigForm
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
