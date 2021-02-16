<template>
  <div class="modal" :class="hidenPopup ? 'hidden' : ''">
    <div
      class="modal-mask resizable resizable-component"
      :style="style"
      @keydown.esc="$emit('close')"
    >
      <div class="modal-wrapper">
        <div class="modal-container dialog-modal">
          <div
            tabindex="-1"
            role="dialog"
            class="ui-dialog ui-corner-all ui-widget ui-widget-content ui-front ui-draggable ui-resizable"
            aria-describedby="modalCompo1"
            aria-labelledby="ui-id-18"
            @keydown.esc="$emit('close')"
          >
            <div
              ref="headDialog"
              class="ui-dialog-titlebar ui-corner-all ui-widget-header ui-helper-clearfix ui-draggable-handle"
              id="ui-dialog-titlebar-modal"
            >
              <span id="ui-id-18" class="ui-dialog-title">{{ title }}</span>
              <button
                type="button"
                class="ui-button ui-corner-all ui-widget ui-button-icon-only ui-dialog-titlebar-close"
                title="Close"
                @click="$emit('close')"
              >
                <span class="ui-button-icon ui-icon ui-icon-closethick"></span
                ><span class="ui-button-icon-space"> </span> Close
              </button>
            </div>

            <div
              class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"
              v-if="!footerflg"
            >
              <div class="ui-dialog-buttonset">
                <slot name="footer">
                  default footer
                  <b-button variant="dark" @click="$emit('close')">
                    {{ $t("file.close") }}
                  </b-button>
                </slot>
              </div>
            </div>
            <div
              id="modalCompo1"
              class="modal ui-dialog-content ui-widget-content"
              :style="{
                width: this.w + 'px',
                height: this.h + 'px',
              }"
            >
              <slot
                name="body"
                :style="{
                  width: this.w,
                  height: this.h,
                }"
              >
                default body
              </slot>
            </div>
            <div
              class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"
              v-if="footerflg"
            >
              <div class="ui-dialog-buttonset">
                <slot name="footer">
                  default footer
                  <b-button variant="dark" @click="$emit('close')">
                    {{ $t("file.close") }}
                  </b-button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template v-for="el in active">
        <div v-show="!maximize" :class="'resizable-' + el" :key="el"></div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  /**modal**/
  props: {
    width: {
      default: undefined,
      type: [Number, String],
    },
    minWidth: {
      default: undefined,
      type: Number,
    },
    maxWidth: {
      default: undefined,
      type: Number,
    },
    height: {
      default: undefined,
      type: [Number, String],
    },
    minHeight: {
      default: 0,
      type: Number,
    },
    maxHeight: {
      default: undefined,
      type: Number,
    },
    left: {
      default: 0,
      type: [Number, String],
    },
    top: {
      default: 0,
      type: [Number, String],
    },
    center: {
      default: false,
      type: Boolean,
    },
    active: {
      default: function _default() {
        return ["r", "rb", "b", "lb", "l", "lt", "t", "rt"];
      },
      validator: function validator(val) {
        return (
          ["r", "rb", "b", "lb", "l", "lt", "t", "rt"].filter(function (value) {
            return val.indexOf(value) !== -1;
          }).length === val.length
        );
      },
      type: Array,
    },
    fitParent: {
      default: true,
      type: Boolean,
    },
    dragSelector: {
      default: "#ui-dialog-titlebar-modal",
      //undefined,
      type: String,
    },
    maximize: {
      default: false,
      type: Boolean,
    },
    disableAttributes: {
      default: function _default() {
        return [];
      },
      validator: function validator(val) {
        return (
          ["l", "t", "w", "h"].filter(function (value) {
            return val.indexOf(value) !== -1;
          }).length === val.length
        );
      },
      type: Array,
    },
    title: {
      default: "ã‚¿ã‚¤ãƒˆãƒ«",
      type: String,
    },
    footerflg: {
      default: true,
      type: Boolean,
    },
  },
  data: function data() {
    return {
      w: this.width,
      h: this.height,
      minW: this.minWidth,
      minH: this.minHeight,
      maxW: this.maxWidth,
      maxH: this.maxHeight,
      l: this.left,
      t: this.top,
      mouseX: 0,
      mouseY: 0,
      offsetX: 0,
      offsetY: 0,
      parent: {
        width: 0,
        height: 0,
      },
      resizeState: 0,
      dragElements: [],
      dragState: false,
      calcMap: 15,
      ELEMENT_MASK: {
        "resizable-r": {
          bit: 1,
          cursor: "e-resize",
        },
        "resizable-rb": {
          bit: 3,
          cursor: "se-resize",
        },
        "resizable-b": {
          bit: 2,
          cursor: "s-resize",
        },
        "resizable-lb": {
          bit: 6,
          cursor: "sw-resize",
        },
        "resizable-l": {
          bit: 4,
          cursor: "w-resize",
        },
        "resizable-lt": {
          bit: 12,
          cursor: "nw-resize",
        },
        "resizable-t": {
          bit: 8,
          cursor: "n-resize",
        },
        "resizable-rt": {
          bit: 9,
          cursor: "ne-resize",
        },
        "drag-el": {
          bit: 15,
          cursor: "pointer",
        },
      },
      CALC_MASK: {
        l: 1,
        t: 2,
        w: 4,
        h: 8,
      },
      heightBody: 0,
      widthBody: 0,
      that: {},
      hidenPopup: false,
    };
  },
  watch: {
    maxWidth: function maxWidth(value) {
      this.maxW = value;
    },
    maxHeight: function maxHeight(value) {
      this.maxH = value;
    },
    minWidth: function minWidth(value) {
      this.minW = value;
    },
    minHeight: function minHeight(value) {
      this.minH = value;
    },
    width: function width(value) {
      typeof value === "number" && (this.w = value);
    },
    height: function height(value) {
      typeof value === "number" && (this.h = value);
    },
    left: function left(value) {
      typeof value === "number" && (this.l = value);
    },
    top: function top(value) {
      typeof value === "number" && (this.t = value);
    },
    dragSelector: function dragSelector(selector) {
      this.setupDragElements(selector);
    },
    maximize: function maximize(value) {
      this.setMaximize(value);
      this.emitEvent("maximize", {
        state: value,
      });
    },
  },
  mounted: function mounted() {
    var _this = this;

    this.that = this.$el.querySelector(".modal-mask");

    if (!this.width) {
      this.w = this.that.parentElement.clientWidth;
    } else {
      typeof this.width !== "number" && (this.w = this.that.clientWidth);
    }

    if (!this.height) {
      this.h = this.that.parentElement.clientHeight;
    } else {
      typeof this.height !== "number" && (this.h = this.that.clientHeight);
    }

    typeof this.left !== "number" &&
      (this.l = this.that.offsetLeft - this.that.parentElement.offsetLeft);
    typeof this.top !== "number" &&
      (this.t = this.that.offsetTop - this.that.parentElement.offsetTop);
    this.minW && this.w < this.minW && (this.w = this.minW);
    this.minH && this.h < this.minH && (this.h = this.minH);
    this.maxW && this.w > this.maxW && (this.w = this.maxW);
    this.maxH && this.h > this.maxH && (this.h = this.maxH);
    this.setMaximize(this.maximize); //dialog-modal

    this.setBodySize;
    this.setupDragElements(this.dragSelector);
    this.disableAttributes.forEach(function (attr) {
      switch (attr) {
        case "l":
          _this.calcMap &= ~_this.CALC_MASK.l;
          break;

        case "t":
          _this.calcMap &= ~_this.CALC_MASK.t;
          break;

        case "w":
          _this.calcMap &= ~_this.CALC_MASK.w;
          break;

        case "h":
          _this.calcMap &= ~_this.CALC_MASK.h;
      }
    });
    document.documentElement.addEventListener(
      "mousemove",
      this.handleMove,
      true
    );
    document.documentElement.addEventListener(
      "mousedown",
      this.handleDown,
      true
    );
    document.documentElement.addEventListener("mouseup", this.handleUp, true);
    document.documentElement.addEventListener(
      "touchmove",
      this.handleMove,
      true
    );
    document.documentElement.addEventListener(
      "touchstart",
      this.handleDown,
      true
    );
    document.documentElement.addEventListener("touchend", this.handleUp, true);
    this.emitEvent("mount");
  },
  beforeDestroy: function beforeDestroy() {
    document.documentElement.removeEventListener(
      "mousemove",
      this.handleMove,
      true
    );
    document.documentElement.removeEventListener(
      "mousedown",
      this.handleDown,
      true
    );
    document.documentElement.removeEventListener(
      "mouseup",
      this.handleUp,
      true
    );
    document.documentElement.removeEventListener(
      "touchmove",
      this.handleMove,
      true
    );
    document.documentElement.removeEventListener(
      "touchstart",
      this.handleDown,
      true
    );
    document.documentElement.removeEventListener(
      "touchend",
      this.handleUp,
      true
    );
    this.emitEvent("destroy");
  },
  computed: {
    style: function style() {
      if (this.center) {
        return {
          width: typeof this.w === "number" ? this.w + "px" : this.w,
          height: typeof this.h === "number" ? this.h + "px" : this.h,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        };
      }

      return {
        width: typeof this.w === "number" ? this.w + "px" : this.w,
        height: typeof this.h === "number" ? this.h + "px" : this.h,
        left: typeof this.l === "number" ? this.l + "px" : this.l,
        top: typeof this.t === "number" ? this.t + "px" : this.t,
      };
    },
    setBodySize: function setBodySize() {
      // this.heightBody = '100%'; //this.h - ($(this.that).find('.ui-dialog>div:first-child').innerHeight() + $(this.that).find('.ui-dialog>div:last-child').innerHeight() + parseFloat($(this.that).find('.ui-dialog>div:last-child').css('marginTop')));
      // console.log(($(this.that).find('.ui-dialog>div:first-child').innerHeight() + $(this.that).find('.ui-dialog>div:last-child').innerHeight() + parseFloat($(this.that).find('.ui-dialog>div:last-child').css('marginTop'))));
      // $(this.that).find('.ui-dialog>div:first-child').innerWidth() - (this.that).find('.ui-dialog>div:first-child').outerWidth();
      let paddingRight = this.$refs.headDialog.style["padding-right"];
      // $(this.that).find(".ui-dialog>div:first-child").css("padding-right")
      paddingRight =
        paddingRight == null || paddingRight == ""
          ? 0
          : parseFloat(paddingRight);
      let paddingLeft = this.$refs.headDialog.style["padding-left"];
      // $(this.that).find(".ui-dialog>div:first-child").css("padding-left")
      paddingLeft =
        paddingLeft == null || paddingLeft == "" ? 0 : parseFloat(paddingLeft);

      //(this.that).innerWidth() -
      // $(this.that).find(".ui-dialog>div:first-child").outerWidth());
      let offsetWidth = this.$refs.headDialog.offsetWidth;

      let widthBody = this.w - paddingRight + paddingLeft;
      widthBody = widthBody - (this.$el.offsetWidth - offsetWidth);
      // this.widthBody = widthBody;
      return widthBody;
    },
  },
  methods: {
    //*****
    ownKeys: function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);

      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly)
          symbols = symbols.filter(function (sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
          });
        keys.push.apply(keys, symbols);
      }

      return keys;
    },
    _objectSpread: function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};

        if (i % 2) {
          this.ownKeys(Object(source), true).forEach(function (key) {
            this._defineProperty(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(
            target,
            Object.getOwnPropertyDescriptors(source)
          );
        } else {
          this.ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(
              target,
              key,
              Object.getOwnPropertyDescriptor(source, key)
            );
          });
        }
      }

      return target;
    },
    _defineProperty: function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true,
        });
      } else {
        obj[key] = value;
      }

      return obj;
    },

    /**/
    setMaximize: function setMaximize(value) {
      var parentEl = this.that.parentElement;

      if (value) {
        this.prevState = {
          w: this.w,
          h: this.h,
          l: this.l,
          t: this.t,
        };
        this.t = this.l = 0;
        this.w = parentEl.clientWidth;
        this.h = parentEl.clientHeight;
      } else {
        this.restoreSize();
      }
    },
    restoreSize: function restoreSize() {
      if (this.prevState) {
        this.l = this.prevState.l;
        this.t = this.prevState.t;
        this.h = this.prevState.h;
        this.w = this.prevState.w;
      }
    },
    setupDragElements: function setupDragElements(selector) {
      var oldList = this.that.querySelectorAll(".drag-el");
      oldList.forEach(function (el) {
        el.classList.remove("drag-el");
      });
      var nodeList = this.that.querySelectorAll(selector);
      nodeList.forEach(function (el) {
        el.classList.add("drag-el");
      });
      this.dragElements = Array.prototype.slice.call(nodeList);
    },
    emitEvent: function emitEvent(eventName, additionalOptions) {
      this.setBodySize;
      this.$emit(
        eventName,
        this._objectSpread(
          {
            eventName: eventName,
            left: this.l,
            top: this.t,
            width: this.w,
            height: this.h,
          },
          additionalOptions
        )
      );
    },
    handleMove: function handleMove(event) {
      if (this.resizeState !== 0) {
        var eventY, eventX; //modal-mask

        if (event.touches && event.touches.length >= 0) {
          eventY = event.touches[0].clientY;
          eventX = event.touches[0].clientX;
        } else {
          eventY = event.clientY;
          eventX = event.clientX;
        }

        if (this.maximize && this.prevState) {
          var parentWidth = this.parent.width;
          var parentHeight = this.parent.height;
          this.restoreSize();
          this.prevState = undefined;
          this.t = eventY > parentHeight / 2 ? parentHeight - this.h : 0;
          this.l = eventX > parentWidth / 2 ? parentWidth - this.w : 0;
          this.emitEvent("maximize", {
            state: false,
          });
        }

        var diffX = eventX - this.mouseX + this.offsetX,
          diffY = eventY - this.mouseY + this.offsetY;
        this.offsetX = this.offsetY = 0;

        if (this.resizeState & this.ELEMENT_MASK["resizable-r"].bit) {
          if (!this.dragState && this.w + diffX < this.minW)
            this.offsetX = diffX - (diffX = this.minW - this.w);
          else if (
            !this.dragState &&
            this.maxW &&
            this.w + diffX > this.maxW &&
            (!this.fitParent || this.w + this.l < this.parent.width)
          )
            this.offsetX = diffX - (diffX = this.maxW - this.w);
          else if (
            this.fitParent &&
            this.l + this.w + diffX > this.parent.width
          )
            this.offsetX =
              diffX - (diffX = this.parent.width - this.l - this.w);
          this.calcMap & this.CALC_MASK.w &&
            (this.w += this.dragState ? 0 : diffX);
        }

        if (this.resizeState & this.ELEMENT_MASK["resizable-b"].bit) {
          if (!this.dragState && this.h + diffY < this.minH)
            this.offsetY = diffY - (diffY = this.minH - this.h);
          else if (
            !this.dragState &&
            this.maxH &&
            this.h + diffY > this.maxH &&
            (!this.fitParent || this.h + this.t < this.parent.height)
          )
            this.offsetY = diffY - (diffY = this.maxH - this.h);
          else if (
            this.fitParent &&
            this.t + this.h + diffY > this.parent.height
          )
            this.offsetY =
              diffY - (diffY = this.parent.height - this.t - this.h);
          this.calcMap & this.CALC_MASK.h &&
            (this.h += this.dragState ? 0 : diffY);
        }

        if (this.resizeState & this.ELEMENT_MASK["resizable-l"].bit) {
          if (!this.dragState && this.w - diffX < this.minW)
            this.offsetX = diffX - (diffX = this.w - this.minW);
          else if (
            !this.dragState &&
            this.maxW &&
            this.w - diffX > this.maxW &&
            this.l >= 0
          )
            this.offsetX = diffX - (diffX = this.w - this.maxW);
          else if (this.fitParent && this.l + diffX < 0)
            this.offsetX = diffX - (diffX = -this.l);
          this.calcMap & this.CALC_MASK.l && (this.l += diffX);
          this.calcMap & this.CALC_MASK.w &&
            (this.w -= this.dragState ? 0 : diffX);
        }

        if (this.resizeState & this.ELEMENT_MASK["resizable-t"].bit) {
          if (!this.dragState && this.h - diffY < this.minH)
            this.offsetY = diffY - (diffY = this.h - this.minH);
          else if (
            !this.dragState &&
            this.maxH &&
            this.h - diffY > this.maxH &&
            this.t >= 0
          )
            this.offsetY = diffY - (diffY = this.h - this.maxH);
          else if (this.fitParent && this.t + diffY < 0)
            this.offsetY = diffY - (diffY = -this.t);
          this.calcMap & this.CALC_MASK.t && (this.t += diffY);
          this.calcMap & this.CALC_MASK.h &&
            (this.h -= this.dragState ? 0 : diffY);
        }

        this.mouseX = eventX;
        this.mouseY = eventY;
        var eventName = !this.dragState ? "resize:move" : "drag:move";
        this.emitEvent(eventName);
      }
    },
    handleDown: function handleDown(event) {
      for (var elClass in this.ELEMENT_MASK) {
        if (
          this.that.contains(event.target) &&
          ((event.target.closest && event.target.closest("." + elClass)) ||
            event.target.classList.contains(elClass))
        ) {
          elClass === "drag-el" && (this.dragState = true);
          document.body.style.cursor = this.ELEMENT_MASK[elClass].cursor;

          if (event.touches && event.touches.length >= 1) {
            this.mouseX = event.touches[0].clientX;
            this.mouseY = event.touches[0].clientY;
          } else {
            event.preventDefault && event.preventDefault();
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
          }

          this.offsetX = this.offsetY = 0;
          this.resizeState = this.ELEMENT_MASK[elClass].bit;
          this.parent.height = this.that.parentElement.clientHeight;
          this.parent.width = this.that.parentElement.clientWidth;
          var eventName = !this.dragState ? "resize:start" : "drag:start";
          this.emitEvent(eventName);
          break;
        }
      }
    },
    handleUp: function handleUp() {
      if (this.resizeState !== 0) {
        this.resizeState = 0;
        document.body.style.cursor = "";
        var eventName = !this.dragState ? "resize:end" : "drag:end";
        this.emitEvent(eventName);
        this.dragState = false;
      }
    },
  },
};
</script>

<style src="./Modal.scss" lang="scss"/>