<template>
  <div>
    <div>Hello, World! {{ token }}</div>
    <div>Hello, World! {{ user }}</div>
  </div>
</template>

<script lang="ts">
import {
  Vue, Component
} from 'nuxt-property-decorator'

@Component
export default class HelloComponent extends Vue {
  get token() {
    return this.$store.getters['auth/getUserAccessToken']
  }

  get user() {
    return this.$store.getters['auth/getUserData']
  }
}
</script>