<script setup>
import { faEnvelope, faHeart, faKey } from "@fortawesome/free-solid-svg-icons";
import { faDocker, faGithub } from "@fortawesome/free-brands-svg-icons";

import HButton from "./HButton.vue";
import HLogo from "./HLogo.vue";
</script>

<template>
  <div class="card">
    <h-logo class="logo" />
    <div class="content">
      <h1 class="title pointer">Héctor Molinero Fernández</h1>
      <h2 class="title pointer">Software developer and system administrator</h2>
      <h-button
        class="button pointer"
        text="GitHub"
        link="https://github.com/hectorm"
        :icon="faGithub"
      />
      <h-button
        class="button pointer"
        text="Docker"
        link="https://hub.docker.com/u/hectorm"
        :icon="faDocker"
      />
      <h-button
        class="button pointer"
        text="Email"
        link="znvygb:urpgbe@zbyvareb.qri"
        :icon="faEnvelope"
        :is-obfuscated="true"
      />
      <h-button
        class="button pointer"
        text="PGP"
        link="./key.asc"
        :icon="faKey"
      />
      <h-button
        class="button pointer"
        text="Donate"
        link="./donate.html"
        :icon="faHeart"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "~/common/scss/utilities/all";

.card {
  padding: toRem(20);
  text-align: center;
  text-shadow: toRem(1) toRem(1) toRem(2) map-get($theme-colors, "dark");

  .logo {
    width: 100%;
    max-width: toRem(256);
  }

  .content {
    width: 100%;
    max-width: toRem(448);

    .title {
      margin: 0 0 toRem(20);
    }

    h1.title {
      font-size: toRem(30);
      font-weight: 400;
    }

    h2.title {
      font-size: toRem(20);
      font-weight: 300;
    }

    .button {
      text-shadow: none;
    }
  }

  pointer-events: none;

  .pointer {
    pointer-events: auto;
  }
}
</style>
