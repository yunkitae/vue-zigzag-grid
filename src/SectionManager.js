export default class SectionManager {
  constructor({containerWidth, grid, isUseContainerPadding = false, itemPadding = 0}) {
    this.containerWidth = containerWidth;
    this.grid = grid;
    this.outerHeight = 0;
    this.itemPadding = itemPadding;
    this.isUseContainerPadding = isUseContainerPadding;
    this.tops = [];
    this.itemWidth = 0;
    this.strategy = null;

    this._init();
  }

  _init() {
    const grow = ((pSize) => {
      const inArray = [];
      for (let i = 0, end = pSize; i < end; ++i) {
        inArray.push(1);
      }
      return inArray;
    })(this.grid);

    let itemWidth;
    if (this.isUseContainerPadding) {
      itemWidth = (this.containerWidth - ((this.grid + 1) * this.itemPadding)) / this.grid;
    } else {
      itemWidth = ((this.containerWidth - (this.itemPadding * (this.grid - 1))) / this.grid);
    }
    this.strategy = this.rowStrategyWithGrow(itemWidth, grow);
    this.tops = this.arrayFillWith(0, this.strategy.count);
    this.itemWidth = itemWidth;
  }

  calculate(metas) {
    metas.forEach((meta) => {
      const rect = {};
      let offset;
      if (meta.isWholeGrid) {
        offset = this.tops.reduce((last, top, i) => top > this.tops[last] ? i : last, 0);
        rect.top = this.tops[offset];
        rect.left = 0;
        this.tops.fill(rect.top + meta.height);
      } else {
        offset = this.tops.reduce((last, top, i) => top < this.tops[last] ? i : last, 0);
        rect.top = this.tops[offset];
        this.tops[offset] = rect.top + meta.height;
        rect.left = (() => {
          let inRet;
          if (this.isUseContainerPadding) {
            if (offset === 0) {
              inRet = this.strategy.left + this.itemPadding;
            } else {
              inRet = this.strategy.left + (offset ? this.sum(this.strategy.width.slice(0, offset)) : 0) + (this.itemPadding * (offset + 1));
            }
          } else {
            // 양 옆에 패딩을 사용안한다면
            if (offset === 0) {
              inRet = this.strategy.left;
            } else {
              inRet = this.strategy.left + (offset ? this.sum(this.strategy.width.slice(0, offset)) : 0) + (this.itemPadding * (offset));
            }
          }
          return inRet;
        })();
      }
      rect.width = meta.width;
      rect.height = meta.height;
      Object.assign(meta.node.style, this.buildStyle(rect));
    });
    this.outerHeight = Math.max.apply(Math, this.tops);
  }

  arrayFillWith(item, count) {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr[i] = (typeof item === 'function') ? item() : item;
    }
    return arr;
  }

  sum(arr) {
    return arr.reduce((sum, val) => sum + val);
  }

  buildStyle(rect) {
    return {
      top: 0,
      left: 0,
      width: rect.width + 'px',
      height: rect.height + 'px',
      transform: `translateX(${rect.left}px) translateY(${rect.top}px)`,
      WebkitTransform: `translateX(${rect.left}px) translateY(${rect.top}px)`,
      opacity: 1
    };
  }

  rowStrategyWithGrow(width, grow) {
    return {
      width: grow.map(val => width),
      count: grow.length,
      left: 0
    };
  }
}
