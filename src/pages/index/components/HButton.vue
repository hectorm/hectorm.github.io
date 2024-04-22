<script setup>
import { computed } from "vue";

import Fa from "vue-fa";

const props = defineProps({
  text: { type: String, default: "" },
  link: { type: String, default: "" },
  icon: { type: Object, default: undefined },
  obfuscated: { type: Boolean, default: false },
});

const href = computed(() => {
  let href = props.link;

  if (props.obfuscated) {
    // Super-secure quantum-based data encryption algorithm!!1!!111
    href = href.replace(/[a-z]/gi, (s) => {
      return String.fromCharCode(s.charCodeAt(0) + (s.toLowerCase() < "n" ? 13 : -13));
    });
  }

  // Convert relative path to absolute.
  const anchor = document.createElement("a");
  anchor.href = href;
  href = anchor.href;

  return href;
});

const prettyHref = computed(() => {
  return href.value.replace(/^\w+:(?:\/\/)?/, "");
});
</script>

<template>
  <a class="button" :href="href">
    <fa class="icon" :icon="icon" />
    <div class="content">
      <span class="text">{{ text }}</span>
      <span class="href">{{ prettyHref }}</span>
    </div>
  </a>
</template>

<style scoped lang="scss">
@import "~/common/scss/utilities/all";

.button {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  margin: toRem(8);
  padding: toRem(8) toRem(15);
  min-width: toRem(120);

  font-size: toRem(14);
  font-weight: 400;
  text-align: center;
  text-decoration: none;

  color: map-get($theme-colors, "light");
  background-color: map-get($theme-colors, "primary");

  border: 0;
  border-radius: toRem(3);

  @include shadow-elevation-2dp;

  &:hover,
  &:focus {
    background-color: darken(map-get($theme-colors, "primary"), 5%);
  }

  &:active {
    background-color: darken(map-get($theme-colors, "primary"), 10%);
  }

  .icon {
    flex-grow: 0;
    width: toRem(18);
    margin-right: toRem(10);
  }

  .content {
    flex-grow: 1;

    .text {
      display: block;
    }

    .href {
      display: none;
    }
  }

  @media print {
    display: flex;

    .content {
      .text {
        display: none;
      }

      .href {
        display: block;
      }
    }
  }
}
</style>
