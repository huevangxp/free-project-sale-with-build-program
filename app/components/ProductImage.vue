<script setup lang="ts">
// Decorative Hmong-textile-inspired diamond pattern, generated per product
// so the shop works without photo assets.
const props = defineProps<{
  colors: [string, string, string];
  seed?: number;
}>();

const cells = computed(() => {
  const out: { x: number; y: number; color: string; r: number }[] = [];
  const seed = props.seed ?? 1;
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const pick = (row * 5 + col + seed) % 3;
      out.push({
        x: col * 80 + 40,
        y: row * 80 + 40,
        color: props.colors[pick]!,
        r: (row + col + seed) % 2 === 0 ? 26 : 18,
      });
    }
  }
  return out;
});
</script>

<template>
  <svg
    viewBox="0 0 400 400"
    class="h-full w-full"
    role="img"
    aria-label="ລາຍປັກມົ້ງ"
  >
    <rect width="400" height="400" fill="#fdf9f3" />
    <rect
      x="10"
      y="10"
      width="380"
      height="380"
      fill="none"
      :stroke="colors[0]"
      stroke-width="6"
    />
    <rect
      x="24"
      y="24"
      width="352"
      height="352"
      fill="none"
      :stroke="colors[1]"
      stroke-width="2"
      stroke-dasharray="8 6"
    />
    <g v-for="(cell, i) in cells" :key="i">
      <rect
        :x="cell.x - cell.r"
        :y="cell.y - cell.r"
        :width="cell.r * 2"
        :height="cell.r * 2"
        :fill="cell.color"
        :transform="`rotate(45 ${cell.x} ${cell.y})`"
        opacity="0.9"
      />
      <rect
        v-if="cell.r > 20"
        :x="cell.x - 8"
        :y="cell.y - 8"
        width="16"
        height="16"
        fill="#fdf9f3"
        :transform="`rotate(45 ${cell.x} ${cell.y})`"
      />
    </g>
  </svg>
</template>
