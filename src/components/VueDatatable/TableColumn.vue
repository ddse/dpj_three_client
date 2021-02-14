<template>
  <div v-if="false"><slot :name="prop"></slot></div>
</template>

<script>
export default {
  name: "TableColumn",
  props: {
    label: String,
    prop: String,
    width: [Number, String],
    type: String,
    sortable: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: String,
      default: "", // left/right
    },
    align: {
      type: String,
      default: "center",
      validator: function validator(val) {
        return ["left", "center", "right"].indexOf(val) > -1;
      },
    },
    filter: {
      type: Boolean,
      default: false,
    },
    renderHeader: [Function],
    renderCell: [Function],
    colspan: [Number, String],
    rowspan: [Number, String],
    hide: {
      type: Boolean,
      default: false,
    },
    tooltip: {
      type: Boolean,
      default: false,
    },
    attrs: {
      type: Object,
      default: {},
    },
  },
};
</script>