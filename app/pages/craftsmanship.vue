<script setup lang="ts">
const { t } = useI18n();
useHead(() => ({ title: t("nav.craft") }));

const { byId, productName } = useProducts();
const { formatNumber } = useFormat();

const stats = [
  { value: 30, label: "craft.s1" },
  { value: 45, label: "craft.s2" },
  { value: 60, label: "craft.s3" },
  { value: 4800, label: "craft.s4" },
];

const steps = [
  { title: "craft.p1t", text: "craft.p1x" },
  { title: "craft.p2t", text: "craft.p2x" },
  { title: "craft.p3t", text: "craft.p3x" },
  { title: "craft.p4t", text: "craft.p4x" },
  { title: "craft.p5t", text: "craft.p5x" },
];

/* Copy windows as fractions of the whole 9.7vh track (leg boundaries fall at
   0 · .155 · .309 · .515 · .670 · .856 · 1), and which side each block sits. */
const stepWins = [
  "0.075 0.16",
  "0.18 0.30",
  "0.32 0.43",
  "0.53 0.60",
  "0.60 0.665",
];
const stepSide = ["trail", "lead", "trail", "lead", "trail"];

/* One piece per craft: a dress, a hat, a silver belt, a scarf. */
const showPieces = [1, 5, 6, 7]
  .map((id) => byId(id))
  .filter((p): p is NonNullable<typeof p> => !!p);

const SEGMENTS = 6;
const current = ref(0);
function onWaypoint(e: Event) {
  current.value = (e as CustomEvent).detail.index;
}

const pageEl = ref<HTMLElement | null>(null);

/* The engine has no unmount API by design (it drives one standalone page for
   life). Inside an SPA we neutralize a stale instance by emptying the arrays
   its rAF/scroll closures iterate, so leftover listeners become no-ops. */
let api: { acts: unknown[]; worlds: unknown[]; clips: unknown[] } | null = null;

function neutralize() {
  if (!api) return;
  api.acts.length = 0;
  api.worlds.length = 0;
  api.clips.length = 0;
  const SC = (window as any).ScrollCraft;
  const i = SC?.instances?.indexOf(api);
  if (i >= 0) SC.instances.splice(i, 1);
  api = null;
}

onMounted(async () => {
  // @ts-ignore -- plain-JS engine, no type declarations
  await import("~/assets/js/scrollcraft-engine.js");
  if (!pageEl.value) return;
  pageEl.value.addEventListener("sc:waypoint", onWaypoint);
  api = (window as any).ScrollCraft.mount(pageEl.value);
});

onUnmounted(() => {
  pageEl.value?.removeEventListener("sc:waypoint", onWaypoint);
  neutralize();
});
</script>

<template>
  <div ref="pageEl" class="sc-page -mb-16">
    <div class="sc-grain" aria-hidden="true"></div>

    <!-- One unbroken world. The whole page is a single fixed stage: you land
         on raw cloth, fly through the drawing, the embroidery and the sewing,
         arrive among the finished garments and come to rest at the workbench.
         No section boundaries anywhere. -->
    <div data-sc-mode="worldflight" data-sc-seam="0.14">
      <div data-sc-world>
        <div data-sc-segment data-sc-w="1.5" data-sc-waypoint="cloth">
          <div class="wf-scene wf-scene--cloth" data-sc-poster></div>
        </div>
        <div data-sc-segment data-sc-w="1.5" data-sc-waypoint="drawing">
          <div class="wf-scene wf-scene--draw" data-sc-poster></div>
        </div>
        <div
          data-sc-segment
          data-sc-w="2"
          data-sc-linger="0.3"
          data-sc-waypoint="embroidery"
        >
          <div class="wf-scene wf-scene--stitch" data-sc-poster></div>
        </div>
        <div data-sc-segment data-sc-w="1.5" data-sc-waypoint="assembly">
          <div class="wf-scene wf-scene--sew" data-sc-poster></div>
        </div>
        <div data-sc-segment data-sc-w="1.8" data-sc-waypoint="garments">
          <div class="wf-scene wf-scene--wear" data-sc-poster></div>
        </div>
        <div data-sc-segment data-sc-w="1.4" data-sc-waypoint="workbench">
          <div class="wf-scene wf-scene--bench" data-sc-poster></div>
        </div>
      </div>

      <div data-sc-world-copy>
        <!-- Landing: present from the first pixel. -->
        <div data-sc-copy data-sc-window="hero" class="wf-copy wf-copy--lead">
          <p class="sc-label wf-eyebrow">{{ $t("nav.craft") }}</p>
          <h1 class="sc-display sc-display--xl">{{ $t("craft.title") }}</h1>
          <p class="sc-lede wf-lede">{{ $t("craft.subtitle") }}</p>
        </div>

        <!-- The five stages of the craft, one per leg of the flight. -->
        <div
          v-for="(step, i) in steps"
          :key="step.title"
          data-sc-copy
          :data-sc-window="stepWins[i]"
          class="wf-copy wf-step"
          :class="`wf-copy--${stepSide[i]}`"
        >
          <span class="wf-step__num" aria-hidden="true">{{
            String(i + 1).padStart(2, "0")
          }}</span>
          <h2 class="sc-display sc-display--md">{{ $t(step.title) }}</h2>
          <p class="sc-body wf-step__text">{{ $t(step.text) }}</p>
        </div>

        <!-- The voice, deep inside the embroidery leg: the peak. -->
        <figure
          data-sc-copy
          data-sc-window="0.45 0.53"
          class="wf-copy wf-copy--center wf-quote"
        >
          <blockquote class="sc-display sc-display--lg wf-quote__text">
            {{ $t("craft.quote") }}
          </blockquote>
          <figcaption class="sc-label wf-quote__by">
            {{ $t("craft.quoteBy") }}
          </figcaption>
        </figure>

        <!-- The garments, floating among the alcoves. -->
        <div
          data-sc-copy
          data-sc-window="0.69 0.855"
          class="wf-copy wf-copy--band wf-show"
        >
          <p class="sc-label wf-eyebrow">{{ $t("craft.showTitle") }}</p>
          <div class="wf-show__grid">
            <NuxtLink
              v-for="p in showPieces"
              :key="p.id"
              :to="`/products/${p.id}`"
              class="wf-card"
            >
              <span class="wf-card__frame">
                <ProductImage
                  :colors="p.colors"
                  :kind="p.kind"
                  :seed="p.id"
                  :image="p.image"
                  :alt="productName(p.id, p.name)"
                />
              </span>
              <span class="wf-card__name">{{
                productName(p.id, p.name)
              }}</span>
              <span class="wf-card__price sc-nums"
                >{{ formatNumber(p.price) }} ₭</span
              >
            </NuxtLink>
          </div>
          <p class="wf-show__more">
            <NuxtLink to="/products" class="wf-link">{{
              $t("craft.showAll")
            }}</NuxtLink>
          </p>
        </div>

        <!-- Rest: the close resolves and holds on the workbench. -->
        <div
          data-sc-copy
          data-sc-window="finale"
          class="wf-copy wf-copy--center wf-close"
        >
          <div class="wf-close__stats">
            <span v-for="s in stats" :key="s.label" class="wf-stat">
              <span class="wf-stat__value sc-nums"
                >{{ s.value }}<span class="wf-stat__plus">+</span></span
              >
              <span class="wf-stat__label">{{ $t(s.label) }}</span>
            </span>
          </div>
          <h2 class="sc-display sc-display--md">{{ $t("craft.ctaTitle") }}</h2>
          <p class="sc-body wf-close__text">{{ $t("craft.ctaText") }}</p>
          <NuxtLink to="/products" class="wf-btn" data-sc-magnet="0.25">
            {{ $t("craft.ctaBtn") }}
          </NuxtLink>
        </div>
      </div>

      <div data-sc-spacer aria-hidden="true"></div>

      <!-- Signature move: the route is a stitch. A dashed seam down the right
           edge sews itself leg by leg as you fly, drawn by the page from the
           engine's published --sc-seg / --sc-segp. The engine draws none of it. -->
      <div class="wf-rail" aria-hidden="true">
        <span class="wf-rail__track"></span>
        <span class="wf-rail__fill"></span>
        <span
          v-for="i in SEGMENTS"
          :key="i"
          class="wf-rail__dot"
          :class="{ 'wf-rail__dot--on': current >= i - 1 }"
        ></span>
      </div>
    </div>
  </div>
</template>

<style>
@import "~/assets/css/scrollcraft.css";

/* The site footer scrolls up OVER the fixed world at the end of the flight. */
footer {
  position: relative;
  z-index: 40;
}

/* ---- the world's six scenes -------------------------------------------- */
.wf-scene {
  position: absolute;
  inset: 0;
}

/* 1 · raw cloth: a dark weave. */
.wf-scene--cloth {
  background:
    repeating-linear-gradient(
      90deg,
      transparent 0 21px,
      color-mix(in oklab, var(--sc-ink) 4%, transparent) 21px 24px
    ),
    repeating-linear-gradient(
      0deg,
      transparent 0 21px,
      color-mix(in oklab, var(--sc-ink) 3%, transparent) 21px 24px
    ),
    radial-gradient(120% 100% at 50% 0%, #0b1b17 0%, #081512 70%);
}

/* 2 · the drawing: indigo, spiral motifs chalked on. */
.wf-scene--draw {
  background-color: #0d1424;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='84' height='84'><path d='M42 42 m0 -18 a18 18 0 1 1 -18 18 a13 13 0 1 0 13 -13 a8 8 0 1 1 -8 8' fill='none' stroke='%238ea0d0' stroke-opacity='0.13' stroke-width='2'/></svg>");
  background-size: 84px 84px;
}
.wf-scene--draw::after {
  content: "";
  position: absolute;
  right: -12vw;
  top: 50%;
  translate: 0 -50%;
  width: 56vw;
  height: 56vw;
  border: 1.5px solid color-mix(in oklab, #8ea0d0 22%, transparent);
  border-radius: 50%;
}

/* 3 · the embroidery: plum ground, diamond paj ntaub grid. */
.wf-scene--stitch {
  background-color: #1a0e15;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48'><rect x='14' y='14' width='20' height='20' transform='rotate(45 24 24)' fill='none' stroke='%23ff5d78' stroke-opacity='0.11' stroke-width='1.6'/></svg>");
  background-size: 48px 48px;
}
.wf-scene--stitch::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 46vmin;
  height: 46vmin;
  translate: -50% -50%;
  rotate: 45deg;
  border: 2px dashed color-mix(in oklab, var(--sc-accent) 34%, transparent);
}

/* 4 · the sewing: pleats. */
.wf-scene--sew {
  background:
    repeating-linear-gradient(
      90deg,
      color-mix(in oklab, var(--sc-ink) 5%, transparent) 0 2px,
      transparent 2px 64px
    ),
    repeating-linear-gradient(
      90deg,
      transparent 0 32px,
      color-mix(in oklab, #000 30%, transparent) 32px 64px
    ),
    linear-gradient(180deg, #12231f 0%, #0e1e1a 100%);
}

/* 5 · the garments: studio alcoves. */
.wf-scene--wear {
  background-color: #0f221e;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='150'><path d='M22 150 V82 A38 38 0 0 1 98 82 V150' fill='none' stroke='%23f0eae1' stroke-opacity='0.08' stroke-width='3'/></svg>");
  background-size: 120px 150px;
  background-position: bottom center;
}

/* 6 · the workbench: back where we started, with the seam sewn. */
.wf-scene--bench {
  background: radial-gradient(120% 100% at 50% 100%, #0b1b17 0%, #081512 70%);
}
.wf-scene--bench::after {
  content: "";
  position: absolute;
  inset-inline: 0;
  top: 30%;
  height: 0;
  border-top: 3px dashed color-mix(in oklab, var(--sc-accent) 55%, transparent);
}

/* ---- copy blocks over the flight --------------------------------------- */
[data-sc-copy].wf-copy {
  position: absolute;
  max-width: min(44rem, 82vw);
}
.wf-copy--lead {
  left: var(--sc-gutter);
  bottom: clamp(3.5rem, 14vh, 9rem);
}
.wf-copy--trail {
  right: var(--sc-gutter);
  bottom: clamp(3.5rem, 14vh, 9rem);
  text-align: right;
}
.wf-copy--center {
  left: 50%;
  top: 50%;
  translate: -50% -50%;
  text-align: center;
}
.wf-copy--band {
  left: 50%;
  bottom: clamp(2.5rem, 9vh, 6rem);
  translate: -50% 0;
  width: min(72rem, calc(100vw - 2 * var(--sc-gutter)));
  max-width: none;
  text-align: center;
}

.wf-eyebrow {
  color: var(--sc-accent);
  margin-bottom: var(--sc-4);
}
.wf-lede {
  margin-top: var(--sc-5);
  color: var(--sc-ink-soft);
}

/* steps */
.wf-step__num {
  display: block;
  font-family: var(--sc-font-display);
  font-size: var(--sc-t-2xl);
  line-height: 1;
  font-weight: 600;
  color: transparent;
  -webkit-text-stroke: 1.5px
    color-mix(in oklab, var(--sc-accent) 75%, transparent);
  margin-bottom: var(--sc-4);
}
.wf-copy--trail .wf-step__num {
  margin-left: auto;
}
.wf-step__text {
  margin-top: var(--sc-4);
  max-width: 38ch;
}
.wf-copy--trail .wf-step__text {
  margin-left: auto;
}

/* quote */
.wf-quote {
  margin: 0;
}
.wf-quote__text {
  max-width: 24ch;
  margin-inline: auto;
}
.wf-quote__by {
  display: block;
  margin-top: var(--sc-5);
}

/* showcase */
.wf-show__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(1rem, 2.5vw, 2.25rem);
}
.wf-card {
  display: block;
  text-decoration: none;
}
.wf-card__frame {
  display: block;
  aspect-ratio: 3 / 4;
  overflow: clip;
  border-radius: 45% 45% var(--sc-r-md) var(--sc-r-md) / 30% 30%
    var(--sc-r-md) var(--sc-r-md);
  border: 1px solid var(--sc-hairline);
  box-shadow: var(--sc-e2);
  transition: box-shadow var(--sc-d-slow) var(--sc-ease-out);
}
.wf-card__frame > * {
  height: 100%;
  width: 100%;
  transition: scale var(--sc-d-slow) var(--sc-ease-out);
}
.wf-card:hover .wf-card__frame {
  box-shadow: var(--sc-e3);
}
.wf-card:hover .wf-card__frame > * {
  scale: 1.04;
}
.wf-card__name {
  display: block;
  margin-top: var(--sc-3);
  font-family: var(--sc-font-display);
  font-size: var(--sc-t-sm);
  letter-spacing: var(--sc-track-snug);
  color: var(--sc-ink);
}
.wf-card__price {
  display: block;
  margin-top: var(--sc-1);
  color: var(--sc-accent);
  font-size: var(--sc-t-xs);
}
.wf-show__more {
  margin: var(--sc-5) 0 0;
}
.wf-link {
  color: var(--sc-ink);
  font-family: var(--sc-font-display);
  font-weight: 600;
  text-decoration-color: var(--sc-accent);
  text-decoration-thickness: 2px;
  text-underline-offset: 0.3em;
  transition: color var(--sc-d-base) var(--sc-ease-out);
}
.wf-link:hover {
  color: var(--sc-accent);
}

/* close */
.wf-close__stats {
  display: flex;
  justify-content: center;
  gap: clamp(1.5rem, 4vw, 3.5rem);
  margin-bottom: var(--sc-7);
}
.wf-stat {
  display: grid;
  gap: var(--sc-1);
}
.wf-stat__value {
  font-family: var(--sc-font-display);
  font-size: var(--sc-t-xl);
  line-height: 1;
  font-weight: 600;
}
.wf-stat__plus {
  color: var(--sc-accent);
}
.wf-stat__label {
  color: var(--sc-ink-soft);
  font-size: var(--sc-t-xs);
}
.wf-close__text {
  margin: var(--sc-4) auto 0;
}
.wf-btn {
  display: inline-block;
  margin-top: var(--sc-6);
  padding: 0.9rem 2.4rem;
  background: var(--sc-accent);
  color: var(--sc-accent-ink);
  font-family: var(--sc-font-display);
  font-weight: 600;
  border-radius: var(--sc-r-pill);
  text-decoration: none;
  box-shadow: var(--sc-e2);
  transition: box-shadow var(--sc-d-base) var(--sc-ease-out);
}
.wf-btn:hover {
  box-shadow: var(--sc-e3);
}

/* ---- the stitched route rail ------------------------------------------- */
.wf-rail {
  position: fixed;
  right: clamp(0.9rem, 2.5vw, 2.2rem);
  top: 50%;
  translate: 0 -50%;
  height: 38vh;
  width: 14px;
  z-index: 30;
  pointer-events: none;
}
.wf-rail__track,
.wf-rail__fill {
  position: absolute;
  left: 50%;
  top: 0;
  width: 0;
  translate: -50% 0;
  border-left: 2px dashed;
}
.wf-rail__track {
  height: 100%;
  border-color: color-mix(in oklab, var(--sc-ink) 18%, transparent);
}
.wf-rail__fill {
  border-color: var(--sc-accent);
  height: calc((var(--sc-seg, 0) + var(--sc-segp, 0)) * 100% / 6);
}
.wf-rail__dot {
  position: absolute;
  left: 50%;
  translate: -50% -50%;
  width: 7px;
  height: 7px;
  rotate: 45deg;
  background: transparent;
  border: 1.5px solid color-mix(in oklab, var(--sc-ink) 30%, transparent);
  transition:
    background var(--sc-d-base) var(--sc-ease-out),
    border-color var(--sc-d-base) var(--sc-ease-out);
}
.wf-rail__dot--on {
  background: var(--sc-accent);
  border-color: var(--sc-accent);
}
.wf-rail__dot:nth-of-type(3) {
  top: calc(0.5 * 100% / 6);
}
.wf-rail__dot:nth-of-type(4) {
  top: calc(1.5 * 100% / 6);
}
.wf-rail__dot:nth-of-type(5) {
  top: calc(2.5 * 100% / 6);
}
.wf-rail__dot:nth-of-type(6) {
  top: calc(3.5 * 100% / 6);
}
.wf-rail__dot:nth-of-type(7) {
  top: calc(4.5 * 100% / 6);
}
.wf-rail__dot:nth-of-type(8) {
  top: calc(5.5 * 100% / 6);
}

/* ---- mobile ------------------------------------------------------------- */
@media (max-width: 860px) {
  [data-sc-copy].wf-copy {
    max-width: calc(100vw - 2 * var(--sc-gutter));
  }
  .wf-copy--trail {
    text-align: left;
    right: auto;
    left: var(--sc-gutter);
  }
  .wf-copy--trail .wf-step__num,
  .wf-copy--trail .wf-step__text {
    margin-left: 0;
  }
  .wf-show__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .wf-card__frame {
    aspect-ratio: 4 / 5;
  }
  .wf-close__stats {
    flex-wrap: wrap;
    gap: var(--sc-5) var(--sc-7);
  }
  .wf-rail {
    height: 30vh;
    right: 0.5rem;
  }
}
</style>
