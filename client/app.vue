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
@tailwind base
@tailwind components
@tailwind utilities

#app
  background-color: black
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

.neon
  --blurTextColor: 0.65em
  --blurTextWhite: 0.1em
  --color: white
  --blurBorderColor: 0.65em
  --blurBorderWhite: 0.1em
  --borderWidth: 2px
  filter: saturate(60%)
  font-weight: 200
  &--text
    color: #fff
    text-shadow: 0 0 var(--blurTextColor) var(--color),0 0 var(--blurTextColor) var(--color), 0 0 var(--blurTextColor) var(--color), 0 0 var(--blurTextColor) var(--color), 0 0 var(--blurTextColor) var(--color), 0 0 var(--blurTextWhite) white, 0 0 var(--blurTextWhite) white, 0 0 var(--blurTextWhite) white, 0 0 var(--blurTextWhite) white
  &--border
    background-color: transparent
    border: var(--borderWidth) solid #fff
    box-shadow: 0 0 var(--blurBorderColor) var(--color), 0 0 var(--blurBorderWhite) white, inset 0 0 var(--blurBorderColor) var(--color), inset 0 0 var(--blurBorderWhite) white
  &--solid
    background-color: var(--color)
    box-shadow: 0 0 var(--blurBorderColor) var(--color), 0 0 var(--blurBorderWhite) white, inset 0 0 var(--blurBorderColor) var(--color), inset 0 0 var(--blurBorderWhite) white
  &--icon
    svg
      fill: #fff
      filter: drop-shadow(0 0 var(--blurTextColor) var(--color))
      //, drop-shadow(0 0 var(--blurTextColor) var(--color)),drop-shadow(0 0 var(--blurTextColor) var(--color)), drop-shadow(0 0 var(--blurTextColor) var(--color)),drop-shadow(0 0 var(--blurTextColor) var(--color)),drop-shadow(0 0 var(--blurTextWhite) white),drop-shadow(0 0 var(--blurTextWhite) white)
  &--red
    --color: red
  &--green
    --color: lime
  &--blue
    --color: #3668ff
    --blurTextColor: 0.85em
    --blurBorderColor: 0.85em
  &--yellow
    --color: yellow
  &--pink
    --color: #ff00f2
  &--hover:not(:disabled)
    cursor: pointer
    &:hover
      --blurTextColor: 0.85em
      --blurTextWhite: 0.2em
      --blurBorderColor: 0.85em
      --blurBorderWhite: 0.2em
</style>
