<template>
  <div>Hello, World! {{ $auth.token }}</div>
</template>

<script lang="ts">
import {
  Vue, Component
} from 'nuxt-property-decorator'

@Component
export default class HelloComponent extends Vue {
  get token() {
    return this.$auth.token
  }

  mounted() {
    console.log(this.$auth.user)
  }
}
</script>