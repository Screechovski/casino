<template>
    <div class="wons-history" :class="cssClass">
        <p class="wons-history__label">История игр:</p>
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
export default {
    props: {
        items: {
            type: Array,
            default: []
        },
        cssClass: {
            type: String,
            default: ""
        }
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
        gap: 5px;
        height: 30px;
    }
    &__item {
        height: 30px;
        width: 15px;
        border-radius: 4px;
    }
}
</style>