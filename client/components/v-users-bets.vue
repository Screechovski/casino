<template>
  <div class="users-bets">
    <ul class="users-bets__colors-columns colors-columns">
      <li class="colors-columns__item">
        <button
          type="button"
          class="colors-columns__header btn btn-gray"
          @click="() => setBetColor('gray')"
          :disabled="!canBet"
        >
          <span>x2</span>
          <span>
            <s-coin />
            {{ grayBets }}
          </span>
        </button>
        <ul class="bets-column">
          <li v-for="(item, i) in gray" :key="i" class="bets-column__item">
            {{ item.name }} {{ item.bet }}
          </li>
        </ul>
      </li>
      <li class="colors-columns__item">
        <button
          type="button"
          class="colors-columns__header orange btn btn-orange"
          @click="() => setBetColor('orange')"
          :disabled="!canBet"
        >
          <span>x3</span>
          <span>
            <s-coin />
            {{ orangeBets }}
          </span>
        </button>
        <ul class="bets-column">
          <li v-for="(item, i) in orange" :key="i" class="bets-column__item">
            {{ item.name }} {{ item.bet }}
          </li>
        </ul>
      </li>
      <li class="colors-columns__item">
        <button
          type="button"
          class="colors-columns__header red btn btn-red"
          @click="() => setBetColor('red')"
          :disabled="!canBet"
        >
          <span>x5</span>
          <span>
            <s-coin />
            {{ redBets }}
          </span>
        </button>
        <ul class="bets-column">
          <li v-for="(item, i) in red" :key="i" class="bets-column__item">
            {{ item.name }} {{ item.bet }}
          </li>
        </ul>
      </li>
      <li class="colors-columns__item">
        <button
          type="button"
          class="colors-columns__header green btn btn-green"
          @click="() => setBetColor('green')"
          :disabled="!canBet"
        >
          <span>x50</span>
          <span>
            <s-coin />
            {{ greenBets }}
          </span>
        </button>
        <ul class="bets-column">
          <li v-for="(item, i) in green" :key="i" class="bets-column__item">
            {{ item.name }} {{ item.bet }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SCoin from '../svg/s-coin.vue'

export default {
  components: { SCoin },
  computed: {
    ...mapGetters({
      gray: 'usersBets/getGray',
      orange: 'usersBets/getOrange',
      red: 'usersBets/getRed',
      green: 'usersBets/getGreen',
      grayBets: 'usersBets/getGrayBetsSum',
      orangeBets: 'usersBets/getOrangeBetsSum',
      redBets: 'usersBets/getRedBetsSum',
      greenBets: 'usersBets/getGreenBetsSum',
      canBet: 'bet/canBet',
    }),
  },
  methods: mapActions({
    setBetColor: 'sendBet',
  }),
}
</script>

<style lang="sass">

.users-bets
    &__colors-columns

.colors-columns
    display: flex
    gap: 10px
    max-width: 1024px
    &__item
        width: 25%
        min-width: 180px
    &__header
        text-transform: uppercase
        overflow: hidden
        display: flex
        align-items: center
        justify-content: space-between
        margin-bottom: 5px
        width: 100%
        padding: 13px 16px !important
        &.gray
        &.orange
        &.red
        &.green
        span
            &:nth-child(2)
                display: flex
                align-items: center
                .svg
                    margin-right: 5px

.bets-column
    height: 200px
    max-height: 200px
    overflow: auto
    padding: 0px 5px 5px 5px
    gap: 5px
    display: flex
    flex-direction: column
    &::-webkit-scrollbar
        width: 8px
    &::-webkit-scrollbar-track
        background: #f1f1f1
        border-radius: 4px
    &::-webkit-scrollbar-thumb
        background: #888
        border-radius: 4px
    &::-webkit-scrollbar-thumb:hover
        background: #555
    &__item
        padding: 10px
        border-radius: 10px
        background-color: var(--bg-light)
        color: #ffffff
</style>
