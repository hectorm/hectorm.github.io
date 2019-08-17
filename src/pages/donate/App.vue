<template>
	<div class="app">
		<form class="form" v-on:submit.prevent="onSubmit">
			<h1 class="form-title">Donate to Héctor Molinero Fernández</h1>
			<p class="form-paragraph">
				Thanks for your interest in supporting my work! Your donation here
				supports my open source projects on
				<a href="https://github.com/hectorm">GitHub</a> and
				<a href="https://gitlab.com/hectorm">GitLab</a>.
			</p>
			<p class="form-paragraph">
				Donations are securely processed through
				<a href="https://stripe.com">Stripe</a>, and your payment information is
				not stored on my servers.
			</p>
			<div class="form-controls">
				<select
					class="form-element form-element-currency"
					v-model="skuId"
					aria-label="Currency"
				>
					<option v-for="sku in skus" :key="sku.id" :value="sku.id">
						{{ sku.name }}&nbsp;&nbsp;&nbsp;{{ sku.sign }}
					</option>
				</select>
				<input
					class="form-element form-element-amount"
					v-model.number="skuQuantity"
					type="number"
					step="1"
					min="1"
					placeholder="Amount"
					aria-label="Amount"
				/>
				<button
					class="form-element form-element-submit"
					type="submit"
					aria-label="Donate"
				>
					<font-awesome-icon class="icon" :icon="['fas', 'heart']" />
					<span class="text">Donate</span>
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
			stripe: null,
			publishableKey: 'pk_test_Tsub0AZ6ebZrZDlsXB4DRxPp00VThGBxg8',
			skuId: 'sku_Fdijf3icMPOTBV',
			skuQuantity: 10,
			skus: [
				{ id: 'sku_Fdijf3icMPOTBV', name: 'USD', sign: '$' },
				{ id: 'sku_FdijQbHVKGF6cl', name: 'EUR', sign: '€' },
				{ id: 'sku_FdlXfi5fXRpjVz', name: 'JPY', sign: '¥' },
				{ id: 'sku_FdikHBeDYiEVhT', name: 'GBP', sign: '£' },
				{ id: 'sku_FdlS2f9kBKV0Mg', name: 'AUD', sign: '$' },
				{ id: 'sku_FdlSZaaJsoV4ly', name: 'CAD', sign: '$' },
				{ id: 'sku_FdlSb5B40weJ0P', name: 'CHF', sign: 'Fr.' },
				{ id: 'sku_FdlSm7WqQZRhxg', name: 'CNY', sign: '¥' },
				{ id: 'sku_FdlTV8IcySlCTS', name: 'SEK', sign: 'kr' },
				{ id: 'sku_FdlT4cF0utrxQf', name: 'NZD', sign: '$' },
				{ id: 'sku_FdlTmqefXqHHvm', name: 'MXN', sign: '$' },
				{ id: 'sku_FdlT4UTcFLzvqS', name: 'SGD', sign: '$' },
				{ id: 'sku_FdlTDI7hsZuxt3', name: 'HKD', sign: '$' },
				{ id: 'sku_FdlTUI7GTqyX4k', name: 'NOK', sign: 'kr' },
				{ id: 'sku_FdlUByKnyVtfJL', name: 'KRW', sign: '₩' },
				{ id: 'sku_FdlUBSxge3bqHE', name: 'TRY', sign: '₺' },
				{ id: 'sku_FdlH69g0LjlvCU', name: 'RUB', sign: '₽' },
				{ id: 'sku_FdlUu2AxLfi8EO', name: 'INR', sign: '₹' },
				{ id: 'sku_FdlUgarCRyzcSc', name: 'BRL', sign: 'R$' },
				{ id: 'sku_FdlUSSuEUmJKJo', name: 'ZAR', sign: 'R' }
			]
				.filter(i => i.id.length > 0)
				.sort((a, b) => a.name.localeCompare(b.name)),
			successUrl: window.location.href,
			cancelUrl: window.location.href,
			submitType: 'donate',
			errorMessage: ''
		};
	},
	created() {
		try {
			this.stripe = Stripe(this.publishableKey);
		} catch (error) {
			this.errorMessage = error.message;
		}
	},
	methods: {
		async onSubmit() {
			try {
				await this.stripe.redirectToCheckout({
					items: [{ sku: this.skuId, quantity: this.skuQuantity }],
					successUrl: this.successUrl,
					cancelUrl: this.cancelUrl,
					submitType: this.submitType
				});
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
		max-width: rem(768);
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
		}

		.form-element {
			margin: 0 rem(20) rem(20) 0;
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
				width: rem(100);
				border-radius: rem(3) 0 0 rem(3);
				cursor: pointer;
				appearance: none;
			}

			&.form-element-amount {
				width: rem(100);
				text-align: right;
				border-radius: 0 rem(3) rem(3) 0;
				appearance: textfield;
				&::-webkit-outer-spin-button,
				&::-webkit-inner-spin-button {
					appearance: none;
				}
			}

			&.form-element-submit {
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
