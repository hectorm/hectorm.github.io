<script setup>
import { ref } from "vue";

import Fa from "vue-fa";
import { faPaypal, faGithub } from "@fortawesome/free-brands-svg-icons";

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
      Thank you for your interest in supporting my work! Your donation here will
      support my open source projects on
      <a href="https://github.com/hectorm">GitHub</a>.
    </p>
    <p class="form-paragraph">
      Donations are securely processed through
      <a href="https://paypal.com">PayPal</a> or
      <a href="https://github.com">GitHub</a> and your payment information is
      not stored on my servers.
    </p>
    <div class="form-controls">
      <select
        v-model="currency"
        class="form-element form-element-currency"
        aria-label="Currency"
      >
        <option v-for="(v, k) in currencies" :key="k" :value="k">
          {{ k }}&nbsp;&nbsp;&nbsp;{{ v.symbol }}
        </option>
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
    <p v-if="errorMessage.length > 0" class="form-paragraph">
      <strong>Error:</strong> {{ errorMessage }}
    </p>
  </form>
</template>

<style lang="scss">
@import "./scss/main.scss";

body {
  margin: 0;
  height: 100vh;
  color: map-get($theme-colors, "light");
  background-color: map-get($theme-colors, "dark");
}

#app {
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;

  .form {
    margin: toRem(30);
    max-width: toRem(750);
    z-index: 1;

    .form-title,
    .form-paragraph {
      margin-top: 0;
    }

    .form-title {
      margin-bottom: toRem(30);
    }

    .form-paragraph {
      margin-bottom: toRem(20);
      text-align: justify;
    }

    .form-controls {
      margin-bottom: toRem(20);
      text-align: center;
    }

    .form-element {
      margin: toRem(10);
      padding: toRem(6) toRem(12);
      height: toRem(40);
      vertical-align: middle;

      font-size: toRem(16);
      font-weight: 700;

      border: 0;
      border-radius: toRem(3);

      color: map-get($theme-colors, "primary");
      background-color: map-get($theme-colors, "light");

      &:hover,
      &:focus {
        background-color: darken(map-get($theme-colors, "light"), 5%);
      }

      &:active {
        background-color: darken(map-get($theme-colors, "light"), 10%);
      }

      &.form-element-currency {
        margin-right: 0;
        width: toRem(115);
        border-radius: toRem(3) 0 0 toRem(3);
        cursor: pointer;
        appearance: none;
      }

      &.form-element-amount {
        margin-left: 0;
        width: toRem(115);
        text-align: right;
        border-radius: 0 toRem(3) toRem(3) 0;
        appearance: textfield;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          appearance: none;
        }
      }

      &.form-element-donate {
        width: toRem(230);
        cursor: pointer;
        appearance: none;
      }
    }
  }

  .icon {
    width: toRem(18);

    & + .text {
      margin-left: toRem(10);
    }
  }
}
</style>
