<template>
  <div class="wons-history" :class="cssClass">
    <ul class="wons-history__list">
      <li
        v-for="(item, i) in items"
        :key="i"
        class="wons-history__item"
        :class="getClass(item)"
      ></li>
    </ul>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
  props: {
    cssClass: {
      type: String,
      default: ''
    }
  },
  async mounted() {
    await this.getBets();
  },
  computed: {
    ...mapGetters({
      items: 'wonsHistory'
    }),
    getClass: () => (type) => {
      if (type === 'orange') return `neon neon--border neon--yellow ${type}`;
      return `neon neon--border neon--${type} ${type}`;
    }
  },
  methods: {
    ...mapActions({
      getBets: 'getBets'
    })
  }
};
</script>

<style lang="sass">
.wons-history
  gap: 10px
  @apply flex flex-col my-2
  &__label
    color: #ffffff
    font-size: 25px
  &__list
    display: flex
    align-items: center
    flex-direction: row-reverse
    gap: 8px
    height: 30px
    padding: 5px
    border-radius: 0.55em
  &__item
    width: 16px
    height: 0
    border-radius: 8px
    --borderWidth: 1px !important
    &.red
      height: 20px
    &.gray
      height: 30px
    &.green
      height: 16px
    &.orange
      height: 26px
</style>
