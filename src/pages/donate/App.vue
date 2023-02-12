<script setup>
import { ref } from "vue";

import Fa from "vue-fa";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

// import stripeConf from "./assets/stripe/live.json";
import paypalConf from "./assets/paypal.json";

const form = ref(null);
// const stripe = ref(Stripe(stripeConf.publishableKey));
const paypalId = ref(paypalConf.id);
const amount = ref(10);
const currency = ref("USD");
const currencies = ref({
  AUD: { symbol: "$" },
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
  PLN: { symbol: "zł" },
  RUB: { symbol: "₽" },
  SEK: { symbol: "kr" },
  SGD: { symbol: "$" },
  TRY: { symbol: "TL" },
  USD: { symbol: "$" },
});
const errorMessage = ref("");

/*
const onDonateWithStripe = async () => {
  try {
    const isValidForm = form.value.checkValidity();
    if (!isValidForm) return;

    const price = stripeConf.skuIds[currency.value];
    const quantity = amount.value;
    await stripe.value.redirectToCheckout({
      mode: "payment",
      submitType: "donate",
      lineItems: [{ price, quantity }],
      successUrl: window.location.origin,
      cancelUrl: window.location.href,
    });
  } catch (error) {
    errorMessage.value = error.message;
  }
};
*/

const onDonateWithPayPal = async () => {
  try {
    const isValidForm = form.value.checkValidity();
    if (!isValidForm) return;

    window.location.href =
      "https://www.paypal.com/donate/?cmd=_donations" +
      `&business=${paypalId.value}` +
      `&amount=${encodeURIComponent(amount.value)}` +
      `&currency_code=${encodeURIComponent(currency.value)}` +
      "&no_note=0";
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
      Thank you for your interest in supporting my work! Your donation here
      will support my open source projects on
      <a href="https://github.com/hectorm">GitHub</a>.
    </p>
    <p class="form-paragraph">
      Donations are securely processed through
      <!--<a href="https://stripe.com">Stripe</a> or-->
      <a href="https://paypal.com">PayPal</a> and your payment information is
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
      />
      <!--
      <button
        class="form-element form-element-donate"
        type="button"
        aria-label="Donate with Stripe"
        @click="onDonateWithStripe"
      >
        <fa class="icon" :icon="faHeart" />
        <span class="text">Donate with Stripe</span>
      </button>
      -->
      <button
        class="form-element form-element-donate"
        type="button"
        aria-label="Donate with PayPal"
        @click="onDonateWithPayPal"
      >
        <fa class="icon" :icon="faHeart" />
        <span class="text">Donate with PayPal</span>
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
    margin: rem(30);
    max-width: rem(750);
    z-index: 1;

    .form-title,
    .form-paragraph {
      margin-top: 0;
    }

    .form-title {
      margin-bottom: rem(30);
    }

    .form-paragraph {
      margin-bottom: rem(20);
      text-align: justify;
    }

    .form-controls {
      margin-bottom: rem(20);
      text-align: center;
    }

    .form-element {
      margin: rem(10);
      padding: rem(6) rem(12);
      height: rem(40);
      vertical-align: middle;

      font-size: rem(16);
      font-weight: 700;

      border: 0;
      border-radius: rem(3);

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
        width: rem(115);
        border-radius: rem(3) 0 0 rem(3);
        cursor: pointer;
        appearance: none;
      }

      &.form-element-amount {
        margin-left: 0;
        width: rem(115);
        text-align: right;
        border-radius: 0 rem(3) rem(3) 0;
        appearance: textfield;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          appearance: none;
        }
      }

      &.form-element-donate {
        width: rem(230);
        cursor: pointer;
        appearance: none;
      }
    }
  }

  .icon {
    width: rem(18);

    & + .text {
      margin-left: rem(10);
    }
  }
}
</style>
