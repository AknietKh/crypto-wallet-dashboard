<template>
  <validation-provider
    ref="baseInputProvider"
    v-slot="{errors, valid, invalid, validated}"
    :rules="rules"
    :name="name"
    v-bind="$attrs"
  >
    <div
      class="base-input"
      :class="[
        {'base-input_invalid': validated && invalid, 'base-input_described': label},
        wrapperClasses
      ]"
    >
      <slot name="label">
        <label
          v-if="label"
          class="base-input__label"
          :class="labelClasses"
          :for="id"
        >
          {{ label }}
        </label>
      </slot>
      <div
        class="base-input-group"
        :class="[
          {'input-group': group},
          {'base-input-group_rounded': rounded},
          {'base-input-group_valid': valid && validated && successMessage},
          {'base-input-group_invalid': invalid && validated},
          {'base-input-group_focus': focused},
          {'base-input-group_disabled': disabled},
          inputGroupClasses
        ]"
      >
        <div
          v-if="prependIcon || $slots.prependIcon"
          class="base-input-group__prepend-icon"
        >
          <slot name="prependIcon">
            <i :class="prependIcon" />
          </slot>
        </div>

        <div
          v-if="$slots.prependBtn"
          class="base-input-group__prepend"
        >
          <slot name="prependBtn" />
        </div>

        <slot
          v-bind="slotData"
          :errors="errors"
          :classes="[
            {'base-input-group__input_rounded': rounded},
            {'base-input-group__input_valid': valid && validated && successMessage},
            {'base-input-group__input_invalid': invalid && validated},
            'base-input-group__input',
            inputClasses
          ]"
        >
          <input
            :id="id"
            :type="type"
            v-bind="$attrs"
            :valid="valid"
            :required="required"
            :disabled="disabled"
            :placeholder="placeholder"
            class="base-input-group__input"
            :class="[
              {'base-input-group__input_rounded': rounded},
              {'base-input-group__input_valid': valid && validated && successMessage},
              {'base-input-group__input_invalid': invalid && validated},
              inputClasses
            ]"
            v-on="listeners"
          >
        </slot>

        <div
          v-if="appendIcon || $slots.appendIcon"
          class="base-input-group__append-icon"
        >
          <slot name="appendIcon">
            <i :class="appendIcon" />
          </slot>
        </div>

        <div
          v-if="$slots.appendBtn"
          class="base-input-group__append"
        >
          <slot name="appendBtn" />
        </div>

        <slot name="infoBlock" />
      </div>

      <slot name="success">
        <div
          v-if="valid && validated && successMessage"
          class="base-input__feedback base-input__feedback_valid"
        >
          {{ successMessage }}
        </div>
      </slot>
      <slot name="error">
        <div
          v-if="errors[0]"
          class="base-input__feedback base-input__feedback_invalid"
        >
          {{ errors[0] }}
        </div>
      </slot>
    </div>
  </validation-provider>
</template>

<script lang="ts">
import MainMixin from '~/mixins/MainMixin'

export default MainMixin.extend({
  name: 'BaseInput',
  inheritAttrs: false,
  props: {
    required: {
      type: Boolean
    },
    label: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    rounded: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    successMessage: {
      type: String,
      default: ''
    },
    wrapperClasses: {
      type: String,
      default: ''
    },
    labelClasses: {
      type: String,
      default: 'form-control-label'
    },
    inputClasses: {
      type: String,
      default: ''
    },
    inputGroupClasses: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    appendIcon: {
      type: String,
      default: ''
    },
    prependIcon: {
      type: String,
      default: ''
    },
    rules: {
      type: [String, Array, Object],
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      focused: false
    }
  },
  computed: {
    listeners (): Record<string, unknown> {
      return {
        ...this.$listeners,
        input: this.updateValue,
        focus: this.onFocus,
        blur: this.onBlur
      }
    },
    slotData (): Record<string, unknown> {
      return {
        focused: this.focused,
        error: this.error,
        ...this.listeners
      }
    },
    group (): boolean {
      const { appendBtn, prependBtn } = this.$slots
      return appendBtn !== undefined || prependBtn !== undefined
    }
  },
  methods: {
    updateValue (evt: InputEvent): void {
      const { value } = evt.target as HTMLInputElement
      this.$emit('input', value)
    },
    onFocus (evt: Event): void {
      this.focused = true
      this.$emit('focus', evt)
    },
    onBlur (evt: Event): void {
      this.focused = false
      this.$emit('blur', evt)
    }
  }
})
</script>

<style lang="scss">
  .base-input {
    display: flex;
    flex-direction: column;
    &_described {
      height: 95px;
    }
    // &_invalid {

    // }
    &__label {
      font-size: 16px;
      line-height: 145%;
      color: $label;
    }
    &__feedback {
      min-height: 12px;
      font-size: 12px;
      &_valid {
        color: $validate-success;
      }
      &_invalid {
        color: $validate-danger;
      }
    }
  }

  .base-input-group {
    width: 100%;
    height: 46px;
    display: flex;
    background-color: $fields;
    color: $fields-text;
    &_rounded {
      border-radius: 14px;
    }
    &_invalid {
      background-color: $fields;
      border: 1px solid $fields-botder-danger;
    }
    &_valid {
      background-color: $fields;
    }
    &_focus {
      background-color: $fields-focused;
      border: 1px solid $fields-border;
      color: $fields-text;
    }
    &_disabled {
      background-color: $fields;
    }
    &__input {
      width: 100%;
      height: 100%;
      padding: 8px 15px;
      font-size: 16px;
      line-height: 23px;
      border: none;
      outline: none;
      background-color: $fields;
      &_rounded {
        border-radius: 10px;
      }
      &_invalid {
        background-color: $fields;
      }
      &_valid {
        background-color: $fields;
      }
      &:focus {
        background-color: $fields-focused;
        border-color: $fields-border;
        color: $fields-text;
      }
      &::placeholder {
        font-size: 16px;
        line-height: 23px;
        color: $fields-placeholeder-text;
      }
      &:disabled::placeholder {
        color: $fields-placeholeder-text;
      }
    }
    &__prepend {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
    &__prepend-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      margin-left: 15px;
      font-size: 24px;
    }
    &__append {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
    &__append-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      margin-right: 15px;
      font-size: 24px;
    }
  }
</style>
