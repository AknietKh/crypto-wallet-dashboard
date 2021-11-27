<template>
  <base-select
    v-model="selectedLocale"
    :options="locales"
    :is-transparent="isDarkTheme"
  />
</template>

<script lang='ts'>
import MainMixin from '~/mixins/MainMixin'

export default MainMixin.extend({
  name: 'LocaleSwitch',
  data () {
    return {
      selectedLocale: this.$i18n.getLocaleCookie() || this.$i18n.defaultLocale
    }
  },
  computed: {
    locales () {
      return this.$i18n.locales.map(locale => ({
        text: this.$t(`locales.${locale}`),
        value: locale
      }))
    },
    isDarkTheme () {
      console.log('this.$colorMode.preference: ', this.$colorMode.preference)
      return this.$colorMode.preference === 'dark'
    }
  },
  watch: {
    selectedLocale (value) {
      this.$i18n.setLocale(value)
    }
  },
  methods: {

  }
})
</script>

<style lang="scss" scoped>
</style>
