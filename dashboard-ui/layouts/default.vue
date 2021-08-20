<template>
  <div v-if="initialized">
    <el-container
      v-loading="!loaded"
      :element-loading-text="loadingMessage"
      style="height: 100%"
    >
      <Nuxt />
    </el-container>
  </div>
  <div v-else class="logo">
     <img src="~/assets/logo.png" width="64" height="64" />
  </div>
</template>

<script lang="ts">
import _sample from 'lodash/sample'
import { Watch } from 'nuxt-property-decorator'
import {
  Vue,
  Component
} from 'vue-property-decorator'

@Component
export default class LayoutDefaultWrapper extends Vue {
  // data
  public initialized = false

  // computed
  get token() {
    return this.$store.getters['auth/getUserAccessToken']
  }

  get isAuthenticated() {
    return this.$store.getters['auth/getIsAuthenticated']
  }

  public get loaded() {
    const botLoaded = this.$store.getters['app/getBotLoaded']
    const userProfileLoaded = this.$store.getters['app/getUserProfileLoaded']
    return botLoaded && userProfileLoaded
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

  // built-in methods
  public mounted() {
  }

  @Watch("isAuthenticated")
  public onIsAuthenticatedChanged(val: boolean, prev: boolean) {
    console.log(val, this.token)
    if (val && this.token) {
      (this as any).$apolloHelpers.onLogin(this.token).then(() => {
        this.initialized = true
        this.$store.dispatch('app/fetchBotAsync')
      })
    }
  }

  // methods
}
</script>

<style scoped>
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