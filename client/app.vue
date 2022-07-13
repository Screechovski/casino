<template>
    <router-view />
    <v-alerts />
</template>

<script>
import VAlerts from "./components/v-alerts.vue"
export default {
    data:() => ({

    }),
    components: {
        VAlerts
    },
    computed: {},
    methods: {}
}
</script>

<style lang="sass">
#app
    --gray: #6c757d
    --orange: #ffc107
    --red: #dc3545
    --green: #198754
    --bg: #1e1e1e
    --bg-light: #4d4d4d
    font-family: Roboto, sans-serif
    height: 100vh
    background-color: var(--bg)
    position: relative
    overflow: hidden

.btn
    color: #ffffff
    border: none
    border-radius: 0.4em
    padding: 0.4em 0.8em
    cursor: pointer
    &:disabled
        opacity: 0.8
        cursor: default
    &:active
        transform: scale(0.97)
    &-gray
        background-color: var(--gray)
    &-orange
        background-color: var(--orange)
        color: #000000
    &-red
        background-color: var(--red)
    &-green
        background-color: var(--green)

.my-input
    background-color: #1e1e1e !important
    color: #ffffff !important
</style>
