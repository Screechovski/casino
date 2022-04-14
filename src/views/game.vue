<template>
    <div class="application">
        <div class="application__body">
            <v-image :color="betColor"/>
            <div class="application__panel">
                <input
                    type="text"
                    class="form-control application__input my-input"
                    @input="inputHandler"
                    :value="betValue"
                >
                <button
                    class="btn btn-secondary"
                    :class="{disabled: !canBet}"
                    @click="() => setBetColor(COLORS[0])"
                >x2</button>
                <button
                    class="btn btn-warning"
                    :class="{disabled: !canBet}"
                    @click="() => setBetColor(COLORS[1])"
                >x3</button>
                <button
                    class="btn btn-danger"
                    :class="{disabled: !canBet}"
                    @click="() => setBetColor(COLORS[2])"
                >x5</button>
                <button
                    class="btn btn-success"
                    :class="{disabled: !canBet}"
                    @click="() => setBetColor(COLORS[3])"
                >x50</button>
            </div>
            <div
                class="spinner-border text-primary"
                role="status"
            />
        </div>
        <v-user-panel
            cssClass="application__user-panel"
        />
        <!-- <v-wons-history
            cssClass="application__wons-history"
        /> -->
        <!-- <v-bets-history
            cssClass="application__bets-history"
        /> -->
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import VBetsHistory from '../components/v-bets-history.vue';
import VImage from "../components/v-image.vue"
import VUserPanel from '../components/v-user-panel.vue';
import VWonsHistory from '../components/v-wons-history.vue';
import { COLORS, result } from '../constants';
// import { getValue, getColor, saveToLocalStorage, getFromLocalStorage } from "../helper";
// const state = {
//     buttonLoading: false,
//     color: "bg-light",
//     wonsHistory: getFromLocalStorage("wonsHistory") ?? [],
//     betsHistory: getFromLocalStorage("betsHistory") ?? [],
//     betValue: 0,
//     betColor: null,
//     balance: getFromLocalStorage("balance") ?? 1000,
//     colors: COLORS
// };
export default {
    data:() => ({}),
    components: {
        VImage,
        VWonsHistory,
        VBetsHistory,
        VUserPanel
    },
    computed: {
        ...mapGetters({
            canBet: 'user/canBet',
            betValue: 'user/betValue',
            betColor: 'user/betColor',
        })
    },
    methods: {
        ...mapActions({
            setBetValue: 'user/setBetValue',
            setBetColor: 'user/setBetColor'
        }),
        inputHandler($event){
            const cleanValue = +$event.target.value.trim().replace(/\D/gi, "");

            this.setBetValue(cleanValue > this.balance ? this.balance : cleanValue);
        }
    }
}
</script>

<style lang="scss" scoped>
.application {
    &__body {
        display: grid;
        grid-template-rows: 1fr 40px;
        align-items: center;
        justify-items: center;
        gap: 15px;
    }
    &__panel {
        display: flex;
        gap: 7px;
    }
    &__input {}
    &__balance {
        color: #ffffff;
        font-size: 25px;
    }
    &__wons-history {
        position: absolute;
        top: 10px;
        left: 10px;
    }
    &__bets-history {
        position: absolute;
        top: 90px;
        left: 10px;
    }
    &__user-panel {
        position: absolute;
        top: 10px;
        right: 10px;
    }
}
</style>
