<template>
    <div class="user-panel" :class="cssClass">
        <p class="user-panel__line">Имя: {{ name }}</p>
        <p class="user-panel__line">Баланс: {{ balance }}</p>
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
    computed:{
        ...mapGetters({
            name: 'name',
            balance: 'balance'
        }),
    }

}
</script>

<style lang="scss">
.user-panel {
    display: flex;
    flex-direction: column;
    gap: 10px;
    &__line {
        color: #ffffff;
    }
}
</style>