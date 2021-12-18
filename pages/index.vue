<template>
  <div class="main-page">
    <balance-card />
  </div>
</template>

<script lang="ts">
import MainMixin from '~/mixins/MainMixin'
import BalanceCard from '~/components/App/BalanceCard/index.vue'

export default MainMixin.extend({
  name: 'MainPage',
  components: {
    BalanceCard
  }
})
</script>

<style lang="scss" scoped>
  .main-page {

  }
</style>
