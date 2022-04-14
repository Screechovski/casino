<template>
    <div class="hero">
        <div class="hero__loader" v-show="user === null"> <!-- user === null -->
            <div
                class="spinner-border text-primary"
                role="status"
            />
        </div>

        <form class="hero__form" v-show="user === false" @submit.prevent="sendName"> <!-- user === false -->
            <label for="user-name">Введите ваше имя</label>
            <div>
                <input
                    id="user-name"
                    type="text"
                    class="form-control my-input"
                    :value="name"
                    @input="inputNameHandler"
                >
                <button
                    class="btn btn-success"
                >Отправить</button>
            </div>
        </form>

        <router-link v-show="user === true" to="/game">Начать игру</router-link>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({}),
    async mounted(){
        await this.login();
    },
    computed: {
        ...mapGetters({
            name: 'user/name',
            user: 'user/isUser',
            balance: 'user/balance'
        }),
        canSend(){
            return this.name.length > 4;
        }
    },
    methods: {
        ...mapActions({
            check: 'user/check',
            register: 'user/register',
            login: 'user/login',
            setName: 'user/setName',
            sendName: 'user/sendName'
        }),
        inputNameHandler($event){
            this.setName($event.target.value.replace(/[^a-zа-я]/gi, ""))
        },
    }
}
</script>


<style lang="scss" scoped>
.hero {
    &__form {
        display: flex;
        flex-direction: column;
        gap: 7px;
        label {
            color: #fff;
        }
        div {
            display: flex;
            gap: 15px;
        }
    }
}
</style>
