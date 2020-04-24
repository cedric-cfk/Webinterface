<template>
    <div>
        <h1>{{ $t('restart.title') }}</h1>

        <p v-html="$t('restart.paragraph')"></p>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    name: 'Restart',
    created() {
        axios.get([
            process.env.VUE_APP_FIPY_URL,
            '/restart'
        ].join(''))
    }
}
</script>
