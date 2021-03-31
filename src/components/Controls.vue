<template>
  <aside>
    <fieldset :disabled="processing">
      <legend>Settings</legend>
      Heuristic
      <div v-for="hue in heuristics" :key="hue">
        <input type="radio" :id="hue" :value="hue" v-model="hueStr" />
        <label :for="hue">{{ hue }}</label>
      </div>
      Options
      <div>
        <input type="checkbox" id="closest" v-model="closest" />
        <label for="closest">Find closest path</label>
      </div>
      <div>
        <input type="checkbox" id="showAnimation" v-model="showAnimation" />
        <label for="showAnimation">Show animation</label>
      </div>
      <div>
        <input type="checkbox" id="showCellCost" v-model="showCellCost"
        disabled="true"/>
        <label for="showCellCost">Show cell cost</label>
      </div>
    </fieldset>
    <fieldset :disabled="processing">
      <legend>Start</legend>
      <div>
        <label for="size">{{size}}</label>
        <input id="size" type="range" min="10" max="50" v-model="size"/>
        <button @click="onSizeChanged">Generate random map</button>
      </div>
      <button @click="start">Start</button>
      <button @click="$emit('clearPath')">
        Clear path
      </button>
      <button @click="$emit('clearWalls')">
        Clear walls
      </button>
    </fieldset>
  </aside>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { heuristics as methods } from "../lib/Astar";
import { mapState } from "vuex";

let Props = Vue.extend({
  props: {
    processing: {
      type: Boolean,
      required: true,
    },
  },
});

@Component({
  computed: mapState(["showCellCost", "map"]),
})
export default class Controls extends Props {
  hueStr = "manhattan";
  closest = true;
  showAnimation = false;
  size = "10";

  get heuristic() {
    return methods[this.hueStr];
  }

  get heuristics() {
    return Object.keys(methods);
  }

  set showCellCost(value) {
    this.$store.commit("setShowCellCost", value);
  }

  get showCellCost() {
    return this.$store.state.showCellCost;
  }

  onSizeChanged() {
    this.$emit('clearPath')

    let intSize = parseInt(this.size);
    let result = []
    for (let x = 0; x < intSize; x++) {
        let row = []
        for (let y = 0; y < intSize; y++) {
            row.push(this.getRandomInt(3));
        }
        result.push(row);
    }
    this.$store.commit("setMap", result);
    this.$store.commit("setEndPosition", {
        x: intSize - 1,
        y: intSize - 1
    });
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  start() {
    this.$emit("start", {
      heuristic: this.heuristic,
      closest: this.closest,
      showAnimation: this.showAnimation,
    });
  }
}
</script>

<style lang="postcss" scoped></style>
