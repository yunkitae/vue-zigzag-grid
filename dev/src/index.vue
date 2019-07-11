<template>
  <main>
    <div class="report-wrap">
      <p id="time"></p>
      <p id="memory"></p>
    </div>
    <div class="zigzag-wrap">
      <zigzag-grid
        :containerWidth="containerWidth"
        :itemPadding="itemPadding"
        @reflowed="reflowed"
        ref="zigzagGrid"
        :grid="startGrid"
        :list="list"
      >
        <item slot="cell"  slot-scope="props" :item="props.item"  :itemWidth="props.itemWidth"></item>
      </zigzag-grid>
    </div>
    <div class="zigzag-wrap" style="margin-top: 300px;background: red;">
      <zigzag-grid
        :containerWidth="containerWidth"
        :itemPadding="itemPadding"
        @reflowed="reflowed"
        ref="zigzagGrid"
        :grid="startGrid"
        :list="list"
      >
        <item slot="cell"  slot-scope="props" :item="props.item"  :itemWidth="props.itemWidth"></item>
      </zigzag-grid>
    </div>

  </main>
</template>
<script>
  import TEST_DATA from './data.json'
  import Item from './Item.vue'
  export default {
    data () {
      return {
        json: TEST_DATA,
        containerWidth: 0,
        itemPadding: 6,
        startGrid: 2,
        list: []
      }
    },
    created () {
      if (process.browser) {
        this.containerWidth = window.innerWidth
        this.list.push(...this.json.list)

        // this.list = this.json.list[0]
      }
    },
    methods: {
      reflowed () {
      },
      reportPerformance() {
        const initTime = Date.now();
        const timeElement = document.getElementById('time')
        if (timeElement && initTime) {
          const timeWaste = Date.now() - initTime
          timeElement.textContent = 'Build waste: ' + timeWaste + ' ms.'
        }

        const memoryElement = document.getElementById('memory')
        const performance = window.performance || window.webkitPerformance
        if (memoryElement && performance && performance.memory && performance.memory.usedJSHeapSize) {
          const memoryUsed = parseInt(performance.memory.usedJSHeapSize / (1024 * 1024))
          memoryElement.textContent = 'Memory used: ' + memoryUsed + ' MB.'
        }
      }
    },
    computed: {
    },
    components: {
      Item
    }
  }
</script>

<style>
  body {
    margin:0;
  }
  main {
    position: relative;
  }
  .report-wrap {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 10000;
    background: yellow;
    padding: 5px;
  }
</style>
