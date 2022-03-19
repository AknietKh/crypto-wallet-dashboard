<template>
  <div class="balance-card">
    <div class="balance-card__left">
      <h2 class="balance-card__title">
        {{ $t('balance-card.title') }}
      </h2>
      <p
        v-if="token.balance || token.balance === 0"
        :title="token.balance"
        class="balance-card__balance"
      >
        {{ $cn(token.balance, 8) }} {{ token.symbol }}
      </p>
      <p v-else class="balance-card__balance">
        -
      </p>
      <div class="balance-card__address-field copy-field">
        <p class="copy-field__user-address">
          {{ userAddress || 'Connect wallet first' }}
        </p>
        <button class="copy-field__copy" @click="handleCopy">
          <span class="icon-copy copy-field__icon" />
        </button>
      </div>
    </div>
    <div class="balance-card__right">
      <img
        class="balance-card__terminal"
        :src="Require('card-reader.png')"
        alt="card reader"
      >
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { mapGetters } from 'vuex'
import MainMixin from '~/mixins/MainMixin'
import { IToken } from '~/store/main/state'

export default MainMixin.extend({
  name: 'BalanceCard',
  props: {
    token: {
      type: Object as PropType<IToken>,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      userAddress: 'main/getUserAddress'
    })
  },
  methods: {
    handleCopy ():void {
      this.$copyText(this.userAddress)
    }
  }
})
</script>

<style lang="scss" scoped>
  .balance-card {
    display: flex;
    justify-content: space-between;
    border-radius: 14px;
    background: $balance-card-bg;
    box-shadow: $balance-card-shadow;
    &__left {
      max-width: 422px;
      width: 100%;
      padding: 35px;
    }
    &__terminal {
      width: 488px;
      height: 220px;
    }
    &__title {
      font-size: 16px;
      font-weight: normal;
      line-height: 20px;
      margin-bottom: 8px;
    }
    &__balance {
      font-size: 40px;
      font-weight: 700;
      line-height: 49px;
      margin-bottom: 30px;
    }
    &__address-field {

    }
  }
  .copy-field {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 42px;
    background: $balance-card-address-field;
    border-radius: 35px;
    padding: 12px 5px 12px 13px;
    &__user-address {
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__copy {
      padding: 5px 8px;
      border-radius: 50%;
      background-color: $balance-card-copy;
    }
    &__icon {
      font-size: 16px;
    }
  }
</style>
