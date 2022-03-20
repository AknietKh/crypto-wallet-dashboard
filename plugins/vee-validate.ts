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
import Web3 from 'web3'

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

extend('isAddress', {
  validate: value => Web3.utils.isAddress(value)
})

extend('greaterThanZero', {
  validate: value => value > 0
})

extend('maxDecimals', {
  validate: (value, params): boolean => {
    const { decimals } = params as { decimals: number }
    const arr = value.toString().trim().split('.')
    if (arr.length === 2) {
      return +arr[1].length <= +decimals
    }
    return true
  },
  params: ['decimals']
})
