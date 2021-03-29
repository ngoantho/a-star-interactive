<template>
  <div :class="['cell']" :title="title">
    <span
      :class="[
        'bg',
        {
          'is-wall': isWall,
          'is-start': isStart,
          'is-end': isEnd,
          'is-in-path': isInPath,
        },
      ]"
    ></span>
  </div>
</template>

<script lang="ts">
import GridNode from "@/lib/GridNode";
import { Component, Vue } from "vue-property-decorator";
import { mapState } from "vuex";

@Component({
  computed: mapState(["weight", "showCellCost"]),
  props: ["id", "value", "startPos", "endPos", "rowId", "cellId"],
})
export default class Cell extends Vue {
  id!: string;
  value!: number;
  startPos!: {
    x: number;
    y: number;
  };
  endPos!: {
    x: number;
    y: number;
  };
  rowId!: number;
  cellId!: number;

  get title() {
    if (this.isWall) {
      return "Wall";
    } else if (this.isStart) {
      return "Start";
    } else if (this.isEnd) {
      return "Goal";
    } else if (this.isInPath) {
      return "In Path";
    }
    return "";
  }

  get isWall() {
    return this.value === 0;
  }

  get isStart() {
    return this.rowId === this.startPos.x && this.cellId === this.startPos.y;
  }

  get isEnd() {
    return this.rowId === this.endPos.x && this.cellId === this.endPos.y;
  }

  get isInPath() {
    /* @ts-ignore */
    return this.$parent.path.find(
      (cell: GridNode) => this.id === `${cell.x}_${cell.y}`
    );
  }
}
</script>

<style lang="postcss" scoped>
.cell {
  height: 32px;
  min-width: 32px;
  border-color: lightgray;
  border-style: solid;
  border-width: 1px;
  position: relative;
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &.is-wall {
    background-color: gray;
  }
  &.is-in-path {
    background-color: yellow;
  }
  &.is-start {
    background-color: chartreuse;
  }
  &.is-end {
    background-color: red;
  }
}
</style>
