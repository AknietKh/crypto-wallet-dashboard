<template>
  <transition name="fade">
    <div
      v-if="isShow"
      class="base-modal"
      @mousedown.self="backgroundClick"
    >
      <component :is="currentModalKey" />
    </div>
  </transition>
</template>
<script lang="ts">
import { mapGetters } from 'vuex'
import MainMixin from '~/mixins/MainMixin'

import modals from '~/store/modals/modals'

import BaseModalStatus from '~/components/Modals/BaseModalStatus/index.vue'
import BaseModalDefault from '~/components/Modals/BaseModalDefault/index.vue'
import AddTokenModal from '~/components/Modals/AddTokenModal/index.vue'

export default MainMixin.extend({
  name: 'BaseModalContainer',
  components: {
    'base-modal-status': BaseModalStatus,
    'base-modal-default': BaseModalDefault,
    'add-token-modal': AddTokenModal
  },
  data: () => ({
    modals
  }),
  computed: {
    ...mapGetters({
      isShow: 'modals/getIsShow',
      currentModalKey: 'modals/getCurrentModalKey',
      options: 'modals/getOptions'
    })
  },
  methods: {
    backgroundClick () {
      if (!this.options.isUnclosable) {
        this.close()
      }
    },
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
