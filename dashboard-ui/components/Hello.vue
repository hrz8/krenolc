<template>
  <div>Hello, World! {{ token }}</div>
</template>

<script lang="ts">
import {
  Vue, Component
} from 'nuxt-property-decorator'

@Component
export default class HelloComponent extends Vue {
  get token() {
    return (async () => {
      try {
        return await this.$auth.getToken()
      } catch(e) {
        return ''
      }
    })()
  }


}
</script>