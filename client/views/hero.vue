<template>
  <section class="hero">
    <div class="hero__loader" v-show="user === null">
      <!-- user === null -->
      <div class="spinner-border text-primary" role="status" />
    </div>

    <form class="hero__form" v-show="user === false" @submit.prevent="sendName">
      <!-- user === false -->
      <label for="user-name">Как тебя звать, солдат?</label>
      <div>
        <input
          id="user-name"
          type="text"
          class="my-input hero__input"
          :value="name"
          @input="inputNameHandler"
        />
        <button
          @mouseenter="mouseEnterHandler"
          @mouseleave="mouseLeaveHandler"
          class="btn btn-green hero__button"
        >
          Send
        </button>
      </div>
    </form>

    <!-- <router-link v-show="user === true" to="/game">Начать игру</router-link> -->
  </section>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  data: () => ({
    buttonHovered: false
  }),
  computed: {
    ...mapGetters({
      name: 'user/name',
      user: 'user/isUser',
      balance: 'user/balance'
    }),
    canSend() {
      return this.name.length > 4;
    }
  },
  methods: {
    ...mapActions({
      check: 'check',
      register: 'register',
      login: 'login',
      setName: 'user/setName',
      sendName: 'user/sendName'
    }),
    mouseEnterHandler() {
      this.buttonHovered = true;
    },
    mouseLeaveHandler() {
      this.buttonHovered = false;
    },
    inputNameHandler($event) {
      this.setName($event.target.value.replace(/[^a-zа-я]/gi, ''));
    }
  }
};
</script>

<style lang="sass" scoped>
.hero
  display: flex
  align-items: center
  justify-content: center
  height: 100%
  &__form
    display: flex
    flex-direction: column
    gap: 7px
    max-width: 500px
    label
      color: #fff
    div
      display: flex
      gap: 15px
  &__button
    white-space: nowrap
    width: 140px
  &__input
    border: 1px solid var(--bg-light)
    background-color: var(--bg)
    padding: 0.4em 0.8em
    border-radius: 0.4em
    outline: none
    width: 150px
</style>
