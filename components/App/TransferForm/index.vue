<template>
  <validation-observer
    ref="form-observer"
    v-slot="{ handleSubmit }"
  >
    <form
      class="transfer-form"
      @submit.prevent="handleSubmit(handleTransfer)"
    >
      <p class="transfer-form__title">
        {{ $t('transfer-form.title') }} {{ token.symbol }}
      </p>
      <base-input
        v-model="amount"
        :rules="{
          required: true,
          greaterThanZero: true,
          maxDecimals: token.decimals,
          max_value: token.balance || 0
        }"
        :disabled="!isConnected"
        :name="$t('transfer-form.fields.amount.label')"
        :label="$t('transfer-form.fields.amount.label')"
        :placeholder="$t('transfer-form.fields.amount.placeholder')"
      />
      <base-input
        v-model="recipient"
        :disabled="!isConnected"
        rules="required|isAddress"
        :name="$t('transfer-form.fields.address.label')"
        :label="$t('transfer-form.fields.address.label')"
        :placeholder="$t('transfer-form.fields.address.placeholder')"
      />
      <div class="transfer-form__btns">
        <div class="transfer-form__btn-space" />
        <base-btn
          :loading="isApproveLoading"
          outlined
          :disabled="!isConnected || isNativeToken"
          @click="handleApprove"
        >
          {{ $t('transfer-form.btns.approve') }}
        </base-btn>
        <base-btn
          outlined
          btn-type="submit"
          :loading="isTransferLoading"
          :disabled="!isConnected"
        >
          {{ $t('transfer-form.btns.transfer') }}
        </base-btn>
      </div>
    </form>
  </validation-observer>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { mapGetters } from 'vuex'
import MainMixin, { TOAST_TYPES } from '~/mixins/MainMixin'
import { ITransactionFormPayload } from '~/store/main/actions'
import { IToken } from '~/store/main/state'
import { NATIVE_TOKEN_ADDRESS } from '~/web3/configs/constants'

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
      amount: '',
      recipient: '',
      isTransferLoading: false,
      isApproveLoading: false
    }
  },
  computed: {
    ...mapGetters({
      isConnected: 'main/getIsConnected'
    }),
    isNativeToken (): boolean {
      return this.token.address === NATIVE_TOKEN_ADDRESS
    }
  },
  methods: {
    handleTransfer () {
      if (this.isNativeToken) {
        this.handleTransferNative()
      } else {
        this.handleTransferERC20()
      }
    },
    async handleTransferERC20 () {
      const payload: ITransactionFormPayload = {
        token: this.token,
        recipient: this.recipient,
        amount: +this.amount
      }

      try {
        this.isTransferLoading = true
        const tx = await this.$store.dispatch('main/transferERC20Token', payload)
        await this.updateBalance()
        this.ShowToast(`Tx hash: ${tx.transactionHash}`, TOAST_TYPES.SUCCESS)
      } catch (err) {
        console.log('transfer err: ', err)
        this.ShowToast('Oops, something went wrong, try to later')
      } finally {
        this.isTransferLoading = false
      }
    },
    async handleTransferNative () {
      const payload: ITransactionFormPayload = {
        token: this.token,
        recipient: this.recipient,
        amount: +this.amount
      }

      try {
        this.isTransferLoading = true
        const tx = await this.$store.dispatch('main/transferNativeToken', payload)
        await this.updateBalance()
        this.ShowToast(`Tx hash: ${tx.transactionHash}`, TOAST_TYPES.SUCCESS)
      } catch (err) {
        console.log('transfer err: ', err)
        this.ShowToast('Oops, something went wrong, try to later')
      } finally {
        this.isTransferLoading = false
      }
    },
    async handleApprove () {
      const payload: ITransactionFormPayload = {
        token: this.token,
        recipient: this.recipient,
        amount: +this.amount
      }

      try {
        this.isApproveLoading = true
        const allowance = await this.$store.dispatch('main/approveToken', payload)
        this.ShowToast(`Available limit: ${allowance}`, TOAST_TYPES.SUCCESS)
      } catch (err) {
        console.log('approve err: ', err)
        this.ShowToast('Oops, something went wrong, try to later')
      } finally {
        this.isApproveLoading = false
      }
    },
    async updateBalance () {
      try {
        await this.$store.dispatch('main/updateTokenBalance', this.token)
      } catch (err) {
        console.log('err: ', err)
      }
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
