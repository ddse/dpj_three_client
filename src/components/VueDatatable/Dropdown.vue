<template>
  <div class="dropdown">
    <button
      class="btn btn-primary dropdown-toggle"
      type="button"
      :id="buttonId"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      @click="state = !state"
    >
      {{ current }}
    </button>
    {{ this.state }}
    <div class="dropdown-menu-table" :aria-labelledby="buttonId" v-if="state">
      <a
        class="dropdown-item"
        v-for="item in items"
        :key="item"
        href="#"
        v-on:click="select(item, $event)"
      >
        {{ item }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    current: Number,
  },
  data() {
    return {
      buttonId: "dropdownMenuButton-" + this._uid,
      state: false,
    };
  },
  methods: {
    select(item, event) {
      event.preventDefault();
      this.state = false;
      this.$emit("select", item);
    },
  },
};
</script>
<style lang="scss">
.dropdown-menu-table {
  display: block;
  z-index: 99999;
  position: absolute;
  left: 0;
  border: 1px solid;
  a {
    border-bottom: 1px solid;
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>