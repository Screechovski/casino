<template>
    <div class="wons-history" :class="cssClass">
        <ul class="wons-history__list">
            <li
                v-for="(item, i) in items"
                :key="i"
                class="wons-history__item"
                :class="item"
            ></li>
        </ul>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    props: {
        cssClass: {
            type: String,
            default: ""
        }
    },
    async mounted(){
        await this.getBets();
    },
    computed:{
        ...mapGetters({
            items: 'wonsHistory'
        })
    },
    methods: {
        ...mapActions({
            getBets: 'getBets'
        })
    }
}
</script>

<style lang="scss">
.wons-history {
    display: flex;
    flex-direction: column;
    gap: 10px;
    &__label {
        color: #ffffff;
        font-size: 25px;
    }

    &__list {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        gap: 5px;
        height: 30px;
    }

    &__item {
        width: 10px;
        height: 0;
        border-radius: 4px;
        &.red {
            background-color: var(--red);
            height: 20px;
        }
        &.gray {
            background-color: var(--gray);
            height: 30px;
        }
        &.green {
            background-color: var(--green);
            height: 15px;
        }
        &.orange {
            background-color: var(--orange);
            height: 25px;
        }
    }
}
</style>