<template>
  <section class="application">
    <v-chat cssClass="application__chat" />
    <v-profit cssClass="application__profit" />
    <div class="application__body">
      <v-image />
      <div class="application__timer">
        <v-timer v-show="serverCanBet" />
        <span v-show="!serverCanBet">Ожидайте</span>
      </div>
      <div class="application__panel">
        <input
          type="text"
          class="application__input neon neon--border neon--text neon--blue"
          @input="inputHandler"
          :value="bettingValue"
        />
        <button
          v-for="c in colors"
          :key="c.name"
          class="btn neon neon--text neon--hover neon--border"
          :disabled="!canBet"
          :class="getButtonClass(c.name)"
          @click="() => setBetColor(c.name)"
        >
          x{{ c.multiply(1) }}
        </button>
      </div>
      <v-wons-history cssClass="application__wons-history" />
    </div>
    <v-user-panel cssClass="application__user-panel" />
    <v-users-bets />
  </section>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import VImage from '../components/v-image.vue';
import VUserPanel from '../components/v-user-panel.vue';
import VWonsHistory from '../components/v-wons-history.vue';
import VTimer from '../components/v-timer.vue';
import VUsersBets from '../components/v-users-bets';
import VProfit from '../components/v-profit';
import VChat from '../components/v-chat';
import {COLORS_DATA} from '../helper/common';

export default {
  data: () => ({
    colors: Object.values(COLORS_DATA)
  }),
  components: {
    VImage,
    VWonsHistory,
    VUserPanel,
    VTimer,
    VUsersBets,
    VProfit,
    VChat
  },
  computed: {
    ...mapGetters({
      bettingValue: 'bet/bettingValue',
      canBet: 'bet/canBet',
      serverCanBet: 'bet/serverCanBet'
    }),
    getButtonClass() {
      return (n2) => {
        if (n2 === 'orange') return 'neon--yellow';
        return `neon--${n2}`;
      };
    }
  },
  methods: {
    ...mapActions({
      setBetValue: 'bet/setBetValue',
      setBetColor: 'sendBet'
    }),
    inputHandler($event) {
      const cleanValue = +$event.target.value.trim().replace(/\D/gi, '');

      this.setBetValue(cleanValue);
    }
  }
};
</script>

<style lang="sass">
.application
  height: 100vh
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  gap: 20px
  box-sizing: border-box
  padding-bottom: 5px
  &__profit
    position: absolute
    left: 5px
    top: 5px
    z-index: 2
  &__chat
    position: absolute
    bottom: 5px
    left: 5px
    z-index: 2
  &__input
    padding: 0.4em 0.8em
    outline: none
    width: 100px
    @apply rounded-xl
  &__body
    display: grid
    grid-template-rows: 1fr 40px
    align-items: center
    justify-items: center
    gap: 20px
  &__panel
    display: flex
    gap: 7px
  &__balance
    color: #ffffff
    font-size: 25px
  &__user-panel
    position: absolute
    top: 10px
    right: 10px
  &__timer
    height: 20px
    font-size: 20px
    color: #ffffff
</style>
