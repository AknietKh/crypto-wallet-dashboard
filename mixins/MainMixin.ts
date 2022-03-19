// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BvToast } from 'bootstrap-vue'
import Vue from 'vue'
import { IModalOptions } from '~/store/modals/state'

export enum TOAST_TYPES {
  SUCCESS = 'success',
  ERROR = 'error'
}

// declare module 'vue/types/vue' {
//   interface Vue {
//     $bvToast: BvToast
//   }
// }

export default Vue.extend({
  methods: {
    ShowModal (payload: IModalOptions) {
      this.$store.dispatch('modals/show', payload)
    },
    Require (img: string) {
      // eslint-disable-next-line global-require
      return require(`assets/img/${img}`)
    },
    SwitchTheme (light: string, dark: string):string {
      return this.$colorMode.preference === 'light' ? light : dark
    },
    ShowToast (message: string, type: TOAST_TYPES = TOAST_TYPES.ERROR) {
      const title = type === TOAST_TYPES.SUCCESS ? 'Success' : 'Error'
      this.$bvToast.toast(message, {
        title,
        variant: type
      })
    }
  }
})
