<template>
    <nav>
        <ul class="pagination justify-content-center">
            <paginator-item :disabled="current <= 0" v-on:click="first">
                <i class="fas fa-angle-double-left"></i>
            </paginator-item>
            <paginator-item :disabled="current <= 0" v-on:click="decrease">
                <i class="fas fa-angle-left"></i>
            </paginator-item>
            <paginator-item v-for="(item, index) in items" :key="index" :active="item === current"
                v-on:click="select(item)">
                {{ item + 1 }}
            </paginator-item>
            <paginator-item :disabled="current >= total - 1" v-on:click="increase">
                <i class="fas fa-angle-right"></i>
            </paginator-item>
            <paginator-item :disabled="current >= total - 1" v-on:click="last">
                <i class="fas fa-angle-double-right"></i>
            </paginator-item>
        </ul>
    </nav>
</template>
<script>
import PaginatorItem from "./PaginatorItem"
export default {
    name:"Paginator",
     components: {
    'paginator-item': PaginatorItem
  },
  props: {
    total: Number,
    current: Number
  },
  data: function data() {
    return {
      chunkSize: 10
    };
  },
  computed: {
    totalChunks: function totalChunks() {
      return Math.ceil(this.total / this.chunkSize);
    },
    currentChunk: function currentChunk() {
      return Math.floor(this.current / this.chunkSize);
    },
    items: function items() {
      var first = this.currentChunk * this.chunkSize;
      var len =
        first + this.chunkSize > this.total
          ? this.total - first
          : this.chunkSize;
      return Array(len)
        .fill(0)
        .map(function (e, i) {
          return first + i;
        });
    }
  },
  methods: {
    select: function select(item) {
      if (item === this.current) return;
      this.$emit("select", item);
    },
    increase: function increase() {
      this.$emit("select", this.current + 1);
    },
    decrease: function decrease() {
      this.$emit("select", this.current - 1);
    },
    first: function first() {
      this.$emit("select", 0);
    },
    last: function last() {
      this.$emit("select", this.total - 1);
    }
  }
}
</script>