<!-- Based on https://github.com/pakastin/nodegarden -->

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";

const container = ref(null);

const canvas = document.createElement("canvas");
let ctx = null;

const nodes = [];
const nodesMax = 200;
const nodesColors = {
  node: { r: 0xe5, g: 0xe9, b: 0xf0 },
  repel: { r: 0x5e, g: 0x81, b: 0xac },
  attract: { r: 0xbf, g: 0x61, b: 0x6a },
};

let mounted = false;

class Node {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.reset();
  }

  render() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.getDiameter(), 0, 2 * Math.PI);
    this.ctx.fill();
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x > this.canvas.width + 50 || this.x < -50 || this.y > this.canvas.height + 50 || this.y < -50) {
      // If node over screen limits - reset to a init position.
      this.reset();
    }
  }

  reset({ x, y, vx, vy, m, c } = {}) {
    this.x = defaultTo(x, Math.random() * this.canvas.width);
    this.y = defaultTo(y, Math.random() * this.canvas.height);
    this.vx = defaultTo(vx, Math.random() * 0.5 - 0.25);
    this.vy = defaultTo(vy, Math.random() * 0.5 - 0.25);
    this.m = defaultTo(m, Math.random() * 3 + 0.5);
    this.c = defaultTo(c, Math.random() >= 0.5 ? 1 : -1);
  }

  addForce(force, direction) {
    this.vx += (force * direction.x) / this.m;
    this.vy += (force * direction.y) / this.m;
  }

  distanceTo(node) {
    const x = node.x - this.x;
    const y = node.y - this.y;
    const total = Math.sqrt(x ** 2 + y ** 2);
    return { x, y, total };
  }

  squaredDistanceTo(node) {
    return (node.x - this.x) * (node.x - this.x) + (node.y - this.y) * (node.y - this.y);
  }

  collideTo(node) {
    node.vx = (node.m * node.vx) / (this.m + node.m) + (this.m * this.vx) / (this.m + node.m);
    node.vy = (node.m * node.vy) / (this.m + node.m) + (this.m * this.vy) / (this.m + node.m);
    this.reset();
  }

  getDiameter() {
    return this.m;
  }
}

const defaultTo = (value, defaultValue) => {
  return typeof value === "undefined" ? defaultValue : value;
};

const render = () => {
  if (!mounted) {
    return;
  }

  // Clear canvas.
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update links.
  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i];

    for (let j = i + 1; j < nodes.length; j++) {
      const b = nodes[j];

      const attract = a.c !== b.c;

      // Collision: remove smaller or equal, never both of them.
      const squaredDistance = a.squaredDistanceTo(b);
      if (attract && squaredDistance <= (a.m / 2 + b.m / 2) ** 2) {
        if (a.m <= b.m) {
          a.collideTo(b);
        } else {
          b.collideTo(a);
        }
        continue;
      }

      // Calculate gravity force.
      const force = (2 * (a.m * b.m)) / squaredDistance;
      const distance = a.distanceTo(b);
      const direction = {
        x: distance.x / distance.total,
        y: distance.y / distance.total,
      };
      a.addForce((attract ? 1 : -1) * force, direction);
      b.addForce((attract ? 1 : -1) * -force, direction);

      // Draw gravity lines
      const opacity = force * 100;
      if (opacity >= 0.025) {
        let color;
        if (attract) {
          color = nodesColors.attract;
        } else {
          color = nodesColors.repel;
        }
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${opacity})`;
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
  }

  // Render and update nodes.
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].render();
    nodes[i].update();
  }

  requestAnimationFrame(render);
};

const resize = () => {
  // If retina screen, scale canvas.
  if (window.devicePixelRatio !== 1) {
    canvas.style.transformOrigin = "0 0";
    canvas.style.transform = `scale(${1 / window.devicePixelRatio})`;
  }

  const width = container.value.offsetWidth * window.devicePixelRatio;
  const height = container.value.offsetHeight * window.devicePixelRatio;
  const area = width * height;

  // Calculate nodes needed.
  nodes.length = Math.min((Math.sqrt(area) / 10) | 0, nodesMax);

  // Set canvas size.
  canvas.width = width;
  canvas.height = height;

  const color = nodesColors.node;
  ctx.fillStyle = `rgb(${color.r},${color.g},${color.b})`;

  // Create nodes.
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i]) continue;
    nodes[i] = new Node(canvas);
  }
};

const onClick = () => {
  nodes[0].c *= -1;
};

const onMousemove = (event) => {
  nodes[0].x = event.pageX * window.devicePixelRatio;
  nodes[0].y = event.pageY * window.devicePixelRatio;
};

const onMouseleave = () => {
  nodes[0].x = Number.MAX_SAFE_INTEGER;
  nodes[0].y = Number.MAX_SAFE_INTEGER;
};

onMounted(() => {
  nextTick(() => {
    mounted = true;

    container.value.append(canvas);
    ctx = canvas.getContext("2d");

    // Add mouse node.
    const mouseNode = new Node(canvas);
    mouseNode.update = () => {};
    mouseNode.reset = () => {};
    mouseNode.render = () => {};
    mouseNode.m = 15;
    mouseNode.c = 1;
    // Move coordinates to unreachable zone.
    mouseNode.x = Number.MAX_SAFE_INTEGER;
    mouseNode.y = Number.MAX_SAFE_INTEGER;

    nodes.length = 0;
    nodes.push(mouseNode);

    setTimeout(() => {
      resize();
      render();
    }, 10);

    window.addEventListener("resize", resize);
  });
});

onBeforeUnmount(() => {
  mounted = false;
  window.removeEventListener("resize", resize);
});
</script>

<template>
  <div ref="container" class="node-garden" @click="onClick" @mousemove="onMousemove" @mouseleave="onMouseleave"></div>
</template>
