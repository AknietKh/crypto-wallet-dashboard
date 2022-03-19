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
      <p v-if="isLoading">
        loading
      </p>
      <p
        v-if="token.balance || token.balance === 0"
        class="token-card__amount"
        :title="token.balance"
      >
        {{ $cn(token.balance, 6) }} {{ token.symbol }}
      </p>
      <p v-else class="token-card__amount">
        Connect wallet first
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'
import { mapGetters } from 'vuex'
import MainMixin from '~/mixins/MainMixin'
import { IToken } from '~/store/main/state'

export default MainMixin.extend({
  name: 'TokenCard',
  props: {
    token: {
      type: Object as PropType<IToken>,
      required: true
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      tokensLogo: 'main/getTokensUrl',
      isConnected: 'main/getIsConnected'
    }),
    tokenLogo () {
      return this.tokensLogo[this.token.symbol.toUpperCase()] || this.Require('default-token.svg')
    }
  },
  watch: {
    isConnected (isConnected: boolean) {
      if (isConnected) {
        this.updateBalances()
      }
    }
  },
  methods: {
    async updateBalances () {
      try {
        this.isLoading = true
        await this.$store.dispatch('main/updateTokenBalance', this.token)
      } catch (err) {
        console.log('err: ', err)
      } finally {
        this.isLoading = false
      }
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
