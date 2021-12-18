<template>
  <div class="primary">
    <div class="primary__template template">
      <div class="template__header">
        <app-header
          class="template-header"
          @sidebar:open="openSidebar"
          @init-wallet="initMetaMask"
        />
      </div>
      <mobile-sidebar
        class="default-sidebar"
        :class="{'default-sidebar_hide': !isSidebarShown}"
        @sidebar:close="closeSidebar"
      >
        <template #appendItem>
          <base-btn @click="initMetaMask">
            {{ $t('header.connectWallet') }}
          </base-btn>
        </template>
      </mobile-sidebar>
      <div class="template__content">
        <nuxt />
      </div>
    </div>
    <base-modal-container />
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import MainMixin from '~/mixins/MainMixin'
import AppHeader from '~/components/App/Header/index.vue'
import MobileSidebar from '~/components/ui/MobileSeibebar/index.vue'

export default MainMixin.extend({
  components: {
    MobileSidebar,
    AppHeader
  },
  data () {
    return {
      isSidebarShown: false
    }
  },
  computed: {
    ...mapGetters({
      loading: 'main/getLoadingStatus'
    })
  },
  watch: {
    loading (val) {
      if (val) {
        this.$nuxt.$loading.start()
      } else {
        this.$nuxt.$loading.finish()
      }
    }
  },
  methods: {
    openSidebar () {
      this.isSidebarShown = true
    },
    closeSidebar () {
      this.isSidebarShown = false
    },
    initMetaMask () {
      console.log('init')
    }
  }
})
</script>

<style lang="scss" scoped>
.primary {
  font-family: 'Montserrat', sans-serif;
  color: #333333;
}
.template {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: $default-background;
  &__header {
    border-bottom: 1px solid $header-border;
  }
  &__content {
    width: 100%;
    max-width: 1170px;
    position: relative;
    flex-grow: 1;
    z-index: 120;
    margin: 30px auto;
    background: $default-background;
    &_mt {
      margin-top: 91px;
    }
  }
  &__footer {

  }
}

.template-header {
  max-width: 1170px;
  margin: 0 auto;
}

.default-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 1025;
  transition: .3s;
  &_hide {
    right: -100%;
  }
}
</style>
