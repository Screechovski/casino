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
                :class="c" />
        </div>
    </div>
</template>

<script>
import { getColor, getValue } from '../helper/game-regulations';
import { mapGetters, mapActions } from "vuex";

export default {
    computed: {
        ...mapGetters({
            transitionClass: 'spinner/transitionClass',
            transformClass: 'spinner/transformClass',
            fakeColors: 'spinner/colorsArray'
        })
    },
    data:()=>({}),
    props: {
        color: {
            type: String,
            default: "bg-light"
        }
    },
    mounted(){
        // this.$refs.track.addEventListener('transitionend', this.resetSpinner)
    },
    methods: {
        ...mapActions({
            resetSpinner: 'spinner/resetSpinner'
        })
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

    .transitionClass {
        transition: transform 5s ease 0s;
    }
    .transformClass {
        transform: translateX(-2400px);
    }
</style>