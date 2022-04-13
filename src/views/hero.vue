<template>
    <div class="hero">
        <div class="hero__loader" v-show="user === null">
            <div
                class="spinner-border text-primary"
                role="status"
            />
        </div>
        <form class="hero__form" v-show="user === 'none'" @submit.prevent="sendForm">
            <input
                type="text"
                class="form-control"
                :value="userName"
                @input="inputNameHandler"
            >
            <button
                class="btn btn-success"
                :class="{disabled: !canSend}"
            >Отправить</button>
        </form>
    </div>
</template>

<script>

export default {
    data: () => ({
        user: null,
        userName: "",
        balance: 0,
    }),
    async mounted(){
        const checkResult = await this.check()

        console.log(1, checkResult.user === null);

        if (checkResult.data.user === null) {
            this.user = "none";
        }
    },
    computed: {
        canSend(){
            return this.userName.length > 4;
        }
    },
    methods: {
        async check(){
            const data = await fetch("/check");
            return await data.json();
        },
        async register(){
            const data = await fetch("/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: this.userName
                })
            });
            return await data.json();
        },
        inputNameHandler($event){
            this.userName = $event.target.value.trim().replace(/[^а-яa-z ]/gi, "");
        },
        async sendForm(){
            if (this.canSend) {
                const registerResult = await this.register();
                this.userName = registerResult.data.userName;
                this.balance = registerResult.data.balance;
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.hero {

}
</style>
