<template>
  <div v-if="loaded">
    <Nuxt />
    {{ loadingMessage }}
  </div>
  <div v-else class="logo">
     <img src="~/assets/logo.png" width="64" height="64" />
  </div>
</template>

<script lang="ts">
import _sample from 'lodash/sample'
import {
  Vue,
  Component
} from 'vue-property-decorator'

@Component
export default class LayoutDefaultWrapper extends Vue {
  // data
  public loaded = false

  // computed
  public get isAuthenticated() {
    return this.$auth.isAuthenticated || false
  }

  public get loadingMessage() {
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

  // methods

  // built-in
  public mounted() {

  }
}
</script>

<style lang="scss" scoped>
.logo {
  display: flex;
  place-content: center;
  place-items: center;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.logo img {
  transition: all ease-in-out 0.25s;
}
</style>