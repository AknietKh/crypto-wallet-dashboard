import Vue from 'vue'

import {
  ValidationProvider,
  ValidationObserver,
  extend,
  configure,
  setInteractionMode
} from 'vee-validate'

import * as rules from 'vee-validate/dist/rules'
import { Context } from '@nuxt/types'
import { VeeValidateConfig } from 'vee-validate/dist/types/config'
import { ValidationRule } from 'vee-validate/dist/types/types'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
setInteractionMode('eager')

Object.keys(rules).forEach((rule: string) => {
  // @ts-ignore
  const ruleObj: ValidationRule = rules[rule]
  extend(rule, ruleObj)
})

export default ({ app }: Context) => {
  configure({
    // eslint-disable-next-line no-underscore-dangle
    defaultMessage: (_field_, values) => app.i18n.t(`messages.${values._rule_}`, values)
  } as VeeValidateConfig)
}
