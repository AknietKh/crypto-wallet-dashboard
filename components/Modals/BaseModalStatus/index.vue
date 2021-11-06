<template>
  <base-modal-box :title="'Error'">
    <div class="base-modal__content base-modal__text status__text">
      <span>{{ options.text }}</span>
    </div>
  </base-modal-box>
</template>
<script lang="ts">
import { mapGetters } from 'vuex'
import MainMixin from '~/mixins/MainMixin'

export default MainMixin.extend({
  computed: {
    ...mapGetters({
      options: 'modals/getOptions'
    })
  }
})
</script>
<style scoped lang="scss">
.status {
  &__text {
    margin-bottom: 10px;
  }
}
.base-modal {
  @include modalKit;
}
</style>
