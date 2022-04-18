<template>
    <ul class="alerts">
        <li
            v-for="alert in alerts"
            :key="alert.key"
            :class="getClass(alert.isWin)"
            class="alerts__item"
            @click="() => remove(alert.key)"
        >
            <span class="text">{{getText(alert.isWin, alert.text)}}</span>
            <span class="color" :class="alert.color" />
        </li>
    </ul>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    computed: {
        ...mapGetters({
            alerts: 'alerts/alerts'
        }),
        getClass: () => (flag) => flag ? "success" : "error",
        getText: () => (flag, value) => `Вы ${flag ? 'выиграли' : 'проиграли'} ${Math.abs(+value)} поставив на `
    },
    methods: {
        ...mapActions({
            remove: 'alerts/removeAlert'
        })
    }
}
</script>

<style lang="scss">
.alerts {
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    &__item {
        padding: 16px;
        border-radius: 12px;
        font-size: 16px;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 9px;
        &.success {
            background-color: #4caf50;
        }
        &.error {
            background-color: #ff5252;
        }
        .color {
            display: block;
            min-height: 19px;
            min-width: 19px;
            border-radius: 50%;
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
}
</style>