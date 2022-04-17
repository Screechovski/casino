<template>
    <div id="app">
        <router-view />
        <v-alerts />
    </div>
</template>

<script>
import VAlerts from "./components/v-alerts.vue"
export default {
    data:() => ({}),
    components: {
        VAlerts
    },
    computed: {},
    methods: {}
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap");

#app {
    --gray: #6c757d;
    --orange: #ffc107;
    --red: #dc3545;
    --green: #198754;
    --bg: #1e1e1e;
    font-family: Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    height: 100vh;
    background-color: var(--bg);
    position: relative;
}


.my-input {
    background-color: #1e1e1e !important;
    color: #ffffff !important;
}

</style>
