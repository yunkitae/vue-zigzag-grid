<template>
  <div class="vue-zigzag" :style="outerStyle">
    <template>
      <zigzag-grid-slot
        v-for="(item, index) in list"
        :key="index"
        :item-width="sectionManager.itemWidth"
        :is-whole-grid="item.isWholeGrid"
        :order="index"
        @reflow="reflow"
      >
        <slot
          name="cell"
          :item-width="sectionManager.itemWidth"
          :order="index"
          :item="item"
          :index="index"
          :slotFadeTime="slotFadeTime"
        />
      </zigzag-grid-slot>
    </template>
  </div>
</template>

<script>
  import SectionManager from './SectionManager';
  export default {
    props: {
      containerWidth: {
        type: Number,
        default: 0
      },
      grid: {
        type: Number,
        default: 1
      },
      list: {
        type: Array,
        required: true
      },
      itemPadding: {
        type: Number,
        default: 0
      },
      slotFadeTime: {
        type: Number,
        default: 300
      },
      isUseContainerPadding: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        isShow: false,
        itemWidth: 0,
        createdSlots: [],
        test: null,
        offsetTop: 0,
        height: 0,
        scrollBufferRange: 100, // scrollTop buffer range
        sectionManager: null
      };
    },
    computed: {
      outerStyle() {
        if (!this.sectionManager) {
          return {
            width: 0,
            height: 0
          };
        } else {
          return {
            height: this.sectionManager.outerHeight + 'px',
            width: this.containerWidth + 'px'
          };
        }
      }
    },
    created() {
      this.sectionManager = new SectionManager({
        containerWidth: this.containerWidth,
        grid: this.grid,
        isUseContainerPadding: this.isUseContainerPadding,
        itemPadding: this.itemPadding
      });
    },
    mounted() {
    },
    destroy() {
      this.sectionManager = null;
    },
    methods: {
      reflow(meta) {
        this.createdSlots.push(meta);
        this.$nextTick(() => {
          const $items = this.createdSlots;
          if ($items.length === 0) return;
          const metas = $items.map(slot => slot.getMeta());
          metas.sort((a, b) => a.order - b.order);
          this.sectionManager.calculate(metas);
          this.createdSlots = [];
          this.$emit('reflowed', this);
        });
      }
    }
  };
</script>
<style scoped="scoped" lang="scss">
  .vue-zigzag {
    position: relative;
  }
</style>
