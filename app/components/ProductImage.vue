<script setup lang="ts">
// Product visual. Shows the real photo when `image` is set; otherwise draws
// a Hmong-outfit illustration (mannequin in an arch alcove, like a studio
// product photo) so the shop works before photos are added.
const props = defineProps<{
  colors: [string, string, string];
  seed?: number;
  kind?: "dress" | "hat" | "belt" | "scarf";
  image?: string;
  alt?: string;
}>();

const kind = computed(() => props.kind ?? "dress");

// Rotate the palette by seed so same-kind products still look distinct.
const c = computed<[string, string, string]>(() => {
  const s = (props.seed ?? 0) % 3;
  const arr = props.colors;
  return [arr[s]!, arr[(s + 1) % 3]!, arr[(s + 2) % 3]!];
});
</script>

<template>
  <img
    v-if="image"
    :src="image"
    :alt="alt ?? 'ຮູບສິນຄ້າ'"
    class="h-full w-full object-cover"
    loading="lazy"
  />
  <svg
    v-else
    viewBox="0 0 300 400"
    class="h-full w-full"
    role="img"
    :aria-label="alt ?? 'ຮູບສິນຄ້າ'"
  >
    <!-- studio backdrop with arch -->
    <rect width="300" height="400" fill="#faf7f2" />
    <path d="M55,400 V175 A95 95 0 0 1 245,175 V400 Z" fill="#f0eae1" />
    <path
      d="M67,400 V180 A83 83 0 0 1 233,180 V400"
      fill="none"
      stroke="#e2dacd"
      stroke-width="3"
    />
    <ellipse cx="150" cy="356" rx="82" ry="8" fill="#000000" opacity="0.07" />

    <!-- ============ full outfit (dress) ============ -->
    <g v-if="kind === 'dress'">
      <!-- hat -->
      <ellipse cx="150" cy="64" rx="25" ry="20" fill="#1c1c1c" />
      <rect x="127" y="72" width="46" height="9" fill="#ffffff" />
      <rect
        v-for="i in 5"
        :key="`hb${i}`"
        :x="127 + i * 8 - 6"
        y="72"
        width="4"
        height="9"
        fill="#1c1c1c"
      />
      <!-- head (mannequin) -->
      <circle cx="150" cy="93" r="11" fill="#eae2d6" />
      <!-- dress body -->
      <path
        d="M150,103 C134,106 116,112 110,121 L97,190 L88,348 L212,348 L203,190 L190,121 C184,112 166,106 150,103 Z"
        fill="#191919"
      />
      <!-- sleeves -->
      <path
        d="M110,121 C96,134 87,155 81,208 L101,213 C104,176 108,151 116,133 Z"
        fill="#0f0f0f"
      />
      <path
        d="M190,121 C204,134 213,155 219,208 L199,213 C196,176 192,151 184,133 Z"
        fill="#0f0f0f"
      />
      <!-- cuffs -->
      <rect x="79" y="199" width="24" height="13" :fill="c[1]" />
      <rect x="79" y="204" width="24" height="3" fill="#ffffff" opacity="0.8" />
      <rect x="197" y="199" width="24" height="13" :fill="c[1]" />
      <rect x="197" y="204" width="24" height="3" fill="#ffffff" opacity="0.8" />
      <!-- collar lapels -->
      <path d="M150,105 L129,128 L141,143 L150,124 Z" :fill="c[1]" />
      <path d="M150,105 L171,128 L159,143 L150,124 Z" :fill="c[2]" />
      <!-- chest embroidery panel -->
      <rect x="135" y="127" width="30" height="34" :fill="c[2]" />
      <polygon points="150,132 160,144 150,156 140,144" fill="#ffffff" />
      <polygon points="150,138 155,144 150,150 145,144" :fill="c[0]" />
      <!-- sash -->
      <rect x="105" y="184" width="90" height="15" :fill="c[1]" />
      <rect x="105" y="189" width="90" height="4" fill="#ffffff" opacity="0.7" />
      <!-- coins under sash -->
      <circle
        v-for="m in 8"
        :key="`sc${m}`"
        :cx="107 + m * 10.5"
        cy="204"
        r="3"
        fill="#d8dce1"
        stroke="#9aa3ad"
        stroke-width="0.8"
      />
      <!-- apron -->
      <rect x="119" y="199" width="62" height="140" :fill="c[2]" />
      <rect x="119" y="199" width="62" height="140" fill="none" :stroke="c[0]" stroke-width="5" />
      <rect
        v-for="s in 3"
        :key="`ap${s}`"
        x="126"
        :y="182 + s * 38"
        width="48"
        height="7"
        :fill="s % 2 === 0 ? '#ffffff' : c[1]"
      />
      <g v-for="d in 3" :key="`dm${d}`">
        <polygon
          :points="`150,${192 + d * 38 - 9} 159,${192 + d * 38} 150,${192 + d * 38 + 9} 141,${192 + d * 38}`"
          fill="#ffffff"
        />
        <polygon
          :points="`150,${192 + d * 38 - 4} 154,${192 + d * 38} 150,${192 + d * 38 + 4} 146,${192 + d * 38}`"
          :fill="c[0]"
        />
      </g>
      <!-- coin columns on apron edges -->
      <g v-for="j in 9" :key="`ac${j}`">
        <circle
          :cy="200 + j * 14"
          cx="116"
          r="3"
          fill="#d8dce1"
          stroke="#9aa3ad"
          stroke-width="0.8"
        />
        <circle
          :cy="200 + j * 14"
          cx="184"
          r="3"
          fill="#d8dce1"
          stroke="#9aa3ad"
          stroke-width="0.8"
        />
      </g>
      <!-- apron fringe -->
      <line
        v-for="f in 13"
        :key="`fr${f}`"
        :x1="118 + f * 4.8"
        y1="339"
        :x2="118 + f * 4.8"
        y2="352"
        :stroke="f % 3 === 0 ? c[1] : '#e8e2d8'"
        stroke-width="2"
      />
    </g>

    <!-- ============ hat ============ -->
    <g v-else-if="kind === 'hat'">
      <circle cx="150" cy="132" r="15" :fill="c[1]" />
      <circle cx="150" cy="132" r="7" :fill="c[0]" />
      <path d="M80,225 A70 70 0 0 1 220,225 Z" fill="#1b1b1b" />
      <rect x="83" y="212" width="134" height="17" fill="#ffffff" />
      <rect
        v-for="i in 11"
        :key="`b${i}`"
        :x="83 + i * 12 - 9"
        y="212"
        width="5"
        height="17"
        fill="#1b1b1b"
      />
      <ellipse cx="150" cy="234" rx="72" ry="12" fill="#101010" />
      <g v-for="s in 5" :key="`hs${s}`">
        <line
          :x1="100 + s * 18"
          y1="243"
          :x2="100 + s * 18"
          y2="292"
          stroke="#9aa3ad"
          stroke-width="1.5"
        />
        <circle :cx="100 + s * 18" :cy="270" r="3" :fill="c[s % 3]!" />
        <circle
          :cx="100 + s * 18"
          cy="297"
          r="5"
          fill="#d8dce1"
          stroke="#9aa3ad"
          stroke-width="1"
        />
      </g>
    </g>

    <!-- ============ belt ============ -->
    <g v-else-if="kind === 'belt'">
      <rect x="45" y="172" width="210" height="38" rx="7" fill="#181818" />
      <rect x="45" y="180" width="210" height="9" :fill="c[1]" />
      <rect x="45" y="194" width="210" height="6" :fill="c[2]" />
      <rect
        x="130"
        y="164"
        width="40"
        height="54"
        rx="5"
        fill="#d8dce1"
        stroke="#9aa3ad"
        stroke-width="2"
      />
      <rect x="139" y="174" width="22" height="34" rx="3" fill="#181818" />
      <polygon points="150,182 156,191 150,200 144,191" :fill="c[0]" />
      <g v-for="k in 13" :key="`bc${k}`">
        <line
          :x1="43 + k * 15.5"
          y1="210"
          :x2="43 + k * 15.5"
          y2="230"
          stroke="#9aa3ad"
          stroke-width="1.2"
        />
        <circle
          :cx="43 + k * 15.5"
          cy="235"
          r="4.5"
          fill="#d8dce1"
          stroke="#9aa3ad"
          stroke-width="1"
        />
      </g>
    </g>

    <!-- ============ scarf ============ -->
    <g v-else>
      <path
        d="M72,84 Q150,146 228,84 L228,116 Q150,180 72,116 Z"
        :fill="c[2]"
      />
      <rect x="84" y="104" width="36" height="212" rx="4" :fill="c[2]" />
      <rect x="180" y="104" width="36" height="212" rx="4" :fill="c[2]" />
      <g v-for="(y, i) in [268, 282, 296]" :key="`se${i}`">
        <rect x="84" :y="y" width="36" height="9" :fill="i === 1 ? '#ffffff' : c[i === 0 ? 0 : 1]" />
        <rect x="180" :y="y" width="36" height="9" :fill="i === 1 ? '#ffffff' : c[i === 0 ? 0 : 1]" />
      </g>
      <g v-for="f in 6" :key="`sf${f}`">
        <line
          :x1="82 + f * 6"
          y1="316"
          :x2="82 + f * 6"
          y2="334"
          :stroke="f % 2 === 0 ? c[1] : '#d9d2c6'"
          stroke-width="2"
        />
        <line
          :x1="178 + f * 6"
          y1="316"
          :x2="178 + f * 6"
          y2="334"
          :stroke="f % 2 === 0 ? c[1] : '#d9d2c6'"
          stroke-width="2"
        />
      </g>
      <polygon points="150,120 162,134 150,148 138,134" fill="#ffffff" />
      <polygon points="150,127 156,134 150,141 144,134" :fill="c[0]" />
    </g>
  </svg>
</template>
