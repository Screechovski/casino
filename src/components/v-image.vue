<template>
    <div class="won-line">
        <div class="won-line__track" ref="track">
            <div
                v-for="(c, i) in fakeColors"
                :data-n="i"
                :key="c + i"
                class="won-line__item"
                :class="c" />
        </div>
    </div>
</template>

<script>
import { getColor, getValue } from '../helper/game-regulations';

const fakeFirstHalf = [];
const fakeLastHalf = [];
for (let i = 0; i < 35; i++) {
   fakeFirstHalf.push(getColor(getValue()))
}
for (let i = 0; i < 5; i++) {
   fakeLastHalf.push(getColor(getValue()))
}

export default {
    computed: {
        fakeColors(){
            return [...fakeFirstHalf, this.color, ...fakeLastHalf]
        }
    },
    data:()=>({
        animatedStart: false,
        animated: false,
        animatedEnd: false,
    }),
    props: {
        color: {
            type: String,
            default: "bg-light"
        }
    },
    updated(){
        this.$refs.track.style.transform = "translateX(-2400px)";
    }
}
</script>

<style lang="scss" scoped>
    .won-line {
        max-width: 530px;
        overflow: hidden;
        background-color: rgb(77, 77, 77);
        position: relative;
        padding: 5px;
        border-radius: 29px;
        &::after {
            content: '';
            height: 100%;
            width: 2px;
            background-color: var(--bg);
            position: absolute;
            top: 0;
            left: calc(50% - 1px);
        }
        &__track {
            display: flex;
            gap: 5px;
            // transform: translateX(-2400px);
            transition: transform 5s ease 0s;
        }
        &__item {
            min-height: 128px;
            min-width: 70px;
            border-radius: 26px;
            &.gray {
                background-color: var(--gray);
            }
            &.orange {
                background-color: var(--orange);
            }
            &.red {
                background-color: var(--red);
            }
            &.green {
                background-color: var(--green);
            }
        }
    }
</style>