<template>
  <validation-observer ref="form-observer">
    <form class="transfer-form" @submit.prevent="handleTransfer">
      <p class="transfer-form__title">
        {{ $t('transfer-form.title') }}
      </p>
      <base-input
        v-model="amount"
        :label="$t('transfer-form.fields.amount.label')"
        :placeholder="$t('transfer-form.fields.amount.placeholder')"
      />
      <base-input
        v-model="address"
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
import MainMixin from '~/mixins/MainMixin'

export default MainMixin.extend({
  name: 'TransferForm',
  data () {
    return {
      amount: null,
      address: ''
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
