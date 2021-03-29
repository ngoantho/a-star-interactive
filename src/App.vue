<template>
  <div id="app">
    <controls
      :processing="processing"
      @clearWalls="clearWalls"
      @start="start"
    ></controls>
    <map-viewer
      :map="map"
      :startPosition="startPosition"
      :endPosition="endPosition"
    ></map-viewer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Controls from "./components/Controls.vue";
import MapViewer from "./components/MapViewer.vue";
import { Heuristic } from "./lib/Astar";
import testMap from "./maps/example.json";
import Graph from "./lib/Graph";
import GridNode from "./lib/GridNode";
import { search } from "./lib/Astar";

interface Options {
  heuristic: Heuristic;
  closest: boolean;
}

// @ts-ignore
@Component({
  components: {
    MapViewer,
    Controls,
  },
})
export default class App extends Vue {
  processing = false;
  map!: number[][];
  startPosition!: {
    x: number;
    y: number;
  };
  endPosition!: {
    x: number;
    y: number;
  };

  start({ heuristic, closest }: Options) {
    let graph = new Graph(this.map);
    let startNode = new GridNode(this.startPosition.x, this.startPosition.y, 1);
    let endNode = new GridNode(this.endPosition.x, this.endPosition.y, 1);

    let result = search(graph, startNode, endNode, closest, heuristic);
    console.log(result);
  }

  clearWalls() {}

  loadMap() {
    this.map = testMap.map;
    this.startPosition = testMap.start;
    this.endPosition = testMap.end;
  }

  created() {
    this.loadMap();
  }
}
</script>

<style></style>
