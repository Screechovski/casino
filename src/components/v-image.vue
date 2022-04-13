<template>
    <div class="won" :class="color"></div>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            default: "bg-light"
        }
    }
}
</script>

<style lang="scss">
    .won {
        height: 128px;
        width: 70px;
        border-radius: 26px;
        &.gray {
            background-color: gray;
        }
    }
</style>