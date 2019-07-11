import ZigzagGrid from './ZigzagGrid.vue'
import ZigzagGridSlot from './ZigzagGridSlot.vue'

const plugin = {
  install(Vue, options) {
    Vue.component("ZigzagGrid", ZigzagGrid)
    Vue.component("ZigzagGridSlot", ZigzagGridSlot)
  }
}

export default plugin
