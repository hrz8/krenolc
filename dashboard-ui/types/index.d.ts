/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue from 'vue'
import { Store } from 'vuex'
import { AuthComponent } from '~/plugins/auth'

declare module 'vue/types/vue' {
  interface Vue {
    $api: () => any;
    $apolloHelpers: any;
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $api: () => any;
    $apolloHelpers: any;
  }
  interface Context {
    $api: () => any;
    $apolloHelpers: any;
  }
}

declare module 'nuxt-property-decorator' {
  interface VuexModule {
    store: {
      $api: () => any;
      $apolloHelpers: any;
    } & Store<any>
  }
}
