<template>
	<div class="app">
		<form class="form" ref="form" @submit.prevent>
			<h1 class="form-title">
				Donate to
				<a href="https://hector.molinero.dev">Héctor Molinero Fernández</a>
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
					class="form-element form-element-currency"
					v-model="currency"
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
					class="form-element form-element-amount"
					v-model.number="amount"
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
			<p class="form-paragraph" v-if="errorMessage.length > 0">
				<strong>Error:</strong> {{ errorMessage }}
			</p>
		</form>
	</div>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			stripe: Stripe('pk_test_Tsub0AZ6ebZrZDlsXB4DRxPp00VThGBxg8'),
			paypalMeUrl: 'https://www.paypal.me/hectormf/',
			amount: 10,
			currency: 'USD',
			currencies: {
				AUD: { symbol: '$', stripeSkuId: 'sku_FeANfLsdAeHxho' },
				CAD: { symbol: '$', stripeSkuId: 'sku_FeANgaLZj0jseZ' },
				CHF: { symbol: 'Fr.', stripeSkuId: 'sku_FeANkpGsYSQsBC' },
				CZK: { symbol: 'Kč', stripeSkuId: 'sku_FeANhC1eA1d5lw' },
				DKK: { symbol: 'kr', stripeSkuId: 'sku_FeAOUrsSfsZIAI' },
				EUR: { symbol: '€', stripeSkuId: 'sku_FeAOECesAPZN4e' },
				GBP: { symbol: '£', stripeSkuId: 'sku_FeAOkbzAPmbaCL' },
				HKD: { symbol: '$', stripeSkuId: 'sku_FeAOk8gyokprGG' },
				HUF: { symbol: 'Ft', stripeSkuId: 'sku_FeAOZ0jBt7CyAa' },
				ILS: { symbol: '₪', stripeSkuId: 'sku_FeAO2C1sI79hPI' },
				JPY: { symbol: '¥', stripeSkuId: 'sku_FeAOAmxUiYIOw9' },
				MXN: { symbol: '$', stripeSkuId: 'sku_FeAPaD90cSuDqx' },
				NOK: { symbol: 'kr', stripeSkuId: 'sku_FeAPAlNbGJuA3Q' },
				NZD: { symbol: '$', stripeSkuId: 'sku_FeAPX7fAlCzken' },
				PLN: { symbol: 'zł', stripeSkuId: 'sku_FeAPAiDm0XHvNf' },
				RUB: { symbol: '₽', stripeSkuId: 'sku_FeAPaa9yYDm4vz' },
				SEK: { symbol: 'kr', stripeSkuId: 'sku_FeAPtSWEa5q0Ck' },
				SGD: { symbol: '$', stripeSkuId: 'sku_FeAQAeKTDSM9rZ' },
				TRY: { symbol: 'TL', stripeSkuId: 'sku_FeAQxCKx4FLqtt' },
				USD: { symbol: '$', stripeSkuId: 'sku_FeAQBPSAIv51ru' }
			},
			errorMessage: ''
		};
	},
	methods: {
		async onDonateWithStripe() {
			try {
				const isValidForm = this.$refs.form.checkValidity();
				if (!isValidForm) return;

				const sku = this.currencies[this.currency].stripeSkuId;
				const quantity = this.amount;
				await this.stripe.redirectToCheckout({
					items: [{ sku, quantity }],
					successUrl: window.location.origin,
					cancelUrl: window.location.href,
					submitType: 'donate'
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
					this.paypalMeUrl +
					encodeURIComponent(this.amount) +
					encodeURIComponent(this.currency);
			} catch (error) {
				this.errorMessage = error.message;
			}
		}
	}
};
</script>

<style lang="scss">
body {
	margin: 0;
	height: 100vh;
	font-family: $system-sans-serif;
	font-size: $em-base-px;
	font-weight: 400;
	color: map-get($theme-colors, 'light');
	background-color: map-get($theme-colors, 'dark');
}

.app {
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
