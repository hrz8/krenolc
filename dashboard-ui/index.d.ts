/* eslint-disable @typescript-eslint/no-unused-vars */
import Vue from 'vue'
import { AuthComponent } from '~/plugins/auth'

declare module 'vue/types/vue' {
  interface Vue {
    $auth: AuthComponent;
    $api: any;
  }
}
