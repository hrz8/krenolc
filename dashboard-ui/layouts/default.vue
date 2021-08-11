<template>
  <div v-if="!isAuthenticated">
    {{ loadingMessage }}
  </div>
  <Nuxt v-else />
</template>

<script lang="ts">
import _sample from 'lodash/sample'
import {
  Vue,
  Component
} from 'vue-property-decorator'

@Component
export default class LayoutDefaultWrapper extends Vue {
  get isAuthenticated() {
    return this.$auth.isAuthenticated || false
  }

  get loadingMessage() {
    return _sample([
      'Assembling bot...',
      'Generating witty dialog...',
      'Swapping time and space...',
      'Spinning violently around the y-axis...',
      'Tokenizing real life...',
      'Bending the spoon...',
      'Multiplying the matrix',
      'Filtering morale...',
      'The architects are still drafting',
      'The bits are breeding',
      'Playing elevator music...',
      '...at least you\'re not on hold...',
      'It\'s not you. It\'s me.',
      'Winter is coming...',
      'Obfuscating quantum entaglement...',
      'Why don\'t you order a sandwich?',
      'We\'re making you a cookie...',
      'Computing chance of success..',
      'Adjusting flux capacitor...',
      'Granting wishes...',
      'I think I am, therefore, I am. I think.',
      'These violent delights have violent ends...',
      'Searching for plot device...'
    ])
  }
}
</script>
