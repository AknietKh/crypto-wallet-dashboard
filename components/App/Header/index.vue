<template>
  <div
    class="menu"
    :class="[
      {'menu_transparent': transparent},
    ]"
  >
    <div class="menu__l">
      <nuxt-link
        to="/"
        class="menu__logo"
      >
        <img
          :src="Require(SwitchTheme('logo-white-mode.svg', 'logo-dark-mode.svg'))"
          alt="Logo"
        >
      </nuxt-link>
      <div class="menu__navs">
        <nuxt-link
          v-for="(item, i) in nav"
          :key="i"
          :to="item.link"
          class="menu__nav"
          exact-active-class="menu__nav_active"
        >
          {{ $t(item.title) }}
        </nuxt-link>
      </div>
    </div>
    <div class="menu__r">
      <locale-switch />
      <switch-theme />
      <base-btn
        @click="$emit('init-wallet')"
      >
        {{ false ? $t('header.connectedWallet') : $t('header.connectWallet') }}
      </base-btn>
    </div>

    <base-burger
      class="menu__mobile"
      :transparent="transparent"
      @click="$emit('sidebar:open')"
    />
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'
import { PropType } from 'vue'
import MainMixin from '~/mixins/MainMixin'
import BaseBurger from '~/components/ui/BaseBurger/index.vue'
import LocaleSwitch from '~/components/App/LocaleSwitch/index.vue'
import SwitchTheme from '~/components/App/SwitchTheme/index.vue'

export interface IHeaderNavbar {
  link: string,
  title: string,
}

type HeaderNabarArray = Array<IHeaderNavbar>

export default MainMixin.extend({
  components: {
    BaseBurger,
    LocaleSwitch,
    SwitchTheme
  },
  props: {
    transparent: {
      type: Boolean,
      default: false
    },
    nav: {
      type: Array as PropType<HeaderNabarArray>,
      default: () => []
    },
    sticky: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters({
    })
  }
})
</script>

<style lang="scss" scoped>
.menu {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 90px;
  transition: all .2s ease-in-out;
  &_transparent {
    background: rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
  &__mobile {
    display: none;
  }
  &__l {
    display: flex;
    align-items: center;
    height: 100%;
  }
  &__r {
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-column-gap: 20px;
  }
  &__navs {
    display: flex;
    align-items: center;
    height: 100%;
    margin-left: 64px;
  }
  &__nav {
    display: flex;
    align-items: center;
    border-bottom: 2px solid transparent;
    border-top: 2px solid transparent;
    color: $main-text-color;
    text-decoration: none;
    &:not(:last-child) {
      margin-right: 40px;
    }
    &_active {
      color: $link-active;
      border-bottom-color: $link-active;
    }
  }
}

@include _1199 {
  .menu {
    padding: 0 30px;
    &__navs {
      margin-left: 44px;
    }
    &__nav {
      &:not(:last-child) {
      margin-right: 30px;
    }
    }
  }
}

@include _991 {
  .menu {
    padding: 0 20px;
    &__navs {
      display: none;
    }
    &__r {
      display: none;
    }
    &__mobile {
      display: block;
    }
  }
}
</style>
