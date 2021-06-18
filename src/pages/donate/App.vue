<template>
	<form ref="form" class="form" @submit.prevent>
		<h1 class="form-title">
			Donate to
			<a href="./">Héctor Molinero Fernández</a>
		</h1>
		<p class="form-paragraph">
			Thanks for your interest in supporting my work! Your donation here
			supports my open source projects on
			<a href="https://github.com/hectorm">GitHub</a> and
			<a href="https://gitlab.com/hectorm">GitLab</a>.
		</p>
		<p class="form-paragraph">
			Donations are securely processed through
			<a href="https://stripe.com">Stripe</a> or
			<a href="https://paypal.com">PayPal</a>, and your payment information is
			not stored on my servers.
		</p>
		<div class="form-controls">
			<select
				v-model="currency"
				class="form-element form-element-currency"
				aria-label="Currency"
			>
				<option
					v-for="({ symbol }, name) in currencies"
					:key="name"
					:value="name"
				>
					{{ name }}&nbsp;&nbsp;&nbsp;{{ symbol }}
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
			<button
				class="form-element form-element-donate"
				type="button"
				aria-label="Donate with Stripe"
				@click="onDonateWithStripe"
			>
				<font-awesome-icon class="icon" :icon="['fas', 'heart']" />
				<span class="text">Donate with Stripe</span>
			</button>
			<button
				class="form-element form-element-donate"
				type="button"
				aria-label="Donate with PayPal"
				@click="onDonateWithPayPal"
			>
				<font-awesome-icon class="icon" :icon="['fas', 'heart']" />
				<span class="text">Donate with PayPal</span>
			</button>
		</div>
		<p v-if="errorMessage.length > 0" class="form-paragraph">
			<strong>Error:</strong> {{ errorMessage }}
		</p>
	</form>
</template>

<script>
import stripeKeys from './assets/stripe/live.json';

export default {
	name: 'App',
	data() {
		return {
			stripe: null,
			paypalId: 'HZ5SP6EEMXXYE',
			amount: 10,
			currency: 'USD',
			currencies: {
				AUD: { symbol: '$' },
				CAD: { symbol: '$' },
				CHF: { symbol: 'Fr.' },
				CZK: { symbol: 'Kč' },
				DKK: { symbol: 'kr' },
				EUR: { symbol: '€' },
				GBP: { symbol: '£' },
				HKD: { symbol: '$' },
				HUF: { symbol: 'Ft' },
				ILS: { symbol: '₪' },
				JPY: { symbol: '¥' },
				MXN: { symbol: '$' },
				NOK: { symbol: 'kr' },
				NZD: { symbol: '$' },
				PLN: { symbol: 'zł' },
				RUB: { symbol: '₽' },
				SEK: { symbol: 'kr' },
				SGD: { symbol: '$' },
				TRY: { symbol: 'TL' },
				USD: { symbol: '$' },
			},
			errorMessage: '',
		};
	},
	async created() {
		try {
			this.stripe = Stripe(stripeKeys.publishableKey);
		} catch (error) {
			this.errorMessage = error.message;
		}
	},
	methods: {
		async onDonateWithStripe() {
			try {
				const isValidForm = this.$refs.form.checkValidity();
				if (!isValidForm) return;

				const price = stripeKeys.skuIds[this.currency];
				const quantity = this.amount;
				await this.stripe.redirectToCheckout({
					mode: 'payment',
					submitType: 'donate',
					lineItems: [{ price, quantity }],
					successUrl: window.location.origin,
					cancelUrl: window.location.href,
				});
			} catch (error) {
				this.errorMessage = error.message;
			}
		},
		async onDonateWithPayPal() {
			try {
				const isValidForm = this.$refs.form.checkValidity();
				if (!isValidForm) return;

				window.location.href =
					'https://www.paypal.com/donate/?cmd=_donations' +
					`&business=${this.paypalId}` +
					`&amount=${encodeURIComponent(this.amount)}` +
					`&currency_code=${encodeURIComponent(this.currency)}` +
					'&no_note=0';
			} catch (error) {
				this.errorMessage = error.message;
			}
		},
	},
};
</script>

<style lang="scss">
@import '~@/scss/utilities/all';

body {
	margin: 0;
	height: 100vh;
	font-family: $system-sans-serif;
	font-size: $em-base-px;
	font-weight: 400;
	color: map-get($theme-colors, 'light');
	background-color: map-get($theme-colors, 'dark');
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
			padding: rem(8) rem(15);
			height: rem(40);

			font-size: rem(16);
			font-weight: 700;

			border: 0;
			border-radius: rem(3);

			color: map-get($theme-colors, 'primary');
			background-color: map-get($theme-colors, 'light');

			&:hover,
			&:focus {
				background-color: darken(map-get($theme-colors, 'light'), 5%);
			}

			&:active {
				background-color: darken(map-get($theme-colors, 'light'), 10%);
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

	.icon + .text {
		margin-left: rem(10);
	}
}
</style>
