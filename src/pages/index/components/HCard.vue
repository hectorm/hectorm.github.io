<script setup>
import { faDocker, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faHeart, faKey } from "@fortawesome/free-solid-svg-icons";

import HButton from "./HButton.vue";
import HLogo from "./HLogo.vue";
</script>

<template>
  <div class="card">
    <h-logo class="logo" />
    <div class="content">
      <h1 class="title">Héctor Molinero Fernández</h1>
      <h2 class="title">Software developer and system administrator</h2>
      <h-button class="button" text="GitHub" link="https://github.com/hectorm" :icon="faGithub" />
      <h-button class="button" text="Docker" link="https://hub.docker.com/u/hectorm" :icon="faDocker" />
      <h-button class="button" text="Email" link="znvygb:urpgbe@zbyvareb.qri" :icon="faEnvelope" :obfuscated="true" />
      <h-button class="button" text="PGP" link="./key.asc" :icon="faKey" />
      <h-button class="button" text="Donate" link="./donate.html" :icon="faHeart" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "sass:map";

@use "~/common/scss/utilities/em";
@use "~/common/scss/utilities/globals";

.card {
  padding: em.toRem(20);
  text-align: center;
  text-shadow: em.toRem(1) em.toRem(1) em.toRem(2) map.get(globals.$theme-colors, "dark");
  pointer-events: none;

  .logo {
    width: 100%;
    max-width: em.toRem(256);
  }

  .content {
    width: 100%;
    max-width: em.toRem(448);

    .title {
      margin: 0 0 em.toRem(20);
      pointer-events: auto;
    }

    h1.title {
      font-size: em.toRem(30);
      font-weight: 400;
    }

    h2.title {
      font-size: em.toRem(20);
      font-weight: 300;
    }

    .button {
      text-shadow: none;
      pointer-events: auto;
    }
  }
}
</style>
