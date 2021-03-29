<template>
  <div id="app">
    <controls
      :processing="processing"
      @clearWalls="clearWalls"
      @start="start"
      @clearPath="clearPath"
    ></controls>
    <map-viewer
      :map="map"
      :startPosition="startPosition"
      :endPosition="endPosition"
      :path="path"
    ></map-viewer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Controls from "./components/Controls.vue";
import MapViewer from "./components/MapViewer.vue";
import { Heuristic, search } from "./lib/Astar";
import testMap from "./maps/example.json";
import Graph from "./lib/Graph";
import GridNode from "./lib/GridNode";

interface Options {
  heuristic: Heuristic;
  closest: boolean;
  showAnimation: boolean;
}

// @ts-ignore
@Component({
  components: {
    MapViewer,
    Controls,
  },
})
export default class App extends Vue {
  map!: number[][];
  path: GridNode[] = [];
  processing = false;
  startPosition!: {
    x: number;
    y: number;
  };
  endPosition!: {
    x: number;
    y: number;
  };

  start({ heuristic, closest, showAnimation }: Options) {
    this.clearPath();

    let graph = new Graph(this.map);
    let startNode = new GridNode(this.startPosition.x, this.startPosition.y, 1);
    let endNode = new GridNode(this.endPosition.x, this.endPosition.y, 1);

    let result = search(graph, startNode, endNode, closest, heuristic);
    if (result === []) {
      alert("No path found.");
      return;
    }

    if (showAnimation) {
      console.log(result);

      this.processing = true;
      result.forEach((el, i) => {
        setTimeout(() => {
          this.path.push(el);
          if (i === result.length - 1) {
            this.processing = false;
          }
        }, i * 100);
      });
    } else {
      this.path = result;
    }
  }

  clearPath() {
    this.path = [];
  }

  clearWalls() {
    this.clearPath();
    this.map = this.map.map((x) => {
      return x.map(() => {
        return 1;
      });
    });
  }

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

<style>
html,
body {
  height: 100%;
  font-size: 16px;
}

#app {
  height: 100%;
  display: flex;
  margin: 0 4rem 0 4rem;
  align-items: center;
  justify-content: space-evenly;
}
</style>
