<template>
  <Hello />
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta'
import Hello from '@/components/Hello.vue'

export default Vue.extend({
  components: {
    Hello
  },
  head (): MetaInfo {
    return {
      title: 'Home'
      // meta: [{
      //   name: 'message',
      //   content: this.computedMessage
      // }]
    }
  }
})
</script>
