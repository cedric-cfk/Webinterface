<template>
    <ConfigForm v-model="log"
                config_url="/api/log"
                :buttons_visible=false>
        <p>
            <label for="reset_cause">
                Reset cause:
            </label>
            <input type="text"
                   name="reset_cause"
                   v-model="log.reset_cause"
                   readonly>
        </p>
        <p>
            <textarea v-model="log.logfile"
                      readonly
                      class="logfile"
                      rows="10"></textarea>
        </p>
    </ConfigForm>
</template>

<script>

import ConfigForm from '@/components/ConfigForm'

export default {
    name: 'SystemLog',
    data() {
        return {
            log: {
                reset_cause: "",
                logfile: ""
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
.logfile {
    width: 90%;
}
</style>
