<template>
  <div
    class="chat bg-blur"
    :class="{[cssClass]: cssClass}"
    ref="chat"
    :style="`
      transform: translate(${movePosition[0]}px, ${movePosition[1]}px);
      left: ${staticPosition[0]}px;
      bottom: ${staticPosition[1]}px;
    `"
    @dblclick="resetChatPosition"
  >
    <div class="chat__header">
      <button
        class="chat__arrow-down bg-blur bg-blur--hover"
        :class="{active: !isOpen}"
        @click="toggleOpened"
      >
        <s-arrow-down />
      </button>
      <button
        class="chat__transfer bg-blur bg-blur--hover"
        @mousedown="moveMousedownHandler"
      >
        <s-move />
      </button>
    </div>
    <ul class="chat__messages" v-if="isOpen" ref="messages-wrapper">
      <li
        class="chat__message"
        v-for="(m, i) in messages"
        :key="i"
        :class="messageClass(m.ownerId)"
      >
        <span class="name">{{ m.ownerName }}:</span>
        <span class="date">{{ getDate(m.timestamp) }}</span>
        <p class="text">{{ m.message }}</p>
      </li>
    </ul>
    <form class="chat__form" v-if="isOpen" @submit.prevent="send">
      <input
        type="text"
        class="my-input chat__input"
        @input="inputHandler"
        :value="message"
      />
      <button
        type="button"
        class="chat__send my-button"
        :disabled="!canSend"
        :value="message"
        @click="send"
      >
        Отправить
      </button>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import SArrowDown from '../svg/s-arrow-down';
import SMove from '../svg/s-move';

export default {
  data: () => ({
    isOpen: true,
    movePositionStart: [],
    movePosition: [5, 5],
    staticPosition: [5, 5]
  }),
  components: {
    SArrowDown,
    SMove
  },
  props: {
    cssClass: {
      type: String,
      defualt: ''
    }
  },
  computed: {
    ...mapGetters({
      canSend: 'chat/canSendMessage',
      messages: 'chat/messages',
      message: 'chat/message',
      userId: 'user/id'
    }),
    getDate: (state) => (timestamp) => {
      const date = new Date(timestamp);
      let m = date.getMinutes();
      let h = date.getHours();
      let dd = date.getDate();
      let mm = date.getMonth() + 1;
      let yy = date.getFullYear();

      const ifTo = (p = '') => {
        if (p.toString().length === 1) {
          return `0${p}`;
        }
        return p;
      };

      m = ifTo(m);
      h = ifTo(h);
      dd = ifTo(dd);
      mm = ifTo(mm);

      return `${dd}.${mm}.${yy} ${h}:${m}`;
    },
    messageClass: (state) => (ownerId) => {
      if (state.userId === ownerId) {
        return 'me';
      }
      return 'bg-blur';
    }
  },
  methods: {
    ...mapActions({
      inputHandler: 'chat/writeMessage',
      getMessages: 'chat/getMessages',
      send: 'chat/sendMessage',
      messagesWatcher: 'chat/messagesWatcher'
    }),
    toggleOpened() {
      this.isOpen = !this.isOpen;
    },
    moveMousedownHandler(e) {
      window.addEventListener('mousemove', this.documentMoveHandler);
      window.addEventListener('mouseup', this.documentMouseupHandler);
      document.body.style.cursor = 'move';
      this.movePositionStart = [e.clientX, e.clientY];
    },
    documentMoveHandler(e) {
      const [x, y] = this.movePositionStart;

      let newX = (x - e.clientX) * -1;
      let newY = (y - e.clientY) * -1;

      this.movePosition = [newX, newY];
    },
    documentMouseupHandler() {
      let {height, top, left, width} = this.$refs.chat.getBoundingClientRect();
      let x;
      let y;
      let right;
      right = window.innerWidth - width - 5;

      x = left > right ? right : left;
      top = top >= 5 ? top : 5;
      y = window.innerHeight - height - top;

      y = y >= 5 ? y : 5;
      x = x >= 5 ? x : 5;

      this.staticPosition = [x, y];
      this.movePosition = [0, 0];

      window.removeEventListener('mousemove', this.documentMoveHandler);
      window.removeEventListener('mouseup', this.documentMouseupHandler);
      document.body.style.cursor = 'default';
    },
    resetChatPosition() {
      this.staticPosition = [5, 5];
    },
    scrollDown() {
      setTimeout(
        () =>
          this.$refs['messages-wrapper'].scrollTo({
            top: this.$refs['messages-wrapper'].scrollHeight + 200,
            behavior: 'smooth'
          }),
        2
      );
    }
  },
  mounted() {
    this.getMessages();
    this.messagesWatcher(this.scrollDown);
  }
};
</script>

<style lang="sass">

.chat
  display: flex
  flex-direction: column
  gap: 8px
  width: 300px
  padding: 3px
  border-radius: 8px
  &__header
    display: flex
    gap: 5px
  &__transfer,
  &__arrow-down
    height: 30px
    padding: 0
    border-radius: 5px
    border: none
    background-color: var(--bg-light)
    display: flex
    align-items: center
    justify-content: center
    width: calc(50% - 2.5px)
    cursor: move
    .svg
      height: 20px
      width: 20px
      svg
        height: 100%
        width: 100%
        fill: var(--bg-dark)
  &__arrow-down
    cursor: pointer
    &.active
        .svg
            transform: rotateX(180deg)
  &__messages
    display: flex
    flex-direction: column
    gap: 5px
    max-height: 400px
    overflow: auto
    &::-webkit-scrollbar
      width: 6px
    &::-webkit-scrollbar-track
      background-color: #171717
      border-radius: 6px
    &::-webkit-scrollbar-thumb
      border-radius: 6px
      background-color: #000
  &__message
    padding: 3px 5px
    max-width: 80%
    border-radius: 5px
    line-height: 1.3em
    display: grid
    .name
      font-size: 13px
      grid-area: name
      color: var(--text-light)
    .date
      font-size: 13px
      grid-area: date
      text-align: right
      color: var(--text-light)
    .text
      grid-area: message
    &:not(.me)
      margin-right: auto
      grid-template-columns: 1fr 1fr
      grid-template-rows: auto 1fr
      grid-template-areas: "name date" "message message"
    &.me
      background-color: #fff
      margin-left: auto
      grid-template-columns: 1fr
      grid-template-rows: 1fr auto
      grid-template-areas: "message" "date"
      .name
        display: none
  &__input
    border: 1px solid var(--bg-light)
    padding: 0.4em 0.8em
    border-radius: 0.55em
    outline: none
    width: calc(100% - 115px)
  &__send
    width: 110px
    padding: 0px
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    &:disabled
      cursor: not-allowed
      &:active
        background-color: #363636
    &:active
      background-color: #242424
  &__form
    display: flex
    gap: 5px
</style>
