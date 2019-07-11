<template>
  <div class="vue-zigzag-slot" :style="[style ? {...style, transition: transitionCss} : {'width': width + 'px', transition: transitionCss}]">
    <slot />
  </div>
</template>
<style scoped="scoped" lang="scss">
  .vue-zigzag-slot {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    opacity: 0;
    box-sizing: border-box;
    transform: translate(0, 0);
  }
</style>
<script>
export default {
  props: {
    itemWidth: {
      type: Number,
      required: true
    },
    isWholeGrid: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0
    },
    slotFadeTime: {
      type: Number,
      default: 300
    }
  },
  data: () => ({
    width: 0,
    height: 0,
    style: null
  }),
  computed: {
    transitionCss() {
      return `opacity ${this.slotFadeTime}ms`;
    }
  },
  created() {
    this.width = this.isWholeGrid ? window.innerWidth : this.itemWidth;
    this.$nextTick(() => {
      this.height = this.$el.clientHeight;
      this.notify();
    });
  },
  methods: {
    notify() {
      this.$emit('reflow', this);
    },
    getMeta() {
      return {
        vm: this,
        node: this.$el,
        order: this.order,
        width: this.width,
        isWholeGrid: this.isWholeGrid,
        height: this.height,
        moveClass: this.moveClass
      };
    }
  }
};
</script>
