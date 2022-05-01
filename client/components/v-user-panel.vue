<template>
    <div class="user-panel" :class="cssClass">
        <p class="user-panel__line">
            <span>Имя:</span>
            <span>{{ name }}</span>
        </p>
        <p class="user-panel__line">
            <span>Баланс:</span>
            <s-coin />
            <span>{{ balance }}</span>
        </p>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SCoin from "../svg/s-coin"

export default {
    props: {
        cssClass: {
            type: String,
            default: ""
        }
    },
    components: { SCoin },
    computed:{
        ...mapGetters({
            name: 'user/name',
            balance: 'bet/balance'
        }),
    }

}
</script>

<style lang="sass">
.user-panel
    display: flex
    flex-direction: column
    gap: 10px
    background-color: var(--bg-light)
    padding: 10px
    border-radius: 8px
    &__line
        display: flex
        align-items: center
        color: #ffffff
        span
            &:first-child
                margin-right: 10px
        .svg
            margin-right: 5px
</style>