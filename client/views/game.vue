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
          class="application__input my-input"
          @input="inputHandler"
          :value="bettingValue"
        />
        <button
          v-for="c in colors"
          :key="c.name"
          class="btn"
          :disabled="!canBet"
          :class="'btn-' + c.name"
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
import { mapActions, mapGetters } from 'vuex'
import VImage from '../components/v-image.vue'
import VUserPanel from '../components/v-user-panel.vue'
import VWonsHistory from '../components/v-wons-history.vue'
import VTimer from '../components/v-timer.vue'
import VUsersBets from '../components/v-users-bets'
import VProfit from '../components/v-profit'
import VChat from '../components/v-chat'
import { COLORS_DATA } from '../helper/game-regulations'

export default {
  data: () => ({
    colors: Object.values(COLORS_DATA),
  }),
  components: {
    VImage,
    VWonsHistory,
    VUserPanel,
    VTimer,
    VUsersBets,
    VProfit,
    VChat,
  },
  computed: {
    ...mapGetters({
      bettingValue: 'bet/bettingValue',
      canBet: 'bet/canBet',
      serverCanBet: 'bet/serverCanBet',
    }),
  },
  methods: {
    ...mapActions({
      setBetValue: 'bet/setBetValue',
      setBetColor: 'sendBet',
    }),
    inputHandler($event) {
      const cleanValue = +$event.target.value.trim().replace(/\D/gi, '')

      this.setBetValue(cleanValue)
    },
  },
}
</script>

<style lang="sass">
.application
  height: 100vh
  display: flex
  flex-direction: column
  align-items: center
  justify-content: flex-end
  gap: 70px
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
    border: 1px solid var(--bg-light)
    background-color: var(--bg)
    padding: 0.4em 0.8em
    border-radius: 0.4em
    outline: none
    width: 100px
  &__body
    display: grid
    grid-template-rows: 1fr 40px
    align-items: center
    justify-items: center
    gap: 15px
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
