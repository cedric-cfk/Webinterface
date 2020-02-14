<template>
    <div>
        <h1>Test sensors</h1>
        Temperatures (DS18B20)
        <ul id="temperatures">
  <li v-for="item, key, index in temperatures">
    {{ index+1 }} - {{ item }}
  </li>
</ul>
Humidity-Related Measurements
        <ul id="humidities">
  <li v-for="item, key, index in humidities">
     {{ index+1 }} - {{ item }} - {{ key }}
  </li>
</ul>
Weight
        <ul id="Weight">
  <li v-for="item in weight">
      {{ item }}
  </li>
</ul>
</div>
</template>

<script>

import axios from 'axios'
import ConfigForm from '@/components/ConfigForm'
import ConfigPinSelect from '@/components/ConfigPinSelect'
import SensorsDS1820Available from '@/components/SensorsDS1820Available'
import SensorsDS1820Positions from '@/components/SensorsDS1820Positions'

export default {
    name: 'ds1820',

    data() {
        return {
            selected_ds1820: '',
            temperatures: {},
            humidities: {},
            weight: {},
            ds1820_config: {
                enabled: true,
                pin: 'P1',
                positions: {}
            },
            polling: null,
        }
    },

    computed: {
        unassigned_ds1820() {
            return Object.keys(this.temperatures).filter(
                key => !Object.values(this.ds1820_config.positions).includes(key)
            );
        },

        assigned_ds1820() {
            return Object.keys(this.temperatures).filter(
                key => Object.values(this.ds1820_config.positions).includes(key)
            );
        },

        temperatures_by_position() {
            let positions = this.ds1820_config.positions;
            return Object.keys(positions).filter(key => {
                return positions[key] !== "";
            }).reduce((obj, key) => {
                obj[key] = this.temperatures[positions[key]];
                return obj;
            }, {});
        }

    },

    methods: {
        load_temperatures() {
            axios.get([
                process.env.VUE_APP_FIPY_URL,
                '/api/sensors/ds1820'
            ].join('')).then(response => {
                Object.keys(response.data).forEach((key) => {
                    this.$set(this.temperatures, key, response.data[key]);
                });
            }).catch(e => {
                console.error(e);
            })
        },

         load_humidity() {
            axios.get([
                process.env.VUE_APP_FIPY_URL,
                '/api/sensors/bme280'
            ].join('')).then(response => {
                Object.keys(response.data).forEach((key) => {
                    this.$set(this.humidities, key, response.data[key]);
                });
            }).catch(e => {
                console.error(e);
            })
        },

        load_weight() {
            axios.get([
                process.env.VUE_APP_FIPY_URL,
                '/api/sensors/hx711cal'
            ].join('')).then(response => {
                Object.keys(response.data).forEach((key) => {
                    this.$set(this.weight, key, response.data[key]);
                });
            }).catch(e => {
                console.error(e);
            })
        },

        assign_position(position) {
            if (this.ds1820_config.positions[position] !== '') {
                this.$set(this.ds1820_config.positions, position, '');
            }
            else {
                if (this.selected_ds1820) {
                    this.$set(
                        this.ds1820_config.positions,
                        position,
                        this.selected_ds1820);
                    this.selected_ds1820 = '';
                }
            }
        },

        pollData() {
		        this.polling = setInterval(() => {
                this.load_temperatures();
                this.load_humidity();
                this.load_weight();
		             }, 500)
	      },


    },

    created() {
        this.load_temperatures();
        this.load_humidity();
        this.load_weight();
        this.pollData();
    },
    beforeDestroy() {
	       clearInterval(this.polling)
    },

    components: {
        ConfigForm,
        ConfigPinSelect,
        SensorsDS1820Available,
        SensorsDS1820Positions
    }
}

</script>

button.unselected {
    border: 1px solid #444444;
    background-color: #EEEEEE;
}

button.selected {
    border: 1px solid #444444;
    background-color: #EEEEEE;
}
