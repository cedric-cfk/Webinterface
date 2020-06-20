<template>
    <div class="home">
        <h1>{{ $t('home.welcome') }}!</h1>

        <h3>
            <router-link :to="'/' + $i18n.locale + '/config/general'">
                {{ $t('home.config') }}
            </router-link>
        </h3>

        <h3>{{ $t('home.networking') }}</h3>
        <ul>
            <li>
                <router-link :to="'/' + $i18n.locale + '/networking/ap'">
                    {{ $t('home.ap') }}
                </router-link>
            </li>
            <li>
                <router-link :to="'/' + $i18n.locale + '/networking/wlan'">
                    {{ $t('home.wlan') }}
                </router-link>
            </li>
        </ul>
        <h3>{{ $t('home.sensors') }}</h3>
        <ul>
            <li>
                <router-link :to="'/' + $i18n.locale + '/sensors/test'">
                    {{ $t('home.test') }}
                </router-link>
            </li>
            <li>
                <router-link :to="'/' + $i18n.locale + '/sensors/ds1820'">
                    {{ $t('home.ds1820') }}
                </router-link>
            </li>
            <li>
                <router-link :to="'/' + $i18n.locale + '/sensors/hx711'">
                    {{ $t('home.hx711') }}
                </router-link>
            </li>
            <li>
                <router-link :to="'/' + $i18n.locale + '/sensors/bme280'">
                    {{ $t('home.bm280') }}
                </router-link>
            </li>
        </ul>

        <h3>{{ $t('home.telemetry') }}</h3>
        <ul>
            <li>
                <router-link :to="'/' + $i18n.locale + '/telemetry/beep'">
                    {{ $t('home.beep') }}
                </router-link>
            </li>
        </ul>

        <h3>{{ $t('home.system') }}</h3>
        <ul>
            <li>
                <router-link :to="'/' + $i18n.locale + '/restart'">
                    {{ $t('home.restart') }}
                </router-link>
            </li>
            <li>
                <router-link :to="'/' + $i18n.locale + '/log'">
                    {{ $t('home.log') }}
                </router-link>
            </li>
        </ul>

        <div>
          <label for="switch_language">{{ $t('general_config.select_language') }}:</label>
          <br>
          <select v-model="$i18n.locale" @change="onLangChange($event)">
            <option
                v-for="(lang, i) in langs"
                :key="`Lang${i}`"
                :value="lang">
              {{ lang }}
            </option>
          </select>
        </div>
    </div>
</template>

<script>
import { i18n } from '../main.js'

export default {
    name: 'GeneralConfig',
    data() {
        return {
            langs: ['de', 'en']
        }
    },
    methods: {
        onLangChange(event) {
            console.log("Language changed to " + event.target.value)
            this.$router.push('/' + i18n.locale + '/home')
        }
    }
}
</script>

<style>

.home ul {
    padding: 0;
    margin: auto;
}

.home li {
    list-style-type: none;
    padding: 2vmin;
    display: block;

}
</style>
