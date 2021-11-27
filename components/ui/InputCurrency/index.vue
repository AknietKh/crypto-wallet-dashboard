<template>
  <currency-input
    ref="currency"
    v-model="computedValue"
    :locale="$i18n.locale"
    :currency="null"
    :allow-negative="false"
    :distraction-free="{
      hideCurrencySymbol: true,
      hideNegligibleDecimalDigits: true,
      hideGroupingSymbol: false,
    }"
    :precision="precision"
    :placeholder="placeholder"
    :disabled="disabled"
  />
</template>

<script lang="ts">
import { PropType } from 'vue'
import MainMixin from '~/mixins/MainMixin'

export type IInputCurrencyValue = number|string|null

export default MainMixin.extend({
  name: 'InputCurrency',
  props: {
    value: {
      type: [Number, String] as PropType<IInputCurrencyValue>,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    currencyType: {
      type: String,
      default: 'crypto'
    },
    decimals: {
      type: [String, Number],
      default: 18
    }
  },
  data () {
    return {
      computedValue: this.value
    }
  },
  watch: {
    computedValue (value: IInputCurrencyValue, oldValue: IInputCurrencyValue) {
      if (value !== oldValue) {
        this.$emit('input', value)
      }
    }
  },
  computed: {
    precision () {
      if (!this.currencyType) {
        return { min: 0, max: this.decimals }
      }
      const max = this.decimals

      return { min: 0, max }
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
