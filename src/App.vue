<template>
  <div id="app"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class App extends Vue {
  map = [
    [1, 1, 1, 1],
    [0, 1, 1, 0],
    [0, 0, 1, 1],
  ];
}
</script>

<style></style>
