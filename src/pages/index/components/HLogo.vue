<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		version="1.1"
		viewBox="0 256 1024 512"
		preserveAspectRatio="xMidYMid meet"
		class="logo"
	>
		<g class="a g0">
			<line
				class="a l0"
				x1="032.00px"
				y1="384.00px"
				x2="992.00px"
				y2="384.00px"
				stroke="currentColor"
				stroke-width="40px"
			/>
			<line
				class="a l1"
				x1="032.00px"
				y1="640.00px"
				x2="992.00px"
				y2="640.00px"
				stroke="currentColor"
				stroke-width="40px"
			/>
			<line
				class="a Z0"
				x1="044.85px"
				y1="635.33px"
				x2="339.15px"
				y2="388.66px"
				stroke="currentColor"
				stroke-width="40px"
			/>
			<line
				class="a N0"
				x1="372.00px"
				y1="384.00px"
				x2="372.00px"
				y2="640.00px"
				stroke="currentColor"
				stroke-width="40px"
			/>
			<line
				class="a N1"
				x1="387.85px"
				y1="388.15px"
				x2="636.15px"
				y2="635.85px"
				stroke="currentColor"
				stroke-width="40px"
			/>
			<line
				class="a N2"
				x1="652.00px"
				y1="384.00px"
				x2="652.00px"
				y2="640.00px"
				stroke="currentColor"
				stroke-width="40px"
			/>
			<line
				class="a T0"
				x1="832.00px"
				y1="640.00px"
				x2="832.00px"
				y2="384.00px"
				stroke="currentColor"
				stroke-width="40px"
			/>
		</g>
	</svg>
</template>

<script>
export default {
	name: 'HLogo',
};
</script>

<style scoped lang="scss">
@import '~/common/scss/utilities/all';

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
	.a {
		animation-fill-mode: forwards;
		animation-timing-function: cubic-bezier(0, 0, 0.128, 1.28);
	}

	.g0 {
		animation-name: fadeIn;
		animation-duration: 0.5s;
	}

	.l0 {
		animation-name: fromRight;
		animation-duration: 0.8s;
	}

	.l1 {
		animation-name: fromLeft;
		animation-duration: 0.8s;
	}

	.Z0 {
		animation-name: fromBottomRight;
		animation-duration: 0.6s;
	}

	.N0 {
		animation-name: fromBottom;
		animation-duration: 0.7s;
	}

	.N1 {
		animation-name: fromTopRight;
		animation-duration: 0.8s;
	}

	.N2 {
		animation-name: fromTop;
		animation-duration: 0.9s;
	}

	.T0 {
		animation-name: fromBottom;
		animation-duration: 1s;
	}
}
</style>
