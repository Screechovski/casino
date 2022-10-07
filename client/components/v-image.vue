<template>
  <div class="won-line bg-blur" :class="{'won-line--loading': !fakeColors.length}">
    <div
      v-show="!!fakeColors.length"
      class="won-line__track"
      ref="track"
      :class="{transitionClass, transformClass}"
    >
      <div
        v-for="(c, i) in fakeColors"
        :key="c + i"
        class="won-line__item"
        :class="c + ' ' + i"
      />
    </div>
    <div v-show="!fakeColors.length" class="won-line__placeholder">
      <div class="won-line-loader">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
  computed: {
    ...mapGetters({
      transitionClass: 'spinner/transitionClass',
      transformClass: 'spinner/transformClass',
      fakeColors: 'spinner/colorsArray'
    })
  },
  data: () => ({}),
  mounted() {
    this.$refs.track.addEventListener('transitionend', this.spinningEnd);
  },
  methods: {
    ...mapActions({
      spinningEnd: 'spinningEnd'
    })
  }
};
</script>

<style lang="sass">
$boxCount: 39
$boxWidth: 70px
$boxHeight: 128px
$paddingWidth: 5px
$boxesInview: 7

$boxesInviewLess: $boxesInview - 1 //const
$boxesInviewMore: $boxesInview + 1 //const
$boxCountLess: $boxCount - 1 //const
$sum: $boxWidth * $boxCount + $paddingWidth * $boxCountLess //const 2920px
$visibleWidth: $boxWidth * $boxesInview + $paddingWidth * $boxesInviewLess //const 520px
$width: -($sum - $visibleWidth) //const -2400px
$viewWidth: $boxWidth * $boxesInview + $boxesInviewMore * $paddingWidth //const 530px

.won-line
  max-width: $viewWidth
  overflow: hidden
  position: relative
  padding: $paddingWidth
  border-radius: 29px
  box-sizing: border-box
  min-height: calc($boxHeight + $paddingWidth * 2)
  height: calc($boxHeight + $paddingWidth * 2)
  &--loading
    &::after
      display: none
  &::after
    content: ''
    height: 100%
    width: 2px
    position: absolute
    top: 0
    left: calc(50% - 1px)
    background: rgb(255,255,255)
    background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 25%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0.7) 75%, rgba(255,255,255,0) 100%)
  &__placeholder
    display: flex
    max-width: $boxHeight
    width: $boxHeight
    justify-content: center
    align-items: center
    height: $boxHeight
  &__track
    display: flex
    gap: $paddingWidth
  &__item
    min-height: $boxHeight
    min-width: $boxWidth
    border-radius: 26px
    &.gray
      background-color: var(--gray)
    &.orange
      background-color: var(--orange)
    &.red
      background-color: var(--red)
    &.green
      background-color: var(--green)

.transitionClass
  transition: transform 5s ease 0s
.transformClass
  transform: translateX(#{$width})

.won-line-loader
  display: inline-block
  position: relative
  width: 80px
  height: 80px
  & div
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite
    transform-origin: 40px 40px
    &:after
      content: " "
      display: block
      position: absolute
      width: 7px
      height: 7px
      border-radius: 50%
      background: #fff
      margin: -4px 0 0 -4
    &:nth-child(1)
      animation-delay: -0.036s
      &:after
        top: 63px
        left: 63px
    &:nth-child(2)
      animation-delay: -0.072s
      &:after
        top: 68px
        left: 56px
    &:nth-child(3)
      animation-delay: -0.108s
      &:after
        top: 71px
        left: 48px
    &:nth-child(4)
      animation-delay: -0.144s
      &:after
        top: 72px
        left: 40px
    &:nth-child(5)
      animation-delay: -0.18s
      &:after
        top: 71px
        left: 32px
    &:nth-child(6)
      animation-delay: -0.216s
      &:after
        top: 68px
        left: 24px
    &:nth-child(7)
      animation-delay: -0.252s
      &:after
        top: 63px
        left: 17px
    &:nth-child(8)
      animation-delay: -0.288s
      &:after
        top: 56px
        left: 12px

@keyframes lds-roller
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)
</style>
