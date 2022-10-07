<template>
  <router-view />
  <v-alerts />
</template>

<script>
import VAlerts from './components/v-alerts.vue';
export default {
  data: () => ({}),
  components: {
    VAlerts
  },
  computed: {},
  methods: {}
};
</script>

<style lang="sass">
#app
  --gray: #5c5c5c
  --orange: #fdad00
  --red: #ff0000
  --green: #00914e
  --bg: rgba(255,255,255,0.33)
  //#1e1e1e
  --bg-light: rgba(255,255,255,0.33)
  //#4d4d4d
  --bg-dark: #ffffff
  //#141414
  --text-dark: #181818
  --text: #363636
  --text-light: #838383
  font-family: 'Nunito', sans-serif
  height: 100vh
  position: relative
  overflow: hidden

.btn
  border: none
  border-radius: 0.55em
  padding: 0.4em 0.8em
  cursor: pointer
  &:disabled
    opacity: 0.8
    cursor: default
  &:active
    transform: scale(0.97)
  &-gray
    background-color: transparent
    border: 2px solid var(--gray)
    color: var(--gray)
  &-orange
    background-color: transparent
    border: 2px solid var(--orange)
    color: var(--orange)
  &-red
    background-color: transparent
    border: 2px solid var(--red)
    color: var(--red)
  &-green
    background-color: transparent
    border: 2px solid var(--green)
    color: var(--green)

.my-input
  background-color: transparent
  color: #ffffff
  outline: none
  border: 2px solid #ffffff
  padding: 0.4em
  border-radius: 0.55em
  &:focus
    background-color: hsla(0, 0%, 0%, 0.1)

.my-button
  color: #ffffff
  outline: none
  border: 2px solid #ffffff
  padding: 0.4em
  background-color: hsla(0, 0%, 100%, 0.2)
  border-radius: 0.55em
  &--hover
    cursor: pointer
    &:hover
      background-color: hsla(0,0%,100%,0)

.bg
  &-blur
    background-color: hsla(0,0%,100%,0.13)
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1)
    &--hover
      cursor: pointer
      &:hover
        background-color: hsla(0,0%,100%,0)

  &-gradient
    background-color: #74EBD5
    background-image: linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)

.neon-text
  color: #fff
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa, 0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa
</style>
