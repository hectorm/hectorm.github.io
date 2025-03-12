<script setup>
import { ref } from "vue";

import { faGithub, faPaypal } from "@fortawesome/free-brands-svg-icons";
import Fa from "vue-fa";

import { fetchRates } from "./utils/fetch-rates.js";

const form = ref(null);
const amount = ref(10);
const currency = ref("USD");
const currencies = ref({
  AUD: { symbol: "$" },
  BRL: { symbol: "R$" },
  CAD: { symbol: "$" },
  CHF: { symbol: "Fr." },
  CZK: { symbol: "Kč" },
  DKK: { symbol: "kr" },
  EUR: { symbol: "€" },
  GBP: { symbol: "£" },
  HKD: { symbol: "$" },
  HUF: { symbol: "Ft" },
  ILS: { symbol: "₪" },
  JPY: { symbol: "¥" },
  MXN: { symbol: "$" },
  NOK: { symbol: "kr" },
  NZD: { symbol: "$" },
  PHP: { symbol: "₱" },
  PLN: { symbol: "zł" },
  RUB: { symbol: "₽" },
  SEK: { symbol: "kr" },
  SGD: { symbol: "$" },
  THB: { symbol: "฿" },
  TWD: { symbol: "NT$" },
  USD: { symbol: "$" },
});
const errorMessage = ref("");

const onDonateWithPayPal = async () => {
  try {
    if (!form.value.reportValidity()) return;

    const url = new URL("https://www.paypal.com/donate/");
    url.searchParams.set("cmd", "_donations");
    url.searchParams.set("business", "HZ5SP6EEMXXYE");
    url.searchParams.set("amount", amount.value);
    url.searchParams.set("currency_code", currency.value);

    window.location.href = url.href;
  } catch (error) {
    errorMessage.value = error.message;
  }
};

const onDonateWithGitHub = async () => {
  try {
    if (!form.value.reportValidity()) return;

    const rates = await fetchRates();
    const amountUsd = (amount.value / rates.get(currency.value)) | 0;

    const url = new URL("https://github.com/sponsors/hectorm");
    url.searchParams.set("frequency", "one-time");
    url.searchParams.set("amount", amountUsd);

    window.location.href = url.href;
  } catch (error) {
    errorMessage.value = error.message;
  }
};
</script>

<template>
  <form ref="form" class="form" @submit.prevent>
    <h1 class="form-title">
      Donate to
      <a href="./">Héctor Molinero Fernández</a>
    </h1>
    <p class="form-paragraph">
      Thank you for your interest in supporting my work! Your donation here will support my open source projects on
      <a href="https://github.com/hectorm">GitHub</a>.
    </p>
    <p class="form-paragraph">
      Donations are securely processed through
      <a href="https://paypal.com">PayPal</a> or <a href="https://github.com">GitHub</a> and your payment information is
      not stored on my servers.
    </p>
    <div class="form-controls">
      <select v-model="currency" class="form-element form-element-currency" aria-label="Currency">
        <option v-for="(v, k) in currencies" :key="k" :value="k">{{ k }}&nbsp;&nbsp;&nbsp;{{ v.symbol }}</option>
      </select>
      <input
        v-model.number="amount"
        class="form-element form-element-amount"
        type="number"
        step="1"
        min="1"
        placeholder="Amount"
        aria-label="Amount"
        required
      />
      <button
        class="form-element form-element-donate"
        type="button"
        aria-label="Donate with PayPal"
        @click="onDonateWithPayPal"
      >
        <fa class="icon" :icon="faPaypal" />
        <span class="text">Donate with PayPal</span>
      </button>
      <button
        class="form-element form-element-donate"
        type="button"
        aria-label="Donate with GitHub"
        @click="onDonateWithGitHub"
      >
        <fa class="icon" :icon="faGithub" />
        <span class="text">Donate with GitHub</span>
      </button>
    </div>
    <p v-if="errorMessage.length > 0" class="form-paragraph"><strong>Error:</strong> {{ errorMessage }}</p>
  </form>
</template>

<style lang="scss">
@use "sass:color";
@use "sass:map";

@use "~/common/scss/utilities/em";
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

  .form {
    margin: em.toRem(30);
    max-width: em.toRem(750);
    z-index: 1;

    .form-title,
    .form-paragraph {
      margin-top: 0;
    }

    .form-title {
      margin-bottom: em.toRem(30);
    }

    .form-paragraph {
      margin-bottom: em.toRem(20);
      text-align: justify;
    }

    .form-controls {
      margin-bottom: em.toRem(20);
      text-align: center;
    }

    .form-element {
      margin: em.toRem(10);
      padding: em.toRem(6) em.toRem(12);
      height: em.toRem(40);
      vertical-align: middle;

      font-size: em.toRem(16);
      font-weight: 700;

      border: 0;
      border-radius: em.toRem(3);

      color: map.get(globals.$theme-colors, "primary");
      background-color: map.get(globals.$theme-colors, "light");

      &:hover,
      &:focus {
        background-color: color.scale(map.get(globals.$theme-colors, "light"), $lightness: -5%);
      }

      &:active {
        background-color: color.scale(map.get(globals.$theme-colors, "light"), $lightness: -10%);
      }

      &.form-element-currency {
        margin-right: 0;
        width: em.toRem(115);
        border-radius: em.toRem(3) 0 0 em.toRem(3);
        cursor: pointer;
        appearance: none;
      }

      &.form-element-amount {
        margin-left: 0;
        width: em.toRem(115);
        text-align: right;
        border-radius: 0 em.toRem(3) em.toRem(3) 0;
        appearance: textfield;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          appearance: none;
        }
      }

      &.form-element-donate {
        width: em.toRem(230);
        cursor: pointer;
        appearance: none;
      }
    }
  }

  .icon {
    width: em.toRem(18);

    & + .text {
      margin-left: em.toRem(10);
    }
  }
}
</style>
