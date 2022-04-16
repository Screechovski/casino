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
</style>