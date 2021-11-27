<template>
  <div class="sidebar">
    <div class="sidebar__header">
      <p
        class="sidebar__close"
        @click="closeSidebar"
      >
        ×
      </p>
    </div>
    <div class="sidebar__items">
      <div
        v-for="(item, i) in nav"
        :key="i"
        class="sidebar__item"
      >
        <mobile-sidebar-item
          :item="item"
          @sidebar:close="closeSidebar"
        />
      </div>

      <div
        v-if="$slots.appendItem"
        class="sidebar__item"
        :class="appendItemClasses"
      >
        <slot name="appendItem" />
      </div>
    </div>
  </div>
</template>

<script>
import MobileSidebarItem from './MobileSidebarItem'

export default {
  name: 'Sidebar',
  components: { MobileSidebarItem },
  props: {
    nav: {
      type: Array,
      default: () => ([])
    },
    appendItemClasses: {
      type: [Array, Object, String],
      default: ''
    }
  },
  methods: {
    closeSidebar () {
      this.$emit('sidebar:close')
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  min-width: 100%;
  width: 100%;
  border: none !important;
  background: $default-background;
  &__header {
    display: flex;
    justify-content: flex-end;
  }
  &__close {
    margin: 15px 30px;
    font-size: 30px;
    &:hover {
      cursor: pointer;
    }
  }
  &__items {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 24px;
    padding: 0 15px;
  }
  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $main-text-color;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    letter-spacing: 145%;
  }
  &__link {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
