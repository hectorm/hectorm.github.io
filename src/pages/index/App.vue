<script setup>
import NodeGarden from "~/common/components/NodeGarden.vue";

import HCard from "./components/HCard.vue";
</script>

<template>
  <h-card class="card" />
  <node-garden class="node-garden" />
</template>

<style lang="scss">
@use "sass:map";

@use "~/common/scss/utilities/globals";

@use "./scss/main";

body {
  margin: 0;
  height: 100vh;
  color: map.get(globals.$theme-colors, "light");
  background-color: map.get(globals.$theme-colors, "dark");
}

#app {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;

  .card {
    z-index: 1;
  }

  .node-garden {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    z-index: 0;
  }
}
</style>
