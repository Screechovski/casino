<template>
  <span class="profit" :class="{[cssClass]: cssClass}"> Профит казино: {{ casinoProfit }} </span>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  props: {
    cssClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({
      casinoProfit: 'getCasinoProfit'
    })
  }
};
</script>

<style lang="sass">

.profit
  font-size: 12px
  color: #fff
</style>
