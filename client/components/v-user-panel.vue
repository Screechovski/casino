<template>
  <div class="user-panel bg-blur" :class="cssClass">
    <p class="user-panel__line">
      <span>Имя:</span>
      <span>{{ name }}</span>
    </p>
    <p class="user-panel__line">
      <span>Баланс:</span>
      <s-coin />
      <span>{{ balance }}</span>
      <button class="bg-blur bg-blur--hover" @click="toggleOpened">
        <s-minus v-if="promoOpened" />
        <s-plus v-else />
      </button>
    </p>
    <input
      v-if="promoOpened"
      :value="promo"
      @input.prevent="setPromo"
      class="my-input user-panel__input"
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
      display: flex
      align-items: center
      justify-content: center
      border: none
      border-radius: 5px
      cursor: pointer
      svg
        height: 70%
        width: 70%
        fill: var(--bg-dark)
  &__input
    border: none
    padding: 0.4em 0.8em
    border-radius: 0.55em
    width: 118px
    text-transform: uppercase
</style>
