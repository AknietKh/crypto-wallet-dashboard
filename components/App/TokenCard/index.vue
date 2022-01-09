<template>
  <div class="token-card">
    <div class="token-card__header token-card__header_mb">
      <img
        class="token-card__logo"
        :src="tokenLogo"
        :alt="token.symbol.toUpperCase()"
      >
      <p class="token-card__title">
        {{ token.symbol.toUpperCase() }}
      </p>
    </div>
    <div class="token-card__body">
      <p class="token-card__amount">
        {{ token.amount }} {{ token.symbol }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { mapGetters } from 'vuex'
import MainMixin from '~/mixins/MainMixin'

export interface ITokenCard {
  symbol: string,
  amount: number,
}

export default MainMixin.extend({
  name: 'TokenCard',
  props: {
    token: {
      type: Object as PropType<ITokenCard>,
      default: ():ITokenCard => ({
        symbol: '',
        amount: 0
      })
    }
  },
  computed: {
    ...mapGetters({
      tokensLogo: 'main/getTokensUrl'
    }),
    tokenLogo () {
      return this.tokensLogo[this.token.symbol.toUpperCase()] || this.Require('default-token.svg')
    }
  }
})
</script>

<style lang="scss">
  .token-card {
    min-width: 206px;
    padding: 20px;
    background-color: $token-card-bg;
    border-radius: 14px;
    &__header {
      display: grid;
      grid-template-columns: 30px 1fr;
      align-items: center;
      grid-column-gap: 10px;
      &_mb {
        margin-bottom: 14px;
      }
    }
    &__logo {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    &__title {
      font-size: 18px;
      font-weight: 600;
      color: $main-text-color;
    }
    &__amount {
      font-size: 16px;
      font-weight: normal;
      text-align: right;
      color: $secondary-text-color;
    }
  }
</style>
