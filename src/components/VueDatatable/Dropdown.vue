<template>
  <div class="dropdown">
    <button
      class="btn btn-primary dropdown-toggle"
      type="button"
      :id="buttonId"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
      :class="statuts ? 'aaa' : 'vvv'"
      v-on:click="statuts = !statuts"
    >
      {{ current }}
    </button>
    <div class="dropdown-menu" :aria-labelledby="buttonId" v-if="statuts">
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
  name: "Dropdown",
  props: {
    items: Array,
    current: Number,
  },
  data: function data() {
    return {
      buttonId: "dropdownMenuButton-" + this._uid,
      statuts: false,
    };
  },
  methods: {
    select: function select(item, event) {
      event.preventDefault();
      this.statuts = !this.statuts;
      this.$emit("select", item);
    },
  },
};
</script>