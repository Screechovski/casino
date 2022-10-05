<template>
  <ul class="alerts">
    <li
      v-for="alert in alerts"
      :key="alert.key"
      :class="alert.type"
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
    })
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
  &__item
    padding: 16px
    border-radius: 12px
    font-size: 16px
    color: #fff
    display: flex
    align-items: center
    justify-content: center
    gap: 9px
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
