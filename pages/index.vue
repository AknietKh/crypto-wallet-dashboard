<template>
  <div class="main-page">
    <section class="main-page__section">
      <balance-card :token="selectedToken" />
    </section>
    <section class="main-page__section">
      <div class="tokens-section">
        <div class="token-cards">
          <token-card
            v-for="token in tokens"
            :key="token.symbol"
            :token="token"
            class="token-card"
            :class="{'token-card_active': selectedToken && token.symbol === selectedToken.symbol}"
            @click.native="handleSelectToken(token)"
          />
        </div>
        <button type="button" class="add-token">
          <p class="add-token__text">
            {{ $t('add-token.btn') }}
          </p>
          <span class="add-token__plus">+</span>
        </button>
      </div>
    </section>
    <section class="main-page__section">
      <transfer-form />
    </section>
    <section class="main-page__section">
      <transactions-table />
    </section>
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import MainMixin from '~/mixins/MainMixin'
import BalanceCard from '~/components/App/BalanceCard/index.vue'
import TokenCard from '~/components/App/TokenCard/index.vue'
import TransferForm from '~/components/App/TransferForm/index.vue'
import TransactionsTable from '~/components/App/TransactionTable/index.vue'
import { IToken } from '~/store/main/state'

export default MainMixin.extend({
  name: 'MainPage',
  components: {
    BalanceCard,
    TokenCard,
    TransferForm,
    TransactionsTable
  },
  data () {
    return {
      selectedToken: null as IToken | null
    }
  },
  computed: {
    ...mapGetters({
      tokensMap: 'main/getUserTokensMap'
      // isConnected: 'main/getIsConnected'
    }),
    tokens (): IToken[] {
      return Object.values(this.tokensMap)
    }
  },
  // watch: {
  //   isConnected (isConnected) {
  //     if (isConnected) {
  //       this.updateBalances()
  //     }
  //   }
  // },
  created () {
    this.$store.dispatch('main/setUserTokens');
    [this.selectedToken] = this.tokens
  },
  methods: {
    handleSelectToken (token: IToken) {
      this.selectedToken = token
    }
    // updateBalances () {
    //   try {
    //     this.$store.dispatch('main/updateTokensBalance')
    //   } catch (err) {
    //     console.log('err: ', err)
    //   }
    // }
  }
})
</script>

<style lang="scss" scoped>
  .main-page {
    &__section {
      margin-bottom: 25px;
    }
  }
  .tokens-section {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-column-gap: 20px;
  }
  .token-cards {
    @include base-scrollbar;
    display: flex;
    align-items: center;
    overflow-x: auto;
    border-top-right-radius: 14px;
    border-bottom-right-radius: 14px;
    // box-shadow: 0px 10px 40px rgba(3, 3, 3, 0.1);
    :not(:last-child) {
      margin-right: 20px;
    }
  }
  .token-card {
    cursor: pointer;
    &_active {
      border: 2px solid #000000;
    }
  }
  .add-token {
    min-width: 206px;
    display: flex;
    align-items: center;
    justify-content: center;
    grid-column-gap: 10px;
    padding: 20px;
    background-color: $default-background;
    border: 2px solid $header-border;
    border-radius: 14px;
    &__text {
      font-size: 16px;
      font-weight: 600;
      color: $main-text-color;
    }
    &__plus {
      font-size: 26px;
      color: $main-text-color;
    }
  }
</style>
