<template>
    <div class="application">
        <div class="application__body">
            <v-image :color="color" />
            <div class="application__panel" v-if="!loading">
                <input
                    type="text"
                    class="form-control application__input my-input"
                    @input="inputHandler"
                    :value="betValue"
                >
                <button
                    v-for="c in colors"
                    :key="c.name"
                    class="btn"
                    :disabled="!canBet"
                    :class="'btn-' + c.name"
                    @click="() => setBetColor(c.name)"
                >
                x{{c.multiply(1)}}
                </button>
            </div>
            <div
                v-else
                class="spinner-border text-primary"
                role="status"
            />
            <v-wons-history
                cssClass="application__wons-history"
            />
        </div>
        <v-user-panel
            cssClass="application__user-panel"
        />
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import VImage from "../components/v-image.vue"
import VUserPanel from '../components/v-user-panel.vue';
import VWonsHistory from '../components/v-wons-history.vue';
import { COLORS_DATA } from '../helper/game-regulations';

export default {
    data:() => ({
        colors: Object.values(COLORS_DATA)
    }),
    components: {
        VImage,
        VWonsHistory,
        VUserPanel
    },
    computed: {
        ...mapGetters({
            canBet: 'canBet',
            betValue: 'betValue',
            betColor: 'betColor',
            loading: 'betLoading',
            color: 'wonColor',
        })
    },
    methods: {
        ...mapActions({
            setBetValue: 'setBetValue',
            setBetColor: 'setBetColor',
            login: 'login',
        }),
        inputHandler($event){
            const cleanValue = +$event.target.value.trim().replace(/\D/gi, "");

            this.setBetValue(cleanValue);
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
        .btn {
            color: #ffffff;
            &-gray {
                background-color: var(--gray);
            }
            &-orange {
                background-color: var(--orange);
                color: #000000;
            }
            &-red {
                background-color: var(--red);
            }
            &-green {
                background-color: var(--green);
            }
        }
    }

    &__input {}

    &__balance {
        color: #ffffff;
        font-size: 25px;
    }

    &__user-panel {
        position: absolute;
        top: 10px;
        right: 10px;
    }
}
</style>
