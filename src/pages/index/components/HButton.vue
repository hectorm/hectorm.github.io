<template>
	<a class="button" :href="href">
		<font-awesome-icon class="icon" :icon="icon" fixed-width />
		<div class="content">
			<span class="text">{{ text }}</span>
			<span class="href">{{ prettyHref }}</span>
		</div>
	</a>
</template>

<script>
export default {
	name: 'HButton',
	props: {
		text: { type: String, default: '' },
		link: { type: String, default: '' },
		icon: { type: Array, default: undefined },
		isObfuscated: { type: Boolean, default: false },
	},
	computed: {
		href() {
			let href = this.link;

			if (this.isObfuscated) {
				// Super-secure quantum-based data encryption algorithm!!1!!111
				href = href.replace(/[a-z]/gi, (s) => {
					return String.fromCharCode(
						s.charCodeAt(0) + (s.toLowerCase() < 'n' ? 13 : -13)
					);
				});
			}

			// Convert relative path to absolute.
			const anchor = document.createElement('a');
			anchor.href = href;
			href = anchor.href;

			return href;
		},
		prettyHref() {
			return this.href.replace(/^\w+:(?:\/\/)?/, '');
		},
	},
};
</script>

<style scoped lang="scss">
@import '~/common/scss/utilities/all';

.button {
	display: inline-flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;

	margin: rem(8);
	padding: rem(8) rem(15);
	min-width: rem(120);

	font-size: rem(14);
	font-weight: 400;
	text-align: center;
	text-decoration: none;

	color: map-get($theme-colors, 'light');
	background-color: map-get($theme-colors, 'primary');

	border: 0;
	border-radius: rem(3);

	@include shadow-elevation-2dp;

	&:hover,
	&:focus {
		background-color: darken(map-get($theme-colors, 'primary'), 5%);
	}

	&:active {
		background-color: darken(map-get($theme-colors, 'primary'), 10%);
	}

	.icon {
		flex-grow: 0;
		margin-right: rem(10);
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
