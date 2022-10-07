<template>
  <div class="users-bets">
    <ul class="users-bets__colors-columns colors-columns">
      <li class="colors-columns__item">
        <button
          type="button"
          class="colors-columns__header neon neon--border neon--text neon--hover"
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
          <li
            v-for="(item, i) in gray"
            :key="i"
            class="neon neon--text bets-column__item"
          >
            <span>{{ item.name }}</span>
            <span>{{ item.bet }}</span>
          </li>
        </ul>
      </li>
      <li class="colors-columns__item">
        <button
          type="button"
          class="colors-columns__header neon neon--border neon--text neon--hover neon--yellow"
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
          <li
            v-for="(item, i) in orange"
            :key="i"
            class="neon neon--text bets-column__item"
          >
            <span>{{ item.name }}</span>
            <span>{{ item.bet }}</span>
          </li>
        </ul>
      </li>
      <li class="colors-columns__item">
        <button
          type="button"
          class="colors-columns__header neon neon--border neon--text neon--hover neon--red"
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
          <li v-for="(item, i) in red" :key="i" class="neon neon--text bets-column__item">
            <span>{{ item.name }}</span>
            <span>{{ item.bet }}</span>
          </li>
        </ul>
      </li>
      <li class="colors-columns__item">
        <button
          type="button"
          class="colors-columns__header neon neon--border neon--text neon--hover neon--green"
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
          <li
            v-for="(item, i) in green"
            :key="i"
            class="neon neon--text bets-column__item"
          >
            <span>{{ item.name }}</span>
            <span>{{ item.bet }}</span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import SCoin from '../svg/s-coin.vue';

export default {
  components: {SCoin},
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
      canBet: 'bet/canBet'
    })
  },
  methods: mapActions({
    setBetColor: 'sendBet'
  })
};
</script>

<style lang="sass">
.colors-columns
  display: flex
  gap: 10px
  max-width: 1024px
  &__item
    width: 25%
    min-width: 180px
  &__header
    margin-bottom: 5px
    @apply uppercase overflow-hidden flex items-center justify-between w-full rounded-xl h-12 px-4
    span
      &:nth-child(2)
        display: flex
        align-items: center
        .svg
          margin-right: 5px

.bets-column
  max-height: 118px
  min-height: 118px
  padding: 0 5px 5px 5px
  @apply flex flex-col gap-1 overflow-auto
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
    @apply flex justify-between py-2
</style>
