<template>
    <div>
        <h1>{{ $t('hx711_calibration.title') }}</h1>
        <ConfigForm v-model="hx711_config"
                    config_url="/api/config/sensors/hx711"
                    :buttons_visible=false
                    ref="configform">
            <div v-if="step===0"
                 class="flex-form">
                <p>
                    {{ $t('hx711_calibration.1_text') }}
                </p>
                <p>
                    <label for="weight">{{ $t('hx711_calibration.weight') }}</label>
                    <input type="number"
                           name="cal_weight"
                           min="0"
                           step="0.1"
                           v-model.number="cal_weight">
                </p>
                <p class="submit">
                        <button @click="load_weight(do_step_1)">{{ $t('hx711_calibration.continue') }}</button>
                        <button @click="$router.go(-1)">{{ $t('hx711_calibration.back') }}</button>
                </p>
            </div>

            <div v-if="step===1"
                 class="flex-form">
                <p>
                    {{ $t('hx711_calibration.2_text') }}
                </p>
                <p>
                    <label for="weight">{{ $t('hx711_calibration.weight') }}</label>
                    <input type="number"
                        name="cal_no_weight"
                        min="0"
                        step="0.1"
                        v-model.number="cal_no_weight">
                </p>
                <p class="submit">
                    <button @click="load_weight(do_step_2)">{{ $t('hx711_calibration.continue') }}</button>
                    <button @click="step=0">{{ $t('hx711_calibration.back') }}</button>
                </p>
            </div>
        </ConfigForm>
    </div>
</template>

<script>

import axios from 'axios'
import ConfigForm from '@/components/ConfigForm'
import { i18n } from '../main.js'

export default {
    name: 'hx711',
    data() {
        return {
            hx711_config: {
                enabled: true,
                pin_dout: "",
                pin_pdsck: "",
                tare_offset : 0.0,
                calibration_factor : 1.0
            },
            cal_weight: 1.0,
            cal_no_weight: 0.0,
            step: 0,
            measured_weight: 0
        }
    },

    methods:{
        load_weight(f) {
            axios.get([
                process.env.VUE_APP_FIPY_URL,
                '/api/sensors/hx711'
            ].join('')).then(response => {
                f(response.data['weight']);
            }).catch(e => {
                console.error(e);
            })
        },

        do_step_1(weight) {
            if (Number.parseFloat(weight)) {
                this.step = 1;
                this.measured_weight = Number.parseFloat(weight);
            }
            else {
                this.load_weight(this.do_step_1);
            }
        },

        do_step_2(weight) {
            if (Number.parseFloat(weight)) {

                let calibration_factor = (
                    (Number.parseFloat(this.measured_weight) - Number.parseFloat(weight))
                    / (Number.parseFloat(this.cal_weight) - Number.parseFloat(this.cal_no_weight))
                );
                this.$set(
                    this.hx711_config,
                    'calibration_factor',
                    calibration_factor
                );

                let tare_offset = (
                    Number.parseFloat(this.measured_weight)
                    - this.hx711_config.calibration_factor * Number.parseFloat(this.cal_weight)
                );
                this.$set(
                    this.hx711_config,
                    'tare_offset',
                    tare_offset
                );
                this.step = 0;

                this.$refs.configform.save_config();
                console.log("routing to sensors/hx711");
                this.$router.push('/' + i18n.locale + '/sensors/hx711');

            }
            else {
                this.load_weight(this.do_step_2);
            }
        }
    },
    components: {
        ConfigForm
    }
}

</script>

<style>

.flex-form p {
    justify-content: space-around !important;
}

</style>
