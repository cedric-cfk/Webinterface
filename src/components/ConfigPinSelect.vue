<template>
    <select :value="value"
            @input="$emit('input', $event.target.value)">
        <option v-for="pin in allowed_pins"
                :key="pin"
                :value="pin">
            {{ pin }}
        </option>
    </select>
</template>
    
<script>
export default {
    name: 'ConfigPinSelect',
    props: {
        value: String
    },
    data() {
        return {
            allowed_pins: [
                'P2',
                'P3',
                'P9',
                'P10',
                'P11',
                'P21',
                'P22'
            ]
        }
    }
}
</script>

<style>

</style>
