<template>
  <aside>
    <fieldset>
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
        <input type="checkbox" id="showCellCost" v-model="showCellCost" />
        <label for="showCellCost">Show cell cost</label>
      </div>
      <div>
        <input type="number" id="weight" min="1" max="100" v-model="weight" />
        <label for="weight"> Weight</label>
      </div>
    </fieldset>
    <fieldset>
      <button :disabled="processing" @click="start">Start</button>
      <button :disabled="processing" @click="$emit('clearWalls')">
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
  computed: mapState(["weight", "showCellCost"]),
})
export default class Controls extends Props {
  hueStr = "manhattan";
  closest = true;

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

  set weight(value) {
    this.$store.commit("setWeight", parseInt(value));
  }

  get weight() {
    return this.$store.state.weight;
  }

  start() {
    this.$emit("start", {
      heuristic: this.heuristic,
      closest: this.closest,
    });
  }
}
</script>

<style lang="postcss" scoped></style>
