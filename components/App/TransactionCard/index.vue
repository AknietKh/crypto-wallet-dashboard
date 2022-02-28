<template>
  <div class="transaction-card">
    <div class="transaction-card__badge">
      <img
        :src="require(`~/assets/img/${transaction.type}.svg`)"
        alt="logo"
        class="transaction-card__icon"
      >
    </div>
    <p class="transaction-card__type">
      {{ $t(`transactions.types.${transaction.type}`) }}
    </p>
    <div class="transaction-card__item">
      <p class="transaction-card__label">
        {{ $t('transactions.from') }}
      </p>
      <p class="transaction-card__value">
        {{ transaction.from }}
      </p>
    </div>
    <div class="transaction-card__item">
      <p class="transaction-card__label">
        {{ $t('transactions.to') }}
      </p>
      <p class="transaction-card__value">
        {{ transaction.to }}
      </p>
    </div>
    <div class="transaction-card__item">
      <p class="transaction-card__label">
        {{ $t('transactions.amount') }}
      </p>
      <p class="transaction-card__value">
        {{ transaction.amount }} {{ transaction.symbol }}
      </p>
    </div>
  </div>
</template>

<script>
import MainMixin from '~/mixins/MainMixin'

export default MainMixin.extend({
  name: 'TransactionCard',
  props: {
    transaction: {
      type: Object,
      required: true
    }
  }
})
</script>

<style lang="scss">
  .transaction-card {
    display: grid;
    grid-template-columns: 44px repeat(4, 1fr);
    grid-column-gap: 20px;
    align-items: center;
    padding: 20px;
    background: $transaction-card-bg;
    border-radius: 14px;
    &__badge {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 44px;
      height: 44px;
      border-radius: 10px;
      background: $transaction-badge-bg;
    }
    &__type {
      color: $main-text-color;
      font-weight: 600;
      font-size: 18px;
      line-height: 22px;
    }
    &__label {
      color: $fields-placeholeder-text;
      font-weight: normal;
      font-size: 14px;
      line-height: 17px;
      margin-bottom: 5px;
    }
    &__value {
      color: $main-text-color;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
    }
  }
</style>
