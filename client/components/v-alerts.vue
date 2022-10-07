<template>
  <ul class="alerts">
    <li
      v-for="alert in alerts"
      :key="alert.key"
      :class="getClass(alert.type)"
      class="alerts__item"
      @click="() => remove(alert.key)"
    >
      <span class="text">{{ alert.message }}</span>
    </li>
  </ul>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  computed: {
    ...mapGetters({
      alerts: 'alerts/alerts'
    }),
    getClass: () => (type) => {
      return `neon neon--border neon--text neon--${type}`;
    }
  },
  methods: {
    ...mapActions({
      remove: 'alerts/removeAlert'
    })
  }
};
</script>

<style lang="sass">
.alerts
  position: absolute
  bottom: 10px
  left: 10px
  display: flex
  flex-direction: column
  gap: 8px
  z-index: 2
  &__item
    padding: 16px
    border-radius: 12px
    font-size: 16px
    color: #ffffff
    display: flex
    align-items: center
    justify-content: center
    gap: 9px
    width: fit-content
    &.red
      background-color: var(--red)
    &.green
      background-color: var(--green)
    .color
      display: block
      min-height: 19px
      min-width: 19px
      border-radius: 50%
      &.gray
        background-color: var(--gray)
      &.orange
        background-color: var(--orange)
      &.red
        background-color: var(--red)
      &.green
        background-color: var(--green)
</style>
