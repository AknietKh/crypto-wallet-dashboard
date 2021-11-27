<template>
  <button class="switch-theme" @click="changeTheme">
    <span
      :class="{
        'icon-moon': $colorMode.preference === 'light',
        'icon-sun switch-theme__sun': $colorMode.preference === 'dark'
      }"
    />
  </button>
</template>

<script lang="ts">
import MainMixin from '~/mixins/MainMixin'

export default MainMixin.extend({
  name: 'SwitchTheme',
  methods: {
    changeTheme () {
      this.$colorMode.preference = this.$colorMode.preference === 'light'
        ? 'dark'
        : 'light'
    }
  }
})
</script>

<style lang="scss" scoped>
  .switch-theme {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    background: $switch-theme-bg;
    border: 1px solid $switch-theme-border;
    border-radius: 14px;
    &__sun {
      color: #ffffff;
    }
  }
</style>
