<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		version="1.1"
		viewBox="0 256 1024 512"
		preserveAspectRatio="xMidYMid meet"
		class="logo"
	>
		<g class="g0">
			<line
				class="l0"
				x1="032"
				y1="384"
				x2="992"
				y2="384"
				stroke="currentColor"
				stroke-width="40px"
			/>
			<line
				class="l1"
				x1="032"
				y1="640"
				x2="992"
				y2="640"
				stroke="currentColor"
				stroke-width="40px"
			/>
			<line
				class="Z0"
				x1="044.85"
				y1="635.33"
				x2="339.15"
				y2="388.66"
				stroke="currentColor"
				stroke-width="40px"
			/>
			<line
				class="N0"
				x1="372"
				y1="384"
				x2="372"
				y2="640"
				stroke="currentColor"
				stroke-width="40px"
			/>
			<line
				class="N1"
				x1="387.85"
				y1="388.15"
				x2="636.15"
				y2="635.85"
				stroke="currentColor"
				stroke-width="40px"
			/>
			<line
				class="N2"
				x1="652"
				y1="384"
				x2="652"
				y2="640"
				stroke="currentColor"
				stroke-width="40px"
			/>
			<line
				class="T0"
				x1="832"
				y1="640"
				x2="832"
				y2="384"
				stroke="currentColor"
				stroke-width="40px"
			/>
		</g>
	</svg>
</template>

<script>
export default {
	name: 'HLogo'
};
</script>

<style scoped lang="scss">
@keyframes fadeIn {
	0% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}

@keyframes fromTop {
	0% {
		transform: translate(0, -1536px);
	}
	100% {
		transform: translate(0, 0);
	}
}

@keyframes fromRight {
	0% {
		transform: translate(-1536px, 0);
	}
	100% {
		transform: translate(0, 0);
	}
}

@keyframes fromBottom {
	0% {
		transform: translate(0, 1536px);
	}
	100% {
		transform: translate(0, 0);
	}
}

@keyframes fromLeft {
	0% {
		transform: translate(1536px, 0);
	}
	100% {
		transform: translate(0, 0);
	}
}

@keyframes fromTopRight {
	0% {
		transform: translate(-1536px, -1536px);
	}
	100% {
		transform: translate(0, 0);
	}
}

@keyframes fromBottomRight {
	0% {
		transform: translate(-1536px, 1536px);
	}
	100% {
		transform: translate(0, 0);
	}
}

.logo {
	$easing: cubic-bezier(0, 0, 0.128, 1.28);

	.g0 {
		animation: fadeIn 0.5s $easing;
	}

	.l0 {
		animation: fromRight 0.8s $easing;
	}

	.l1 {
		animation: fromLeft 0.8s $easing;
	}

	.Z0 {
		animation: fromBottomRight 0.6s $easing;
	}

	.N0 {
		animation: fromBottom 0.7s $easing;
	}

	.N1 {
		animation: fromTopRight 0.8s $easing;
	}

	.N2 {
		animation: fromTop 0.9s $easing;
	}

	.T0 {
		animation: fromBottom 1s $easing;
	}
}
</style>
