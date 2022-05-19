<template>
    <div class="won-line">
        <div
            class="won-line__track"
            ref="track"
            :class="{ transitionClass, transformClass }">
            <div
                v-for="(c, i) in fakeColors"
                :key="c + i"
                class="won-line__item"
                :class="c + ' ' + i" />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
    computed: {
        ...mapGetters({
            transitionClass: 'spinner/transitionClass',
            transformClass: 'spinner/transformClass',
            fakeColors: 'spinner/colorsArray'
        })
    },
    data:()=>({}),
    mounted(){
        this.$refs.track.addEventListener('transitionend', this.spinningEnd)
    },
    methods: {
        ...mapActions({
            spinningEnd: 'spinningEnd'
        })
    }
}
</script>

<style lang="sass">
$boxCount: 39
$boxWidth: 70px
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
    text-shadow: $sum
    text-shadow: $visibleWidth
    max-width: $viewWidth
    overflow: hidden
    background-color: var(--bg-light)
    position: relative
    padding: $paddingWidth
    border-radius: 29px
    box-sizing: border-box
    &::after
        content: ''
        height: 100%
        width: 2px
        background-color: var(--bg)
        position: absolute
        top: 0
        left: calc(50% - 1px)
    &__track
        display: flex
        gap: $paddingWidth
    &__item
        min-height: 128px
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
</style>