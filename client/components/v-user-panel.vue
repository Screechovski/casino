<template>
  <div class="user-panel neon neon--border neon--text" :class="cssClass">
    <p class="user-panel__line">
      <span>Имя:</span>
      <span>{{ name }}</span>
    </p>
    <p class="user-panel__line">
      <span>Баланс:</span>
      <s-coin />
      <span>{{ balance }}</span>
      <button class="neon neon--icon neon--border neon--hover" @click="toggleOpened">
        <s-minus v-if="promoOpened" />
        <s-plus v-else />
      </button>
    </p>
    <input
      v-if="promoOpened"
      :value="promo"
      @input.prevent="setPromo"
      class="neon neon--border neon--text neon--blue user-panel__input"
      type="text"
      :disabled="promoDisabled"
    />
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import SCoin from '../svg/s-coin';
import SPlus from '../svg/s-plus';
import SMinus from '../svg/s-minus';
import {validationRules} from '../../config';

export default {
  data: () => ({
    promoOpened: false
  }),
  props: {
    cssClass: {
      type: String,
      default: ''
    }
  },
  components: {SCoin, SPlus, SMinus},
  computed: {
    ...mapGetters({
      name: 'user/name',
      balance: 'bet/balance',
      promo: 'user/promo',
      promoDisabled: 'user/promoDisabled'
    })
  },
  methods: {
    ...mapActions({
      setPromo: 'user/setPromo',
      sendPromo: 'user/sendPromo'
    }),
    toggleOpened() {
      this.promoOpened = !this.promoOpened;
    }
  },
  watch: {
    promo() {
      if (this.promo.length === validationRules.promo.min) {
        this.sendPromo();
      }
    }
  }
};
</script>

<style lang="sass">
.user-panel
  display: flex
  flex-direction: column
  gap: 10px
  padding: 10px
  border-radius: 8px
  &__line
    display: flex
    align-items: center
    color: #ffffff
    gap: 6px
    button
      height: 24px
      width: 24px
      @apply rounded-xl flex items-center justify-center
      svg
        height: 50%
        width: 50%
  &__input
    padding: 0.4em 0.8em
    width: 118px
    @apply lowercase rounded-xl outline-none
</style>
