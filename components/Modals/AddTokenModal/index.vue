<template>
  <base-modal-box title="Enter token address">
    <validation-observer
      ref="addTokenForm"
      v-slot="{handleSubmit}"
      slim
    >
      <form class="base-modal__content add-token-modal" @submit.prevent="handleSubmit(handleAddToken)">
        <base-input
          v-model="address"
          :rules="{required: true, isAddress: true}"
          label="Address"
          name="Address"
          placeholder="0xDDDE98CeE34E286457220fF26d95143634FM0245"
        />

        <base-btn
          outlined
          btn-type="submit"
          class="add-token-modal__btn"
          :loading="isLoading"
        >
          Add token
        </base-btn>
      </form>
    </validation-observer>
  </base-modal-box>
</template>
<script lang="ts">
import { mapGetters } from 'vuex'
import MainMixin from '~/mixins/MainMixin'

export default MainMixin.extend({
  data () {
    return {
      address: '',
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      options: 'modals/getOptions'
    })
  },
  methods: {
    async handleAddToken () {
      try {
        this.isLoading = true
        await this.$store.dispatch('main/addToken', this.address)
        this.$store.dispatch('modals/hide')
      } catch (err) {
        console.log('err: ', err)
        this.ShowToast('Failed to add token, please try later')
      } finally {
        this.isLoading = false
      }
    }
  }
})
</script>
<style scoped lang="scss">
.base-modal {
  @include modalKit;
}
.add-token-modal {
  display: grid;
  grid-row-gap: 20px;
  &__btn {
    justify-self: flex-end;
  }
}
</style>
