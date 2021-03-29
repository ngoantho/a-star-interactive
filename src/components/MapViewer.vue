<template>
  <div class="map">
    <div class="row" v-for="(row, rowId) in map" :key="'row' + rowId">
      <Cell
        v-for="(cell, cellId) in row"
        :key="rowId + '_' + cellId"
        :id="rowId + '_' + cellId"
        :startPos="startPosition"
        :endPos="endPosition"
        :rowId="rowId"
        :cellId="cellId"
        :value="cell"
        :mouse-down="mouseDown"
        @clickCell="(payload) => $emit('clickCell', payload)"
      ></Cell>
    </div>
  </div>
</template>

<script lang="ts">
import GridNode from "@/lib/GridNode";
import { Component, Vue } from "vue-property-decorator";
import Cell from "./Cell.vue";

let Props = Vue.extend({
  props: {
    map: {
      type: Array,
    },
    startPosition: {
      type: Object,
    },
    endPosition: {
      type: Object,
    },
    path: {
      type: Array,
    },
  },
});

@Component({
  components: {
    Cell,
  },
})
export default class MapViewer extends Props {
  map!: number[][];
  path!: GridNode[];
  mouseDown = false;
  startPosition!: {
    x: number;
    y: number;
  };
  endPosition!: {
    x: number;
    y: number;
  };
}
</script>

<style lang="postcss" scoped>
.map {
  overflow: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;

  & .row {
    display: flex;
  }
}
</style>
