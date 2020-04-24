<template>
  <div class="ds1820">
    <h1>{{ $t('ds1820.title') }}</h1>
    <ConfigForm v-model="ds1820_config"
                config_url="/api/config/sensors/ds1820"
                buttons_visible="false">
        <p>
            <label for="enabled">{{ $t('general.enabled') }}:</label>
            <input type="checkbox"
                   name="enabled"
                   v-model="ds1820_config.enabled">
        </p>
        <p>
            <label for="pin">{{ $t('ds1820.pin_select') }}:</label>
            <ConfigPinSelect v-model="ds1820_config.pin" />
        </p>
        <div class="description">
            <br>
            <p v-html="$t('ds1820.paragraph')"></p>
            <ol>
                <li>
                    {{ $t('ds1820.1_list') }}
                </li>
                <li>
                    {{ $t('ds1820.2_list') }}
                </li>
                <li>
                    {{ $t('ds1820.3_list') }}
                </li>
            </ol>
            {{ $t('ds1820.tip') }}
        </div>
        <SensorsDS1820Positions :ds1820_positions="ds1820_config.positions"
                                :temperatures="temperatures_by_position"
                                @assign="assign_position" />
        <keep-alive>
        <SensorsDS1820Available v-if="unassigned_ds1820.length > 0"
                                :unassigned_ds1820="unassigned_ds1820"
                                :temperatures="temperatures"
                                v-model="selected_ds1820"/>
        </keep-alive>
    </ConfigForm>

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
            ds1820_config: {
                enabled: true,
                pin: 'P1',
                positions: {}
            },
            polling: null,
            request: null,
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
            if(this.request != null){
                console.log("deleted old request")
                this.request.cancel("Canceled Request");
            }
            this.request = axios.CancelToken.source();
            axios.get([
                process.env.VUE_APP_FIPY_URL,
                '/api/sensors/ds1820'
            ].join(''), { cancelToken: this.request.token }).then(response => {
                Object.keys(response.data).forEach((key) => {
                    this.$set(this.temperatures, key, response.data[key]);
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
                 }, 5000)
        },
    },

    created() {
        this.load_temperatures();
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

<style>

.description {
    text-align: left;
}

.ds1820-positions {
    padding: 2vh 0;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
}

@media (max-width: 500px) {
    .round {
        width: 12vw;
        height: 12vw;
        border-radius: 6vw;
        min-width: 1em;
        min-height: 1em;
    }
}

@media (min-width: 500px) {
    .round {
        width: 70px;
        height: 70px;
        border-radius: 35px;
    }
}

.ds1820 button {
	cursor:pointer;
	color:#000;
	padding:2px 2px;
	text-decoration:none;
}

</style>
