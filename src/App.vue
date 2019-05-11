<template>
	<div class="app">
		<h-card class="card" />
		<h-node-garden class="node-garden" />
	</div>
</template>

<script>
import HCard from '@/components/HCard.vue';
import HNodeGarden from '@/components/HNodeGarden.vue';

export default {
	name: 'App',
	components: {
		HCard,
		HNodeGarden
	}
};
</script>

<style lang="scss">
body {
	margin: 0;
	height: 100vh;
	overflow-x: hidden;
	font-family: $system-sans-serif;
	font-size: $em-base-px;
	font-weight: 400;
	color: map-get($theme-colors, 'light');
	background-color: map-get($theme-colors, 'dark');
}

.app {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100%;

	.card {
		z-index: 1;
	}

	.node-garden {
		z-index: 0;
	}
}
</style>
