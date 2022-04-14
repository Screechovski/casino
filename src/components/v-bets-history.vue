<template>
    <div class="bets-history" :class="cssClass">
        <p class="bets-history__label">История ставок:</p>
        <ul class="bets-history__list">
            <li
                v-for="(item, i) in betsHistory"
                :key="i"
                class="bets-history__item"

            >
                <span
                    class="result"
                    :class="{'text-danger': !item.result, 'text-success': item.result}"
                >{{item.result ? "W" : "L"}}</span>
                <span
                    :class="item.color"
                    class="color"
                />
                <span
                    class="value"
                >{{item.value}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: {
        cssClass: {
            type: String,
            default: ""
        }
    },
    computed: {
        ...mapGetters({
            betsHistory: 'user/betsHistory'
        }),
    }
}
</script>

<style lang="scss">
.bets-history {
    display: flex;
    flex-direction: column;
    gap: 10px;
    &__label {
        color: #ffffff;
        font-size: 25px;
    }
    &__list {
        display: flex;
        gap: 5px;
    }
    &__item {
        display: flex;
        flex-direction: column;
        gap: 5px;
        align-items: center;
        .color {
            height: 30px;
            width: 15px;
            border-radius: 4px;
        }
        .value {
            color: #ffffff;
        }
    }
}
</style>