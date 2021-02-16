
<!-- <template id="vue2-simple-datatable"> -->
<template>
  <div class="vue-datatable">
    <div v-if="config.limits || config.exportButton" class="row mb-2">
      <div class="col-lg-12">
        <dropdown
          v-if="config.limits && this.paging"
          class="float-right ml-2"
          :items="config.limits"
          :current="config.limit"
          v-on:select="setLimit"
        >
        </dropdown>
        <button
          v-if="config.exportButton"
          class="btn btn-secondary float-right"
          type="button"
          v-on:click="exportData"
        >
          <i class="fas fa-file-download"></i>
          <span v-if="i18n.export && i18n.export.length > 0" class="ml-1">
            {{ i18n.export }}
          </span>
        </button>
      </div>
    </div>
    <div
      class="tablewrapper"
      :class="!scrollVertical && !scrollHorizontal ? '' : 'tablewrapperscroll'"
    >
      <div
        v-for="(position, index) in positionTable"
        :key="index"
        :class="position == '' ? 'normal' : 'table' + position"
      >
        <table
          class="table table-striped"
          :ref="'table' + position"
          :class="
            !scrollVertical && !scrollHorizontal
              ? {}
              : {
                  scrolly: 'scrollVertical',
                  scrollx: 'scrollHorizontal',
                  scrolling: 'scrolling',
                }
          "
          :style="position == '' ? tableStyle : ''"
          v-if="
            typeof columnsTemp[position] != 'undefined' &&
            columnsTemp[position].length > 0
          "
        >
          <thead
            :ref="'thead' + position"
            :class="{ scrollsync: syncHeaderScroll }"
            :style="theadStyle"
            @dragenter="onDragEnterHeader"
            @dragover.prevent="onDragOverHeader"
            @drop="onDropHeader"
          >
            <slot :name="'theaderbefore' + position" :height="colFilterHeight">
            </slot>
            <slot :name="'theader' + position">
              <tr>
                <th
                  v-for="(column, index) in columnsTemp[position]"
                  :key="index"
                  :colspan="column.propsData.colspan"
                  :rowspan="column.propsData.rowspan"
                  :style="headerStyle(column)"
                  v-bind="column.propsData.attrs"
                >
                  <slot
                    :name="'header' + column.propsData.prop"
                    :column="column.propsData"
                  >
                    <a
                      class="text-dark btn"
                      href="#"
                      v-on:click="sortBy(column.propsData.prop, $event)"
                      v-if="column.propsData.sortable"
                    >
                      {{ renderHeader(column, index) }}
                      <i v-bind:class="sortIconClasses(column)"></i>
                    </a>
                    <template v-else>
                      {{ renderHeader(column, index) }}
                    </template>
                  </slot>
                </th>
              </tr>
              <tr v-if="openfiltter" class="filter">
                <th
                  v-for="(column, index) in columnsTemp[position]"
                  :key="index"
                  scope="col"
                  :style="{
                    height: colHeight + 'px',
                    width: column.propsData.width + 'px',
                  }"
                >
                  <div class="input-group" v-if="column.propsData.filter">
                    <input
                      type="text"
                      class="form-control"
                      v-model.lazy="search[column.propsData.prop]"
                      v-debounce="500"
                      v-bind:placeholder="filterByText(column.propsData.prop)"
                    />
                  </div>
                </th>
              </tr>
            </slot>
            <slot :name="'theaderafter' + position" :height="colFilterHeight">
            </slot>
          </thead>
          <tbody :ref="'tbody' + position" :style="tbodyStyle">
            <slot
              :name="'datanone' + position"
              :height="colHeight"
              v-if="rows.length <= 0"
            ></slot>
            <template v-else>
              <tr v-for="(row, index) in rows" :key="index">
                
                <!-- <template v-if="show"> -->
                  <td
                    v-for="(column, index) in columnsTemp[position]"
                    :key="column + index"
                    :class="column.propsData.prop"
                    :style="tcellStyle(column)"
                    :tooltip="
                      column.propsData.tooltip ? row[column.propsData.prop] : ''
                    "
                  >
                    <slot
                      :name="column.propsData.prop"
                      :value="row[column.propsData.prop]"
                      :row="row"
                      :column="column.propsData.prop"
                    >
                      {{ renderCell(column, row, index) }}

                      <!-- {{ typeof column.propsData.renderCell != 'function' ? renderCell(column, row, index) : ''}} -->
                      <!-- {{renderCell(column, row, index)}} -->
                    </slot>
                  </td>
                <!-- </template> -->
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
    padidng {{this.paging}}
    <paginator
      :total="totalPages"
      :current="currentPage"
      v-on:select="selectPage"
      v-if="this.paging"
    >
    </paginator>
    <p class="small text-center" v-if="this.paging">{{ countText }}</p>
  </div>
</template>
<script>
import Vue from "vue";
import Paginator from "./Paginator";
import Dropdown from "./Dropdown";
import {debounce, _readOnlyError} from "./helper";
// import debounce from "./debounce"
export default {
  name: "VueDatatable",
  components: {
    paginator: Paginator,
    dropdown: Dropdown,
  },
  directives: {
    debounce: debounce,
  },
  props: {
    data: {
      // type: Array,
      // default: []
      require: true,
    },
    initialSearch: Object,
    deadAreaColor: {
      type: String,
      required: false,
      default: "#fff",
    },
    includeFooter: {
      type: Boolean,
      required: false,
      default: false,
    },
    syncHeaderScroll: {
      type: Boolean,
      required: false,
      default: true,
    },
    syncFooterScroll: {
      type: Boolean,
      required: false,
      default: true,
    },
    scrollHorizontal: {
      type: Boolean,
      required: false,
      default: true,
    },
    scrollVertical: {
      type: Boolean,
      required: false,
      default: true,
    },
    colHeight: {
      type: [Number, String],
      default: 40,
    },
    maxRowScroll: {
      type: [Number, String],
      default: 1,
    },
    paging: {
      default: false,
    },
    common: {},
  },
  data: function data() {
    return {
      currentPage: 0,
      sort: undefined,
      ascending: true,
      // false = descending
      search: this.initialSearch,
      config: {
        limit: 10,
        limits: [10, 25, 50, 100],
        regexSearch: false,
        exportButton: false,
      },
      i18n: {
        countPagedN: "Showing {from} to {to} of {count} records",
        countN: "{count} records",
        count1: "One record",
        count0: "No records",
        filterBy: "Filter by {column}",
        export: "Export",
      },
      columnsTemp: [],
      leftColumnsTemp: [],
      rightColumnsTemp: [],
      selectionColumnTemp: [],
      scrollType: "",
      scrollTop: 0,
      self: {},
      positionTable: ["left", "", "right"],
      //''=>normal
      openfiltter: false,
      colFilterHeight: 0,
      tableFixHeight: 0,
      tableFixWidth: 0,
      // tableFixTheadHeight: 0,
      scrollWidth: 0,
      // show: true,
      theadRowMax: 0,
      theadRowleft: 0,
      theadRowright: 0,
      theadRow: 0,
      slottheader: false,
    };
  },
  computed: {
    totalPages: function totalPages() {
      return Math.ceil(this.total / this.config.limit);
    },
    searchFuncs: function searchFuncs() {
      var _this = this;

      var keys = Object.keys(this.search);
      var result = {};
      keys.forEach(function (key) {
        var searchString = _this.search[key];
        if (!searchString) return;
        result[key] = _this.createSearcFuncs(searchString);
      });
      return result;
    },
    tbodyStyle: function tbodyStyle() {
      if (!this.scrollHorizontal) {
        return [];
      }

      var style = [
        {
          "overflow-x": "scroll",
        },
      ];

      if (this.rows.length > this.maxRowScroll) {
        style.push({
          // "padding-bottom": this.colHeight + this.scrollbarSize + "px",
        });
        style.push({
          "max-height": this.colHeight * this.maxRowScroll - 1 + "px",
        });
        style.push({
          "overflow-y": "scroll",
        });
      }

      return style;
    },
    theadStyle: function theadStyle() {
      if (!this.scrollHorizontal) {
        return [];
      }

      var style = [];
      if (this.position == "" && this.syncHeaderScroll && this.scrollVertical)
        style.push(this.stubScrollbarStyle);
      if (this.rows.length > this.maxRowScroll)
        style.push({
          "overflow-y": "scroll",
        });
      return style;
    },
    filteredData: function filteredData() {
      //localdata=>data
      // this.localdata = [];
      if (Object.prototype.toString.call(this.data) === '[Array]') {
        var array = this.data.map(function (value) {
          return [value];
        });
        // this.data = array;
        return array;
      }

      if (this.data != null) {
        var search = this.searchFuncs;
        var searchedCols = Object.keys(search);

        var colMatch = function colMatch(row, colName) {
          var colVal = row[colName];
          return search[colName](colVal);
        };

        var rowMatch = function rowMatch(row) {
          return !searchedCols.some(function (col) {
            return !colMatch(row, col);
          });
        };

        // if (this.show)
          return this.data.filter(function (row) {
            return rowMatch(row);
          });
      }
      return this.data;
    },
    filteredAndSortedData: function filteredAndSortedData() {
      var rows = this.filteredData;

      if (this.sort) {
        var col = this.sort;

        if (this.ascending) {
          rows.sort(function (a, b) {
            return (a[col] > b[col]) - (a[col] < b[col]);
          });
        } else {
          rows.sort(function (b, a) {
            return (a[col] > b[col]) - (a[col] < b[col]);
          });
        }
      }

      return rows;
    },
    rows: function rows() {
      var all = this.filteredAndSortedData;
      return this.paging
        ? all.slice(this.offset, this.offset + this.config.limit)
        : all;
    },
    total: function total() {
      return this.filteredData.length;
    },
    offset: function offset() {
      return this.config.limit * this.currentPage;
    },
    countText: function countText() {
      if (this.totalPages === 1) {
        if (this.total === 0) return this.i18n.count0;
        if (this.total === 1) return this.i18n.count1;
        return this.i18n.countN.replace("{count}", this.total);
      }

      return this.i18n.countPagedN
        .replace("{from}", this.offset + 1)
        .replace("{to}", this.offset + this.config.limit)
        .replace("{count}", this.total);
    },
    tableStyle: function tableStyle() {
      return "background-color: " + this.deadAreaColor + ";";
    },
    stubScrollbarStyle: function stubScrollbarStyle() {
      return (
        "background-color: " +
        this.deadAreaColor +
        ";\n          scrollbar-base-color: " +
        this.deadAreaColor +
        ";\n          scrollbar-face-color: " +
        this.deadAreaColor +
        ";\n          scrollbar-highlight-color: " +
        this.deadAreaColor +
        ";\n          scrollbar-track-color: " +
        this.deadAreaColor +
        ";\n          scrollbar-arrow-color: " +
        this.deadAreaColor +
        ";\n          scrollbar-shadow-color: " +
        this.deadAreaColor +
        ";\n          scrollbar-darkshadow-color: " +
        this.deadAreaColor +
        ";"
      );
    },
    scrollbarSize: function scrollbarSize() {
      if (
        this.$refs["tbody"] != undefined &&
        this.$refs["tbody"][0] != undefined
      )
        return (
          this.$refs["tbody"][0].scrollHeight -
          this.$refs["tbody"][0].offsetHeight
        );
      return 17;
    },
  },
  watch: {
    data: {
      handler: function handler() {
        this.resetState();
      },
      deep: true,
    },
    columns: {
      handler: function handler() {
        this.resetState();
      },
      deep: true,
    },
    initialSearch: {
      handler: function handler(newVal) {
        // this.search = Object.assign({}, newVal);
        this.search = Object.assign({}, newVal);
      },
      deep: true,
      immediate: true,
    },
    filteredData: function filteredData() {
      this.currentPage = 0;
      return [];
    },
    deadAreaColor: function deadAreaColor() {
      this.setColors();
    },
    scrollTop: {
      handler: function handler(newVal) {
        debounce(this.updateOtherSyncedScroll(newVal), 0);
      },
      deep: true,
    },
  },
  methods: {
    tcellStyle: function tcellStyle(column) {
      var style = {
        height: this.colHeight + "px",
      };

      if (column.propsData != undefined) {
        Object.assign(style, {
          "min-width": column.propsData.minwidth + "px",
          width: column.propsData.width + "px",
        });

        if (column.propsData.attrs.style != undefined) {
          style = Object.assign(style, column.propsData.attrs.style);
        }
      }

      return style;
    },
    headerStyle: function headerStyle(column) {
      var _return = {
        height: this.colHeight + "px",
        "min-width": column.propsData.minwidth + "px",
        width: column.propsData.width + "px",
      };

      if (column.propsData.attrs.style != undefined) {
        _return = Object.assign(_return, column.propsData.attrs.style);
      }

      return _return;
    },
    fixTableSize: function fixTableSize(position) {
      var height =
        position != "" && this.tableFixHeight > 0
          ? this.tableFixHeight + "px"
          : "";
      var width =
        position != "" && this.tableFixWidth > 0
          ? this.tableFixWidth + "px"
          : "";
      var style = {
        height: height,
        width: width,
        top:
          (this.theadRowMax - this["theadRow" + position]) * this.colHeight +
          "px",
      };

      if (position == "right") {
        style["right"] = this.scrollWidth - 1 + "px";
      }

      return style;
    },
    resetState: function resetState() {
      var initialData = this.$options.data();
      this.currentPage = initialData.currentPage;
      this.sort = initialData.sort;
      this.ascending = initialData.ascending; //   this.search = Object.assign({}, this.initialSearch);

      this.search = Object.assign({}, this.initialSearch);
    },
    selectPage: function selectPage(page) {
      this.currentPage = page;
    },
    sortBy: function sortBy(column, event) {
      event.preventDefault();

      if (this.sort === column) {
        this.ascending = !this.ascending;
      } else {
        this.sort = column;
        this.ascending = true;
      }
    },
    setLimit: function setLimit(limit) {
      this.currentPage = 0;
      this.config.limit = limit;
    },
    sortIconClasses: function sortIconClasses(column) {
      if (this.sort !== column) return ["fas", "fa-sort"];
      if (this.ascending === true) return ["fas", "fa-sort-up"];
      return ["fas", "fa-sort-down"];
    },
    filterByText: function filterByText(column) {
      return this.i18n.filterBy.replace("{column}", column);
    },
    createSearcFuncs: function createSearcFuncs(search) {
      var val = search.toLowerCase();

      if (this.config.regexSearch === true) {
        var regex = new RegExp(val, "g");
        return function (input) {
          return input ? input.toString().toLowerCase().match(regex) : false;
        };
      } else {
        return function (input) {
          return input ? input.toString().toLowerCase().includes(val) : false;
        };
      }
    },
    exportData: function exportData() {
      this.$emit("export", this.filteredAndSortedData);
    },
    setColors: function setColors() {
      if (
        typeof this.$refs.table != "undefined" &&
        typeof this.$refs.table.style != "undefined"
      ) {
        var s = this.$refs.table.style;
        if (
          typeof this.$refs != "undefined" &&
          typeof this.$refs.table != "undefined" &&
          typeof this.$refs.table.style != "undefined"
        ) {
          s.setProperty("--dead-area-color", this.deadAreaColor);
        }
      }
    },
    onDragEnterHeader: function onDragEnterHeader(e) {
      this.$emit("header-dragenter", e);
    },
    onDragOverHeader: function onDragOverHeader(e) {
      this.$emit("header-dragover", e);
    },
    onDropHeader: function onDropHeader(e) {
      this.$emit("header-drop", e);
    },
    updateColumnsWidth: function updateColumnsWidth(columns) {
      var _this2 = this;

      if (columns === void 0) {
        columns = undefined;
      }

      var MIN_WIDTH = 90;
      var allColumns = [];
      var flexColumnIndexs = [];
      var bodyMinWidth = 0;

      if (!columns) {
        var _MIN_WIDTH = MIN_WIDTH;
        if (
          typeof this.$slots["default"].length != "undefined" &&
          this.containerWidth > 0
        )
          _MIN_WIDTH = this.containerWidth / this.$slots["default"].length;
        allColumns = this.$slots["default"]
          .filter(function (column) {
            var opt = column.componentOptions;
            if (typeof column.componentOptions === "undefined") {
              let opt = {};
              opt.propsData = column.data.attrs;
              opt.tag = column.tag;
            }
            
            if (typeof opt === "undefined") {
              opt = {};
              opt.propsData = column.data.attrs;
              opt.tag = column.tag;
            }

            if (opt && opt.tag === "table-column") {
              if (typeof opt.propsData.hide == "undefined") {
                opt.propsData.hide = false;
              }

              if (typeof opt.propsData.width == "undefined") {
                opt.propsData.width = _MIN_WIDTH;
                opt.propsData.minwidth = MIN_WIDTH;
              }

              if (opt.propsData.attrs == undefined) {
                opt.propsData["attrs"] = {};
              }

              if (opt.propsData.attrs["class"] != undefined) {
                opt.propsData.attrs["class"] =
                  opt.propsData.attrs["class"] + " " + opt.propsData.prop;
              } else {
                opt.propsData.attrs["class"] = opt.propsData.prop;
              }
            }

            return opt && opt.tag === "table-column" && !opt.propsData.hide;
          })
          .map(function (column) {
            if (typeof column.componentOptions === "undefined") {
              let opt = {};
              opt.propsData = column.data.attrs;
              opt.tag = column.tag;
              return opt;
            } else {
              return column.componentOptions;
            }
          });
      } else {
        allColumns = [].concat(columns);
        MIN_WIDTH = this.containerWidth / allColumns.length;
      }

      if (!this.flexColumnIndexs) {
        flexColumnIndexs = allColumns
          .map(function (col, index) {
            if (_this2.isValidNumber(col.width)) {
              return index;
            }

            return -1;
          })
          .filter(function (val) {
            return val !== -1;
          });
        this.flexColumnIndexs = [].concat(flexColumnIndexs);
      } else {
        flexColumnIndexs = [].concat(this.flexColumnIndexs);
      }

      if (!this.bodyMinWidth) {
        allColumns.forEach(function (col) {
          var colWidth = MIN_WIDTH;

          if (!_this2.isValidNumber(col.width)) {
            colWidth = parseInt(col.width, 10);
            col.$realWidth = colWidth;
          }

          bodyMinWidth += colWidth;
        });
        this.bodyMinWidth = bodyMinWidth;
      } else {
        bodyMinWidth = this.bodyMinWidth;
      }

      if (flexColumnIndexs.length) {
        if (bodyMinWidth <= this.containerWidth) {
          var totalFlexWidth = this.containerWidth - bodyMinWidth;

          if (flexColumnIndexs.length === 1) {
            allColumns[flexColumnIndexs[0]].$realWidth =
              MIN_WIDTH + totalFlexWidth;
          } else {
            var allColumnsWidth = flexColumnIndexs.length * MIN_WIDTH;
            var flexWidthPerPixel = totalFlexWidth / allColumnsWidth;
            var noneFirstWidth = 0;
            flexColumnIndexs.forEach(function (col, index) {
              if (index === 0) {
                return;
              }

              var flexWidth = Math.floor(MIN_WIDTH * flexWidthPerPixel);
              noneFirstWidth += flexWidth;
              allColumns[flexColumnIndexs[index]].$realWidth =
                MIN_WIDTH + flexWidth;
            });
            allColumns[flexColumnIndexs[0]].$realWidth =
              MIN_WIDTH + totalFlexWidth - noneFirstWidth;
          }
        } else {
          flexColumnIndexs.forEach(function (col, index) {
            allColumns[flexColumnIndexs[index]].$realWidth = MIN_WIDTH;
          });
        }
      }

      this.bodyWidth = Math.max(bodyMinWidth, this.containerWidth);
      return allColumns;
    },
    getColumnComponentsByType: function getColumnComponentsByType(
      columns,
      type
    ) {
      var cols = [];

      switch (type) {
        case "selection":
          cols = columns.filter(function (column) {
            return column.propsData.type === "selection";
          });
          cols = cols.length > 1 ? [cols[0]] : cols;
          break;

        case "left":
          cols = columns.filter(function (column) {
            return (
              column.propsData.fixed === "left" &&
              column.propsData.type !== "selection"
            );
          });
          break;

        case "right":
          cols = columns.filter(function (column) {
            return (
              column.propsData.fixed === "right" &&
              column.propsData.type !== "selection"
            );
          });
          break;

        default:
          cols = columns.filter(function (column) {
            return (
              !["left", "right"].includes(column.propsData.fixed) &&
              column.propsData.type !== "selection"
            );
          });
          break;
      }

      return cols;
    },
    renderHeader: function renderHeader(column, index) {
      var _column = column.propsData;
      return typeof column.propsData.renderHeader === "function"
        ? column.propsData.renderHeader.call(self._renderProxy, Vue, {
            //Vue=> vm in vuejs
            column: _column,
            index: index,
          })
        : column.propsData.label;
    },
    renderCell: function renderCell(column, row, index) {
      var that = this;
      var _column = column.propsData.prop;
      return typeof column.propsData.renderCell === "function"
        ? column.propsData.renderCell.call(
            self,
            Vue, //vm in vuejs
            {
              column: _column,
              row: row,
              index: index,
            },
            that.common
          )
        : row[column.propsData.prop];
    },
    isValidNumber: function isValidNumber(number) {
      return isNaN(parseInt(number, 10));
    },
    matchHeightCell: function matchHeightCell() {
      var that = this;

      if (typeof this.colHeight == "undefined" || this.colHeight == 0) {
        var height = 0;
        var elements = this.$refs.tbody[0].getElementsByTagName("tr");

        for (var index in elements) {
          if (
            !this.isValidNumber(index) &&
            elements[index].offsetHeight > that.height
          ) {
            that.height = elements[index].offsetHeight;
          }
        }

        this.colHeight = height;
      }

      if (
        this.openfiltter &&
        (typeof this.colFilterHeight == "undefined" ||
          this.colFilterHeight == 0)
      ) {
        var _elements = this.$refs.thead[0].getElementsByTagName("tr");

        for (let index in _elements) {
          if (
            !this.isValidNumber(index) &&
            _elements[index].offsetHeight > that.colFilterHeight
          ) {
            that.colFilterHeight = _elements[index].offsetHeight;
          }
        }
      }

      if (typeof this.colHeight == "undefined" || this.colFilterHeight == 0) {
        this.colFilterHeight = this.colHeight;
      }
    },
    scrollCalculate: function scrollCalculate() {
      // console.log(this.$el.clientHeight);
      var normal = this.$refs.tbody[0].clientHeight;
      var that = this;
      // this.positionTable.forEach(function (v, i) {
      this.positionTable.forEach(function (v) {
        if (
          typeof that.$refs["thead" + v] != "undefined" &&
          typeof that.$refs["thead" + v][0] != "undefined"
        ) {
          var trtag = that.$refs["thead" + v][0].getElementsByTagName("tr");
          that["theadRow" + v] = trtag.length;
          if (that["theadRowMax"] <= trtag.length)
            that["theadRowMax"] = trtag.length; // let headerLength = trtag.length;
          // for (var j = 0; j < trtag.length; j++) {
          // let _v = trtag[j];
          // let tableFixHeight = _v.offsetHeight;
          // tableFixHeight = that.colHeight * headerLength;
          // if (that.tableFixTheadHeight < tableFixHeight) {
          //     that.tableFixTheadHeight = tableFixHeight;
          // }
          // }

          if (v !== "" && that.tableFixHeight <= 0) {
            var fix = that.$refs["tbody" + v][0].clientHeight;
            that.tableFixHeight =
              that.$refs.table[0].clientHeight - (fix - normal);
            that.scrollWidth =
              that.$refs.table[0].children[0].offsetWidth -
              that.$refs.table[0].children[0].clientWidth;
          }

          trtag = that.$refs["tbody" + v][0].getElementsByTagName("tr");

          for (var j = 0; j < trtag.length; j++) {
            var _v = trtag[j];
            var tableFixWidth = _v.offsetWidth;

            if (that.tableFixWidth < tableFixWidth) {
              that.tableFixWidth = tableFixWidth;
            }
          } // trtag.forEach(function(_v, j) {
          //     let tbodyTr = _v.getElementsByTagName('tr');
          //     let tableFixWidth = tbodyTr.length > 0 ? tbodyTr[0].offsetWidth : 0;
          //     if (that.tableFixWidth < tableFixWidth) {
          //         that.tableFixWidth = tableFixWidth;
          //     }
          // });
        }
      }); // console.log(this.tableFixTheadHeight);
      // console.log(this.tableFixWidth);
      // let fix = this.$refs.tbodyleft[0].clientHeight;
      // if (fix <= 0) {
      //     fix = this.$refs.tbodyright[0].clientHeight;
      // }
      // // let normal = this.$refs.tbody[0].clientHeight;
      // this.tableFixHeight = this.$refs.table[0].clientHeight - (fix - normal);
      // this.scrollWidth = this.$refs.table[0].children[0].offsetWidth - this.$refs.table[0].children[0].clientWidth;
      // let tbodyRightTr = this.$refs.tbodyright[0].getElementsByTagName('tr');
      // let tbodyLeftTr = this.$refs.tbodyleft[0].getElementsByTagName('tr');
      // if (fix <= 0) {
      //     this.tableFixWidth = tbodyRightTr.length > 0 ? tbodyRightTr[0].offsetWidth : 0;
      // } else {
      //     this.tableFixWidth = tbodyLeftTr.length > 0 ? tbodyLeftTr[0].offsetWidth : 0;
      // }
      // console.log(this.tableFixWidth);
    },
    updateSyncedScroll: function updateSyncedScroll(v, position) {
      v = v + position;
      var b = this.$refs[v][0];
      var l = b.scrollLeft;

      if (this.scrollHorizontal) {
        if (this.syncHeaderScroll) {
          var h = this.$refs["thead" + position][0];

          if (h.scrollLeft !== l) {
            h.scrollLeft = l;
          }
        }

        if (this.includeFooter && this.syncFooterScroll) {
          var f = this.$refs["tfoot" + position][0];

          if (f.scrollLeft !== l) {
            f.scrollLeft = l;
          }
        }
      }

      var trSize = b.getElementsByTagName("tr")[0].offsetHeight;
      var tbodySize = b.scrollHeight;
      var lastPos = tbodySize - trSize;
      var scrollTop = b.scrollTop; // b.scrollTop = 0;

      if (scrollTop < this.scrollTop && trSize <= scrollTop) {
        this.scrollTop = scrollTop - trSize;
      } else if (scrollTop > this.scrollTop && scrollTop > lastPos) {
        this.scrollTop = tbodySize;
      } else this.scrollTop = scrollTop; // debounce(this.updateOtherSyncedScroll(b), 100000);

      return b;
    },
    // classRender:function(column){
    //     if(column.propsData.attrs == undefined){
    //         column.propsData['attrs']= {};
    //     }
    //     if(column.propsData.attrs.class != undefined){
    //         column.propsData.attrs.class = column.propsData.attrs.class + " " + column.propsData.prop
    //     }else {
    //         column.propsData.attrs.class = [column.propsData.prop]
    //     }
    //     return column.propsData.attrs;
    // },
    updateOtherSyncedScroll: function updateOtherSyncedScroll(b) {
      // var v = this.scrollType;
      var that = this;

      if (that.scrollbarSize + that.clientHeight < b) {
        b = that.scrollbarSize + that.clientHeight;
      }

      that.$refs["thead"][0].scrollLeft = that.$refs["tbody"][0].scrollLeft;
      if (typeof that.$refs["tbody"] != "undefined")
        that.$refs["tbody"][0].scrollTop = b;

      if (typeof that.$refs["tbodyleft"] != "undefined") {
        that.$refs["tbodyleft"][0].scrollTop = b;
      }

      if (typeof that.$refs["tbodyright"] != "undefined") {
        that.$refs["tbodyright"][0].scrollTop = b;
      }
    },
  },
  beforeDestroy: function beforeDestroy() {
    var that = this;
    //v,i
    this.positionTable.forEach(function (v) {
      v = "tbody" + v;

      if (typeof that.$refs[v] != "undefined") {
        that.$refs[v][0].removeEventListener("scroll", function () {
          if (that.scrollType == v) {
            var b = that.updateSyncedScroll();
            if (b.scrollTop !== that.scrollTop)
              debounce(that.updateOtherSyncedScroll(b), 100);
          }

          that.scrollType = v;
        });
      }
    });
  },
  created: function created() {
    if (this.localdata == null) {
      // this.show = false;
    }
  },
  mounted: function mounted() {
    this.self = this;
    this.setColors();
    this.containerWidth = this.$el.clientWidth;
    this.containerHeight = this.$el.clientHeight;
    var columnComponents = this.updateColumnsWidth();
    var selectionColumnComponents = this.getColumnComponentsByType(
      columnComponents,
      "selection"
    );
    var normalColumnComponents = this.getColumnComponentsByType(
      columnComponents,
      "normal"
    );
    var fixedLeftColumnComponents = this.getColumnComponentsByType(
      columnComponents,
      "left"
    );
    var fixedRightColumnComponents = this.getColumnComponentsByType(
      columnComponents,
      "right"
    );
    var selectPosition = null;
    if (selectionColumnComponents.length > 0)
      selectPosition =
        (_readOnlyError("selectPosition"),
        selectionColumnComponents[0].propsData.fixed);
    this.columnsTemp = {
      "": [].concat(
        // fixedLeftColumnComponents,
        selectPosition != "left" && selectPosition != "right"
          ? selectionColumnComponents
          : [],
        normalColumnComponents // fixedRightColumnComponents
      ),
      left: [].concat(
        selectPosition == "left" ? selectionColumnComponents : [],
        fixedLeftColumnComponents
      ),
      right: [].concat(
        fixedRightColumnComponents,
        selectPosition == "right" ? selectionColumnComponents : []
      ),
    };
    var that = this;
    that.openfiltter =
      this.columnsTemp[""].filter(function (column) {
        return !that.openfiltter && column.propsData.filter;
      }).length > 0; //if using for speed slow then using split

    this.$nextTick(function () {
      // console.log("done")
      if (typeof that.$refs != "undefined") {
        if (
          typeof that.$refs["tbody"] != "undefined" &&
          typeof that.$refs["tbody"][0] != "undefined"
        ) {
          that.$refs["tbody"][0].addEventListener(
            "scroll",
            function () {
              that.updateSyncedScroll("tbody", "");
            },
            false
          );
        }

        if (
          typeof that.$refs["tbodyleft"] != "undefined" &&
          typeof that.$refs["tbodyleft"][0] != "undefined"
        ) {
          that.$refs["tbodyleft"][0].addEventListener(
            "scroll",
            function () {
              that.updateSyncedScroll("tbody", "left");
            },
            false
          );
          this.matchHeightCell();
          this.scrollCalculate();
        }

        if (
          typeof that.$refs["tbodyright"] != "undefined" &&
          typeof that.$refs["tbodyright"][0] != "undefined"
        ) {
          that.$refs["tbodyright"][0].addEventListener(
            "scroll",
            function () {
              that.updateSyncedScroll("tbody", "right");
            },
            false
          );
          this.matchHeightCell();
          this.scrollCalculate();
        }

        this.slottheader = true;
      }
    });
  },
  updated: function updated() {},
};
</script>
<style src="./vue-table-dynamic.scss" lang="scss" />