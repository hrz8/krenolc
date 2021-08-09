<template>
  <div v-if="!isAuthenticated">
    Loading...
  </div>
  <Nuxt v-else />
</template>

<script lang="ts">
import {
  Vue, Component
} from 'vue-property-decorator'

@Component
export default class LayoutDefaultWrapper extends Vue {
  get isAuthenticated() {
    return this.$auth.isAuthenticated || false
  }
}
</script>
