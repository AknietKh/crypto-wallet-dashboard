<template>
  <div
    v-if="Object.hasOwnProperty.call(item, 'childs')"
    class="sidebar-sub"
    @click.stop
  >
    <input
      :id="$t(item.title)"
      v-model="isOpenChild"
      type="checkbox"
      class="sidebar-sub__input"
    >
    <label
      class="sidebar-sub__heading"
      :for="$t(item.title)"
    >
      {{ $t(item.title) }}
      <div
        class="sidebar-sub__arrow"
        :class="{'sidebar-sub__arrow_up': isOpenChild}"
      />
    </label>
    <b-collapse v-model="isOpenChild">
      <div class="sidebar-sub__item">
        <span
          v-for="(childMore, j) in item.childs"
          :key="j"
          class="sidebar-sub__link"
          @click="toPage(childMore.link)"
        >
          {{ $t(childMore.title) }}
        </span>
      </div>
    </b-collapse>
  </div>
  <span
    v-else
    class="sidebar-link"
    @click="toPage(item.link)"
  >
    {{ $t(item.title) }}
  </span>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isOpenChild: false
    }
  },
  methods: {
    toPage (link) {
      this.$router.push(link)
      this.$emit('sidebar:close')
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar-link {
  &:hover {
    cursor: pointer;
  }
}
.sidebar-sub {
  width: 100%;
  &__heading {
    display: grid;
    grid-template-columns: max-content 30px;
  }
  &__input {
    display: none;
  }
  &__item {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
  }
  &__link {
    padding: 5px 0;
    color:$main-text-color;
  }
  &__arrow {
      font-size: 24px;
      transition: .4s;
      &_up {
        transform: rotate(180deg);
      }
    }
}
</style>
