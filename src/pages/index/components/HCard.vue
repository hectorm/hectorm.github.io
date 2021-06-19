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
				:icon="['fab', 'github']"
			/>
			<h-button
				class="button pointer"
				text="GitLab"
				link="https://gitlab.com/hectorm"
				:icon="['fab', 'gitlab']"
			/>
			<h-button
				class="button pointer"
				text="Docker"
				link="https://hub.docker.com/u/hectormolinero"
				:icon="['fab', 'docker']"
			/>
			<h-button
				class="button pointer"
				text="Email"
				link="znvygb:urpgbe@zbyvareb.qri"
				:icon="['fas', 'envelope']"
				:is-obfuscated="true"
			/>
			<h-button
				class="button pointer"
				text="PGP"
				link="./key.asc"
				:icon="['fas', 'key']"
			/>
			<h-button
				class="button pointer"
				text="Donate"
				link="./donate.html"
				:icon="['fas', 'heart']"
			/>
		</div>
	</div>
</template>

<script>
import HButton from './HButton.vue';
import HLogo from './HLogo.vue';

export default {
	name: 'HCard',
	components: {
		HButton,
		HLogo,
	},
};
</script>

<style scoped lang="scss">
@import '~/common/scss/utilities/all';

.card {
	padding: rem(20);
	text-align: center;
	text-shadow: rem(1) rem(1) rem(2) map-get($theme-colors, 'dark');

	.logo {
		width: 100%;
		max-width: rem(256);
	}

	.content {
		width: 100%;
		max-width: rem(448);

		.title {
			margin: 0 0 rem(20);
		}

		h1.title {
			font-size: rem(30);
			font-weight: 400;
		}

		h2.title {
			font-size: rem(20);
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
