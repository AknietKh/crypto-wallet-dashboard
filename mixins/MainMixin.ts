import Vue from 'vue'
import { IModalOptions } from '~/store/modals/state'

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
    }
  }
})
