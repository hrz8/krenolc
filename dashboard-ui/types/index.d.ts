/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue from 'vue'
import { Store } from 'vuex'
import { AuthComponent } from '~/plugins/auth'

declare module 'vue/types/vue' {
  interface Vue {
    $auth: AuthComponent;
    $api: () => any;
    $apollo: any;
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $auth: AuthComponent;
    $api: () => any;
    $apollo: any;
  }
  interface Context {
    $auth: AuthComponent;
    $api: () => any;
    $apollo: any;
  }
}

declare module 'nuxt-property-decorator' {
  interface VuexModule {
    store: {
      $auth: AuthComponent;
      $api: () => any;
      $apollo: any;
    } & Store<any>
  }
}
