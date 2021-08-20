<template>
  <div>
    <div>Hello, World! {{ token }}</div>
    <div>Hello, World! {{ user }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    token(): string {
      return this.$store.getters['auth/getUserAccessToken']
    },
    user() {
      return this.$store.getters['auth/getUserData']
    }
  }
})
</script>