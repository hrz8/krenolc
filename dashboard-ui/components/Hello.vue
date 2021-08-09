<template>
  <div>Hello, World! {{ token }}</div>
</template>

<script lang="ts">
import {
  Vue, Component
} from 'vue-property-decorator'

@Component
export default class HelloComponent extends Vue {
  get token() {
    return this.$auth.token || ''
  }
}
</script>