<template>
  <validation-observer
    ref="form-observer"
    v-slot="{ handleSubmit }"
  >
    <form class="transfer-form" @submit.prevent="handleSubmit(handleTransfer)">
      <p class="transfer-form__title">
        {{ $t('transfer-form.title') }}
      </p>
      <base-input
        v-model="amount"
        :rules="{
          required: true,
          greaterThanZero: true,
          maxDecimals: token.decimals
        }"
        :name="$t('transfer-form.fields.amount.label')"
        :label="$t('transfer-form.fields.amount.label')"
        :placeholder="$t('transfer-form.fields.amount.placeholder')"
      />
      <base-input
        v-model="address"
        rules="required|isAddress"
        :name="$t('transfer-form.fields.address.label')"
        :label="$t('transfer-form.fields.address.label')"
        :placeholder="$t('transfer-form.fields.address.placeholder')"
      />
      <div class="transfer-form__btns">
        <div class="transfer-form__btn-space" />
        <base-btn outlined>
          {{ $t('transfer-form.btns.approve') }}
        </base-btn>
        <base-btn outlined btn-type="submit">
          {{ $t('transfer-form.btns.transfer') }}
        </base-btn>
      </div>
    </form>
  </validation-observer>
</template>

<script lang="ts">
import { PropType } from 'vue'
import MainMixin from '~/mixins/MainMixin'
import { IToken } from '~/store/main/state'

export default MainMixin.extend({
  name: 'TransferForm',
  props: {
    token: {
      type: Object as PropType<IToken>,
      required: true
    }
  },
  data () {
    return {
      amount: null,
      address: ''
    }
  },
  computed: {
  },
  methods: {
    handleTransfer () {
      console.log('transger')
    }
  }
})
</script>

<style lang="scss">
  .transfer-form {
    padding: 30px;
    border-radius: 14px;
    background-color: $transfer-form-bg;
    &__title {
      font-size: 24px;
      font-weight: 600;
      color: $main-text-color;
      margin-bottom: 20px;
    }
    &__btns {
      display: grid;
      grid-template-columns: 1fr repeat(2, 200px);
      grid-column-gap: 20px;
      margin-top: 10px;
    }
  }
</style>
