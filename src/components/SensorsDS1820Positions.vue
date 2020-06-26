<template>
    <fieldset class="ds1820-positions">
        <legend>{{ $t('ds1820.positions') }}:</legend>
        <div v-for="(position, idx) in allowed_positions" :key="position">
            <button class="round"
                    :name="position"
                    :class="[ds1820_positions[position] ? 'assigned' : 'unassigned']"
                    @click="$emit('assign', position)">
                    {{ get_label(temperatures[position], idx) }}
            </button>
        </div>
    </fieldset>
</template>

<script>

export default {
    props: {
        ds1820_positions: Object,
        temperatures: Object
    },
    methods: {
        get_label(value, idx) {
            let label = (!Number.isNaN(value) && Number.isFinite(value)
                        ) ? Number.parseFloat(value).toFixed(1) : ''
            let alternative = "";
            if (idx === 5) {
                alternative = "out";
            }
            else {
                alternative = idx + 1;
            }
            return (label) ? label : alternative;
        }
    },
    data() {
        return {
            allowed_positions: [
                't_i_1',
                't_i_2',
                't_i_3',
                't_i_4',
                't_i_5',
                't_o'
            ]
        }
    }
}

</script>

<style>

button.unassigned {
    background-color:#ffaaaa;
    border:1px solid #aa3939;
}

button.assigned {
    background-color: #88cc88;
    border:1px solid #2e882e;
}

</style>
