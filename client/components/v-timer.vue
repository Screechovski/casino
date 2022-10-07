<template>
  <span class="neon neon--text">
    {{ timer }}
  </span>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  data: () => ({}),
  computed: {
    ...mapGetters({
      timer: 'timer/time'
    })
  },
  methods: {
    ...mapActions({
      start: 'timer/start'
    })
  },
  mounted() {
    this.start();
  }
};
</script>

<style></style>
