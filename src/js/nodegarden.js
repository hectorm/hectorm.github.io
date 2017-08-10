/*
 * See: https://github.com/pakastin/nodegarden
 */

export const pixelRatio = window.devicePixelRatio;

export function defined(a, b) {
	return typeof a === 'undefined' ? b : a;
}

export class Node {
	constructor(garden) {
		this.garden = garden;
		this.reset();
	}

	render() {
		this.garden.ctx.beginPath();
		this.garden.ctx.arc(this.x, this.y, this.getDiameter(), 0, 2 * Math.PI);
		this.garden.ctx.fill();
	}

	update() {
		this.x += this.vx;
		this.y += this.vy;

		if (this.x > this.garden.width + 50 || this.x < -50 || this.y > this.garden.height + 50 || this.y < -50) {
			// If node over screen limits - reset to a init position
			this.reset();
		}
	}

	reset({x, y, vx, vy, m} = {}) {
		this.x = defined(x, Math.random() * this.garden.width);
		this.y = defined(y, Math.random() * this.garden.height);
		this.vx = defined(vx, (Math.random() * 0.5) - 0.25);
		this.vy = defined(vy, (Math.random() * 0.5) - 0.25);
		this.m = defined(m, (Math.random() * 2.5) + 0.5);
	}

	addForce(force, direction) {
		this.vx += force * direction.x / this.m;
		this.vy += force * direction.y / this.m;
	}

	distanceTo(node) {
		let x = node.x - this.x;
		let y = node.y - this.y;
		let total = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

		return {x, y, total};
	}

	squaredDistanceTo(node) {
		return ((node.x - this.x) * (node.x - this.x)) + ((node.y - this.y) * (node.y - this.y));
	}

	collideTo(node) {
		node.vx = (node.m * node.vx / (this.m + node.m)) + (this.m * this.vx / (this.m + node.m));
		node.vy = (node.m * node.vy / (this.m + node.m)) + (this.m * this.vy / (this.m + node.m));

		this.reset();
	}

	getDiameter() {
		return this.m;
	}
}

export class NodeGarden {
	constructor(container) {
		this.nodes = [];
		this.container = container;
		this.canvas = document.createElement('canvas');
		this.ctx = this.canvas.getContext('2d');
		this.started = false;

		this.canvas.classList.add('nodegarden');

		if (pixelRatio !== 1) {
			// If retina screen, scale canvas
			this.canvas.style.transform = `scale(${1 / pixelRatio})`;
			this.canvas.style.transformOrigin = '0 0';
		}

		// Add mouse node
		let mouseNode = new Node(this);
		mouseNode.m = 0;

		mouseNode.update = () => {};
		mouseNode.reset = () => {};
		mouseNode.render = () => {};

		// Move coordinates to unreachable zone
		mouseNode.x = Number.MAX_SAFE_INTEGER;
		mouseNode.y = Number.MAX_SAFE_INTEGER;

		container.addEventListener('mousedown', event => {
			let element = document.elementFromPoint(event.clientX, event.clientY);
			if (element === this.container || element === this.canvas) {
				event.preventDefault();
			}

			mouseNode.m = 15;
		});

		container.addEventListener('mouseup', () => {
			mouseNode.m = 0;
		});

		container.addEventListener('mousemove', event => {
			mouseNode.x = event.pageX * pixelRatio;
			mouseNode.y = event.pageY * pixelRatio;
		});

		container.addEventListener('mouseleave', () => {
			mouseNode.x = Number.MAX_SAFE_INTEGER;
			mouseNode.y = Number.MAX_SAFE_INTEGER;
		});

		this.nodes.unshift(mouseNode);

		this.resize();
		this.container.appendChild(this.canvas);
	}

	render(start) {
		if (!this.playing) {
			return;
		}

		if (start) {
			requestAnimationFrame(() => {
				this.render(true);
			});
		}

		// Clear canvas
		this.ctx.clearRect(0, 0, this.width, this.height);

		// Update links
		let nodeA;
		let nodeB;

		for (let i = 0; i < this.nodes.length - 1; i++) {
			nodeA = this.nodes[i];

			for (let j = i + 1; j < this.nodes.length; j++) {
				nodeB = this.nodes[j];
				let squaredDistance = nodeA.squaredDistanceTo(nodeB);

				// Calculate gravity force
				let force = 3 * (nodeA.m * nodeB.m) / squaredDistance;

				let opacity = force * 100;

				if (opacity < 0.025) {
					continue;
				}

				if (squaredDistance <= ((nodeA.m / 2) + (nodeB.m / 2)) * ((nodeA.m / 2) + (nodeB.m / 2))) {
					// Collision: remove smaller or equal - never both of them
					if (nodeA.m <= nodeB.m) {
						nodeA.collideTo(nodeB);
					} else {
						nodeB.collideTo(nodeA);
					}

					continue;
				}

				let distance = nodeA.distanceTo(nodeB);

				// Calculate gravity direction
				let direction = {
					x: distance.x / distance.total,
					y: distance.y / distance.total
				};

				// Draw gravity lines
				this.ctx.beginPath();

				this.ctx.strokeStyle = `rgba(158,158,158,${opacity < 1 ? opacity : 1})`;

				this.ctx.moveTo(nodeA.x, nodeA.y);
				this.ctx.lineTo(nodeB.x, nodeB.y);
				this.ctx.stroke();

				nodeA.addForce(force, direction);
				nodeB.addForce(-force, direction);
			}
		}

		// Render and update nodes
		for (let i = 0; i < this.nodes.length; i++) {
			this.nodes[i].render();
			this.nodes[i].update();
		}
	}

	resize() {
		this.width = window.innerWidth * pixelRatio;
		this.height = window.innerHeight * pixelRatio;
		this.area = this.width * this.height;

		// Calculate nodes needed
		this.nodes.length = Math.sqrt(this.area) / 25 | 0;

		// Set canvas size
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		this.ctx.fillStyle = '#9e9e9e';

		// Create nodes
		for (let i = 0; i < this.nodes.length; i++) {
			if (this.nodes[i]) {
				continue;
			}

			this.nodes[i] = new Node(this);
		}
	}

	start() {
		if (!this.playing) {
			this.playing = true;
			this.render(true);
		}
	}

	stop() {
		if (this.playing) {
			this.playing = false;
		}
	}
}
