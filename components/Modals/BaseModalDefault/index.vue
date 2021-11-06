<template>
  <base-modal-box>
    <div class="base-modal__content base-modal__text">
      {{ options.text }}
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
