<template>
  <div class="base-modal__box">
    <div
      v-if="isHeader === true"
      class="base-modal__header"
    >
      <div class="base-modal__title">
        <span>{{ options.title || title || 'Default' }}</span>
      </div>
      <button
        v-if="!options.isUnclosable"
        class="base-modal__x"
        @click="close()"
      >
        ×
      </button>
    </div>
    <slot />
  </div>
</template>
<script lang="ts">
import { mapGetters } from 'vuex'
import MainMixin from '~/mixins/MainMixin'

export default MainMixin.extend({
  props: {
    title: {
      type: String,
      default: ''
    },
    isUnclosable: {
      type: Boolean,
      default: false
    },
    isHeader: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapGetters({
      options: 'modals/getOptions'
    })
  },
  methods: {
    close () {
      this.$store.dispatch('modals/hide')
    }
  }
})
</script>
<style lang="scss" scoped>
.base-modal {
  @include modalKit;
}
</style>
