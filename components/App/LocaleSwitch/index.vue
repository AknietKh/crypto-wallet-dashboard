<template>
  <base-select v-model="selectedLocale" :options="locales" />
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
