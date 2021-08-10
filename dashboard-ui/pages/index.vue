<template>
  <Hello />
</template>

<script lang="ts">
import {
  Vue, Component
} from 'nuxt-property-decorator'

import Hello from '@/components/Hello.vue'

@Component({
  components: {
    Hello
  }
})
export default class PageIndexComponent extends Vue {
  mounted() {
    console.log('uy')
    this.$api.call('placeholder.users')
  }
}
</script>
