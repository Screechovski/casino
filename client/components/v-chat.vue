<template>
  <div
    class="chat neon neon--border"
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
        class="chat__arrow-down neon neon--icon neon--border neon--hover"
        :class="{active: !isOpen}"
        @click="toggleOpened"
      >
        <s-arrow-down />
      </button>
      <button
        class="chat__transfer neon neon--icon neon--border neon--hover"
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
        class="neon neon--border neon--text neon--blue chat__input"
        @input="inputHandler"
        :value="message"
      />
      <button
        type="button"
        class="chat__send neon neon--border neon--text neon--pink neon--hover"
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
        return 'me neon neon--text neon--border neon--yellow';
      }
      return 'neon neon--text neon--border';
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
  width: 300px
  @apply rounded-xl flex flex-col gap-2 p-2
  &__header
    display: flex
    gap: 5px
  &__transfer,
  &__arrow-down
    width: calc(50% - 2.5px)
    cursor: move
    @apply flex h-8 rounded-xl p-0 flex items-center justify-center
    .svg
      height: 20px
      width: 20px
      svg
        height: 100%
        width: 100%
  &__arrow-down
    cursor: pointer
    &.active
        .svg
            transform: rotateX(180deg)
  &__messages
    display: flex
    flex-direction: column
    gap: 5px
    max-height: 300px
    overflow-x: auto
    overflow-y: visible
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
    line-height: 1.3em
    @apply grid gap-1 rounded-xl
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
      margin-left: auto
      grid-template-columns: 1fr
      grid-template-rows: 1fr auto
      grid-template-areas: "message" "date"
      .name
        display: none
  &__input
    padding: 0.4em 0.8em
    outline: none
    width: calc(100% - 115px)
    @apply rounded-xl
  &__send
    width: 110px
    padding: 0
    @apply rounded-xl flex items-center justify-center
    &:disabled
      cursor: not-allowed
  &__form
    display: flex
    gap: 5px
</style>
