<template>
    <div id="app" class="application">
        <div class="application__body">
            <v-image :color="color"/>
            <div class="application__panel" v-if="!buttonLoading">
                <input
                    type="text"
                    class="form-control application__input"
                    @input="inputHandler"
                    :value="betValue"
                >
                <button
                    class="btn btn-secondary"
                    :class="{disabled: !canBet}"
                    @click="() => startButtonClick(colors[0])"
                >x2</button>
                <button
                    class="btn btn-warning"
                    :class="{disabled: !canBet}"
                    @click="() => startButtonClick(colors[1])"
                >x3</button>
                <button
                    class="btn btn-danger"
                    :class="{disabled: !canBet}"
                    @click="() => startButtonClick(colors[2])"
                >x5</button>
                <button
                    class="btn btn-success"
                    :class="{disabled: !canBet}"
                    @click="() => startButtonClick(colors[3])"
                >x50</button>
            </div>
            <div
                v-else
                class="spinner-border text-primary"
                role="status"
            />
            <p class="application__balance">Баланс: {{balance}}</p>
        </div>
        <v-wons-history
            :items="wonsHistory"
            cssClass="application__wons-history"
        />
        <v-bets-history
            :items="betsHistory"
            cssClass="application__bets-history"
        />
    </div>
</template>

<script>
import VBetsHistory from './components/v-bets-history.vue';
import VImage from "./components/v-image.vue"
import VWonsHistory from './components/v-wons-history.vue';
import { COLORS, result } from './constants';
import { getValue, getColor, saveToLocalStorage, getFromLocalStorage } from "./helper";

export default {
    element: "#app",
    data:() => ({
        buttonLoading: false,
        color: "bg-light",
        wonsHistory: getFromLocalStorage("wonsHistory") ?? [],
        betsHistory: getFromLocalStorage("betsHistory") ?? [],
        betValue: 0,
        betColor: null,
        balance: getFromLocalStorage("balance") ?? 1000,
        colors: COLORS
    }),
    components: {
        VImage,
        VWonsHistory,
        VBetsHistory
    },
    computed: {
        canBet(){
            return this.balance >= this.betValue && this.betValue >= 1;
        }
    },
    methods: {
        cleanItems(array){
            if (array.length > 25) {
                return array.slice(Math.max(array.length - 25, 1))
            }
            return array;
        },
        async startButtonClick(argumentColor) {
            if (this.canBet){
                this.buttonLoading = true;
                this.betColor = argumentColor;

                const color = await this.serverQuery();
                if (color === argumentColor) {
                    const value = result()[color](this.betValue);
                    const balance = this.balance + value
                    const betsHistory = this.cleanItems([...this.betsHistory, {
                        color,
                        result: true,
                        value,
                    }]);
                    this.betsHistory = betsHistory;
                    this.balance = balance;
                    saveToLocalStorage("balance", balance);
                    saveToLocalStorage("betsHistory", betsHistory);
                } else {
                    const balance = this.balance - this.betValue;
                    const betsHistory = this.cleanItems([...this.betsHistory, {
                        color,
                        result: false,
                        value: this.betValue,
                    }]);
                    this.betsHistory = betsHistory;
                    this.balance = balance;
                    saveToLocalStorage("balance", balance);
                    saveToLocalStorage("betsHistory", betsHistory);
                }
                const wonsHistory = this.cleanItems([...this.wonsHistory, color]);
                this.wonsHistory = wonsHistory;
                saveToLocalStorage("wonsHistory", wonsHistory);

                this.color = color;
                this.buttonLoading = false;
            }
        },
        serverQuery() {
            return new Promise(reject => {
                setTimeout(() => {
                    reject(getColor(getValue()));
                }, 500)
            })
        },
        inputHandler($event){
            const cleanValue = +$event.target.value.trim().replace(/\D/gi, "");

            if (cleanValue > this.balance) {
                this.betValue = this.balance;
            } else {
                this.betValue = cleanValue;
            }
            this.$forceUpdate();
        }
    }
}
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap");

:root {}

#app {
    font-family: Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
    height: 100vh;
    background-color: #1e1e1e;
    position: relative;
}
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
    &__input {
        background-color: #1e1e1e !important;
        color: #ffffff !important;
    }
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
}
</style>
