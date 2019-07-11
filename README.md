
# Vue Zigzag Grid Plugin 

Like pinterest list

## License

MIT License

## Install

Installation is very easy 
```bash
npm i -S vue-zigzag-grid
```
or
```bash
yarn add vue-zigzag-grid
```
### Nuxt JS Add Plugin
  
```js
  import Vue from 'vue'
  import ZigzagGrid from 'vue-zigzag-grid'
  Vue.use(ZigzagGrid)
```  

## script

```js
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
    }
  },
  computed: {
  },
  components: {
    Item
  }
}
```

## template

```html
<template>
  <main>
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
  </main>
</template>
```
