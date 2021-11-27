<template>
  <div
    v-click-outside="closeSelect"
    class="base-select"
  >
    <div
      class="base-select__preview"
      :class="{
        'base-select__preview_rounded': rounded,
        'base-select__preview_transparent': isTransparent
      }"
    >
      <slot
        v-if="$slots.prepend || prependText"
        name="prepend"
      >
        <div class="base-select__prepend">
          <div class="base-select__prepend-text">
            {{ prependText }}
          </div>
        </div>
      </slot>

      <button
        class="base-select__button"
        :class="{'base-select__button_disabled': disabled}"
        :disabled="disabled"
        type="button"
        @click="toggleSelect"
      >
        <p
          v-if="value"
          class="base-select__value"
        >
          {{ selectedValue }}
        </p>
        <p
          v-else
          class="base-select__value_muted"
        >
          {{ placeholder }}
        </p>
        <slot name="icon">
          <i
            class="icon-arrow base-select__arrow"
            :class="{'base-select__arrow_up': isOpened}"
          />
        </slot>
      </button>

      <slot
        v-if="$slots.append"
        name="append"
      />
    </div>

    <div
      :class="{'base-select-list_show': isOpened}"
      class="base-select__list base-select-list"
    >
      <div
        v-if="$slots.optionsHeader"
        class="base-select-list__header"
      >
        <div class="base-select-list__btn">
          <slot name="optionsHeader" />
        </div>
        <div class="base-select-list__devider" />
      </div>
      <div
        v-for="item in options"
        :key="item.value"
        class="base-select-list__item"
      >
        <button
          type="button"
          class="base-select-list__btn"
          @click="selectOption(item.value)"
        >
          <slot
            v-if="$slots.optionPrepend"
            name="optionPrepend"
          />
          <span>{{ item.text }}</span>
          <slot
            v-if="$slots.optionAppend"
            name="optionAppend"
          />
        </button>

        <!-- <div class="base-select-list__devider" /> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ts-ignore
import ClickOutside from 'vue-click-outside'
import { PropType } from 'vue'
import MainMixin from '~/mixins/MainMixin'

export interface ISelectOption {
  text: string,
  value: string | number,
}

export type ISelectOptions = Array<ISelectOption> | []

export default MainMixin.extend({
  name: 'BaseSelect',
  directives: {
    ClickOutside
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    rounded: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array as PropType<ISelectOptions>,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    },
    prependText: {
      type: String,
      default: ''
    },
    isTransparent: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isOpened: false,
      selectedValue: ''
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (value, oldValue) {
        if (value !== oldValue) {
          this.selectedValue = this.options?.find((i: ISelectOption) => i.value === this.value)?.text ?? ''
        }
      }
    }
  },
  methods: {
    toggleSelect () {
      this.isOpened = !this.isOpened
    },
    closeSelect () {
      this.isOpened = false
    },
    selectOption (value: string|number) {
      this.$emit('input', value)
      this.closeSelect()
    }
  }
})
</script>

<style lang="scss" scoped>
  .base-select {
    position: relative;
    font-weight: 600;
    &__preview {
      display: flex;
      align-items: center;
      height: 46px;
      background-color: $fields;
      border: 1px solid $select-border;
      &_rounded {
        border-radius: 14px;
      }
      &_transparent {
        background-color: transparent;
      }
    }

    &__button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      padding: 0 15px;
      &_disabled {
        background-color: $fields;
      }
    }
    &__value {
      font-size: 16px;
      font-weight: 600;
      line-height: 23px;
      color: $fields-text;
      &_muted {
        color: $fields-text;
      }
    }
    &__arrow {
      font-size: 24px;
      transition: .4s;
      margin-left: 10px;
      color: $select-arrow;
      &_up {
        transform: rotate(180deg);
      }
    }
    &__list {
      position: absolute;
      top: 115%;
      left: 0;
      right: 0;
    }
    &__prepend {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 15px;
      white-space: nowrap;
      background-color: $fields;
      border-right: 1px solid $fields-border;
      border-radius: 10px;
    }
    &__prepend-text {
      font-size: 16px;
      line-height: 23px;
    }
  }
  .base-select-list {
    display: flex;
    flex-direction: column;
    max-height: 400px;
    overflow: auto;
    background-color: $fields;
    border: 1px solid $select-border;
    border-radius: 14px;
    box-shadow: $select-shadow;
    visibility: hidden;
    opacity: 0;
    padding: 8px 0;
    &_show {
      z-index: 10000;
      opacity: 1;
      visibility: visible;
      transition: visibility .4s, opacity .4s;
    }
    &__header {
      min-height: 43px;
      font-size: 16px;
      line-height: 23px;
      color: $fields-text;
    }
    &__item {
      // min-height: 43px;
      font-size: 16px;
      line-height: 23px;
      color: $select-text;
      &:hover {
        background-color: $fields;
        color: $fields-text;
      }
    }
    &__btn {
      width: 100%;
      height: 100%;
      padding: 5px 15px;
      text-align: left;
      color: $select-text;
      &:hover {
        color: $fields-text;
      }
    }
    &__devider {
      height: 1px;
      background-color: $fields-border;
      margin: 0 15px
    }
  }
</style>
