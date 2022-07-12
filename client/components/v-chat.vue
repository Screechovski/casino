<template>
    <div
        class="chat"
        :class="{[cssClass]: cssClass}"
        :style="`left: ${movePosition[0]}px; bottom: ${movePosition[1]}px`"
    >
        <div class="chat__header">
            <button
                class="chat__arrow-down"
                :class="{'active': !isOpen}"
                @click="toggleOpened"
            >
                <s-arrow-down />
            </button>
            <button
                class="chat__transfer"
                @mousedown="moveMousedownHandler"

            >
                <s-move />
            </button>
        </div>
        <ul class="chat__messages" v-if="isOpen">
            <li class="me">Lorem Ipsum is simply dummy text of the </li>
            <li class="me">Lorem Ipsum is simply dummy text of the </li>
            <li class="me">Lorem Ipsum is simply dummy text of the </li>
            <li>printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled </li>
            <li>it to make a type specimen book. It has </li>
            <li>survived not only five centuries, but also the leap</li>
            <li class="me">asd</li>
        </ul>
        <form class="chat__form" v-if="isOpen">
            <input type="text" class="my-input chat__input">
            <button type="button" class="chat__send">Отправить</button>
        </form>
    </div>
</template>

<script>
import SArrowDown from "../svg/s-arrow-down";
import SMove from "../svg/s-move";

export default {
    data: () =>({
        isOpen: true,
        movePositionStart: [],
        movePosition: [5, 5]
    }),
    components: {
        SArrowDown,
        SMove
    },
    props: {
        cssClass: {
            type: String,
            defualt: ""
        }
    },
    methods: {
        toggleOpened(){
            this.isOpen = !this.isOpen
        },
        moveMousedownHandler(e){
            window.addEventListener("mousemove", this.documentMoveHandler)
            window.addEventListener("mouseup", this.documentMouseupHandler)
            document.body.style.cursor = "move";
            this.movePositionStart = [e.clientX, e.clientY];
        },
        documentMoveHandler(e){
            const [x,y] = this.movePositionStart;
            this.movePosition = [(x - e.clientX) * -1, (y - e.clientY) * -1]
        },
        documentMouseupHandler(){
            window.removeEventListener("mousemove", this.documentMoveHandler)
            window.removeEventListener("mouseup", this.documentMouseupHandler)
            document.body.style.cursor = "default";
        }
    }
}
</script>

<style lang="sass">

.chat
    display: flex
    flex-direction: column
    gap: 8px
    width: 300px
    padding: 3px
    border-radius: 8px
    background-color: #2c2c2c
    &__header
        display: flex
        gap: 5px
    &__transfer,
    &__arrow-down
        height: 30px
        padding: 0
        border-radius: 5px
        border: none
        background-color: #363636
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
                fill: #000000
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
        li
            padding: 3px 5px
            max-width: 80%
            border-radius: 5px
            line-height: 1.3em
            &:not(.me)
                background-color: #4f4f4f
                margin-right: auto
                color: #cbcbcb
            &.me
                background-color: #141414
                color: #dbdbdb
                margin-left: auto
    &__input
        border: 1px solid var(--bg-light)
        padding: 0.4em 0.8em
        border-radius: 0.4em
        outline: none
        width: calc(100% - 115px)
    &__send
        background-color: #363636
        width: 110px
        padding: 0px
        display: flex
        align-items: center
        justify-content: center
        border-radius: 0.4em
        border: none
        color: #dbdbdb
        cursor: pointer
        &:active
            background-color: #242424
    &__form
        display: flex
        gap: 5px


</style>