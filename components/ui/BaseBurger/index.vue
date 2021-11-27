<template>
  <button
    class="m-menu-btn"
    @click="$emit('click', $event)"
  >
    <span
      class="m-menu-btn__burger"
      :class="transparent ? 'm-menu-btn__burger_white' : 'm-menu-btn__burger_black'"
    />
  </button>
</template>

<script lang="ts">
import MainMixin from '~/mixins/MainMixin'

export default MainMixin.extend({
  name: 'BaseBurger',
  props: {
    transparent: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss" scoped>
  .m-menu-btn {
    position: relative;
    width: 50px;
    height: 30px;
    background-color: transparent;
    &__burger {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -3px;
      margin-left: -10px;
      width: 20px;
      height: 3px;
      &::before, &::after {
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -2px;
        margin-left: -10px;
        width: 20px;
        height: 3px;
      }
      &_white {
        background-color: $burger-bg-transparent;
        &::before, &::after {
          background-color: $burger-bg-transparent;
        }
      }
      &_black {
        background-color: $burger-bg;
        &::before, &::after {
          background-color: $burger-bg;
        }
      }
      &::before {
        content: '';
        transform: translateY(-6px);
      }
      &::after {
        content: '';
        transform: translateY(6px);
      }
    }
  }
</style>
