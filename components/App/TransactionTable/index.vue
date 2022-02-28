<template>
  <div class="transactions">
    <h2 class="transactions__title">
      {{ $t('transactions.title') }}
    </h2>
    <transaction-card
      v-for="transaction in transactions"
      :key="transaction.txHash"
      class="transactions__card"
      :transaction="transaction"
    />
  </div>
</template>

<script>
import MainMixin from '~/mixins/MainMixin'
import TransactionCard from '~/components/App/TransactionCard/index.vue'

export default MainMixin.extend({
  name: 'TransactionsTable',
  components: {
    TransactionCard
  },
  computed: {
    transactions () {
      return [{
        type: 'approve',
        from: 'asdfadfa',
        to: 'fasdff',
        amount: 10,
        symbol: 'del',
        txHash: 'p[obknj'
      }]
    }
  }
})
</script>

<style lang="scss">
  .transactions {
    &__title {
      color: $main-text-color;
      font-weight: 600;
      font-size: 23px;
      line-height: 28px;
      margin-bottom: 25px;
    }
    &__card {
      margin-bottom: 20px;
    }
  }
</style>
