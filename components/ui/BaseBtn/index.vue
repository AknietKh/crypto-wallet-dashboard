<template>
  <a
    v-if="link !== ''"
    class="base-btn"
    :class="btnClass"
    :href="link"
    target="_blank"
  >
    <slot />
  </a>
  <nuxt-link
    v-else-if="nuxtLink !== ''"
    class="base-btn"
    :class="btnClass"
    :to="nuxtLink"
  >
    <slot />
  </nuxt-link>
  <button
    v-else
    class="base-btn"
    :class="btnClass"
    :type="btnType"
    :disabled="disabled || loading"
    @click="$emit('click')"
  >
    <slot v-if="loading" name="loading">
      <b-spinner
        class="base-btn__loader"
        :style="{color: loaderColor}"
      />
    </slot>
    <slot />
  </button>
</template>
<script lang="ts">
import MainMixin from '~/mixins/MainMixin'

export default MainMixin.extend({
  props: {
    mode: {
      type: String,
      default: 'default',
      validator (value) {
        const available = ['default', 'danger', 'success']

        return available.includes(value)
      }
    },
    link: {
      type: String,
      default: ''
    },
    nuxtLink: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    btnType: {
      type: String,
      default: 'button'
    },
    outlined: {
      type: Boolean,
      default: false
    },
    loaderColor: {
      type: String,
      default: '#FFFFFF'
    }
  },
  computed: {
    btnClass () {
      const { disabled, mode, outlined, loading } = this
      return [
        { 'base-btn_danger': mode === 'danger' },
        { 'base-btn_success': mode === 'success' },
        { 'base-btn_disabled': disabled },
        { 'base-btn_loading': loading },
        { 'base-btn__outlined base-btn__outlined_default': outlined && mode === 'default' },
        { 'base-btn__outlined base-btn__outlined_danger': outlined && mode === 'danger' },
        { 'base-btn__outlined base-btn__outlined_success': outlined && mode === 'success' }
      ]
    }
  }
})
</script>
<style lang="scss" scoped>
.base-btn {
  position: relative;
  padding: 15px 20px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  color: $main-text-color;
  transition: .3s;
  background: $default-btn-bg;
  border-radius: 14px;
  &_success {
    background: $success-btn-bg;
  }
  &_danger {
    background: $danger-btn-bg;
  }
  &_loading {
    color: transparent;
  }
  &_disabled {
    box-shadow: none;
    cursor: not-allowed;
    background: $disabled-btn-bg;
    border: $disabled-btn-border;
    color: $disabled-btn-text;
  }
  &__outlined {
     box-shadow: none;
     background: transparent;
    &_default {
      border: 2px solid $default-btn-border;
    }
    &_danger {
      border: 2px solid $danger-btn-border;
    }
    &_success {
      border: 2px solid $success-btn-border;
    }
  }
  &__loader {
    position: absolute;
  }

}
</style>
