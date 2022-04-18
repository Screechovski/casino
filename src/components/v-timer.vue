<template>
    <span>
        {{timer}}
    </span>
</template>

<script>
export default {
    data:() => ({
        timer: 15,
        timerInterval: null
    }),
    computed: {},
    methods: {
        incrementTimer(){
            if (this.timer > 0) {
                this.timer--;
            }
        }
    },
    mounted(){
        setInterval(this.incrementTimer, 1000);
    },
}
</script>

<style lang="scss">
</style>