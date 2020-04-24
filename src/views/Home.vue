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
    </div>
</template>

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
