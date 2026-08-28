<script setup lang="ts">
const { t, locale } = useI18n();
useHead(() => ({ title: t("nav.craft") }));

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

const { byId, productName } = useProducts();
const { formatNumber } = useFormat();

/* One piece per craft: a dress, a hat, a silver belt, a scarf. */
const showPieces = [1, 5, 6, 7]
  .map((id) => byId(id))
  .filter((p): p is NonNullable<typeof p> => !!p);
const showRates = [-0.12, 0.1, -0.07, 0.13];

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

async function mountEngine() {
  // @ts-ignore -- plain-JS engine, no type declarations
  await import("~/assets/js/scrollcraft-engine.js");
  if (!pageEl.value) return;
  api = (window as any).ScrollCraft.mount(pageEl.value);
}

onMounted(mountEngine);

/* Kinetic headlines are split into spans the engine owns, so a locale switch
   must rebuild the DOM (:key below) and remount on the fresh elements. */
watch(locale, async () => {
  neutralize();
  await nextTick();
  mountEngine();
});

onUnmounted(neutralize);
</script>

<template>
  <div ref="pageEl" :key="locale" class="sc-page -mb-16">
    <div class="sc-grain" aria-hidden="true"></div>

    <!-- Act 1 · Arrival. Pinned hero, copy present from the first pixel. -->
    <section data-sc-act="pin" data-sc-span="1.7" data-sc-drift="#081512">
      <div class="sc-stage hero-stage" data-sc-spotlight>
        <span class="hero-ghost" data-sc-parallax="-0.4" aria-hidden="true"
          >ມ</span
        >
        <div class="sc-wrap hero-inner">
          <p class="sc-label" data-sc-cue="0 1 0 0.18">
            {{ $t("nav.craft") }}
          </p>
          <h1 class="sc-display sc-display--xl" data-sc-cue="0 1 0 0.16">
            {{ $t("craft.title") }}
          </h1>
          <p class="sc-lede" data-sc-cue="0 1 0 0.14" data-sc-parallax="-0.1">
            {{ $t("craft.subtitle") }}
          </p>
        </div>
        <!-- Signature move: a running stitch sews itself across the page
             under the reader's scroll, driven by the act's --sc-p. -->
        <div
          class="stitch stitch--hero"
          data-sc-reveal="left"
          data-sc-reveal-at="0.06 0.65"
          aria-hidden="true"
        >
          <svg viewBox="0 0 1200 48" preserveAspectRatio="none">
            <path
              class="stitch-path"
              d="M0 30 C 100 14, 200 14, 300 30 S 500 46, 600 30 S 800 14, 900 30 S 1100 46, 1200 30"
            />
          </svg>
        </div>
      </div>
    </section>

    <!-- Act 2 · The peak. The five stages travel laterally on a pan rail
         while the headline assembles word by word. Ground drifts to indigo,
         the colour of Hmong batik dye. -->
    <section data-sc-act="pan" data-sc-span="4.4" data-sc-drift="#0d1424">
      <div class="sc-stage process-stage">
        <header class="sc-wrap process-head">
          <h2
            class="sc-display sc-display--md"
            data-sc-cue="0 1 0.08 0"
            data-sc-kinetic="words"
          >
            {{ $t("craft.processTitle") }}
          </h2>
          <p class="sc-body process-sub" data-sc-cue="0 1 0.14 0">
            {{ $t("craft.processSub") }}
          </p>
        </header>

        <div class="process-rail" data-sc-pan="0.06">
          <article v-for="(step, i) in steps" :key="step.title" class="step">
            <span class="step-num" aria-hidden="true">{{
              String(i + 1).padStart(2, "0")
            }}</span>
            <h3 class="step-title">{{ $t(step.title) }}</h3>
            <p class="sc-body step-text">{{ $t(step.text) }}</p>
          </article>
        </div>

        <div
          class="stitch stitch--process"
          data-sc-reveal="left"
          data-sc-reveal-at="0.05 0.95"
          aria-hidden="true"
        >
          <svg viewBox="0 0 1200 48" preserveAspectRatio="none">
            <path
              class="stitch-path"
              d="M0 24 C 150 8, 250 40, 400 24 S 650 8, 800 24 S 1050 40, 1200 24"
            />
          </svg>
        </div>
      </div>
    </section>

    <!-- Act 3 · Trust. Numbers bloom as they arrive. -->
    <section class="sc-section" data-sc-act="flow" data-sc-drift="#081512">
      <div class="sc-wrap">
        <p class="sc-label" data-sc-in>{{ $t("craft.statsTitle") }}</p>
        <div class="stats-grid" data-sc-in data-sc-stagger="90">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="stat"
            data-sc-tilt="5"
          >
            <p class="stat-value">
              <span :data-sc-count="`0 ${stat.value}`">0</span
              ><span class="stat-plus">+</span>
            </p>
            <p class="sc-body stat-label">{{ $t(stat.label) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Act 4 · The cloth. Real pieces from the shop wipe in across an
         offset editorial grid, each floating at its own parallax depth. -->
    <section
      class="sc-section showcase"
      data-sc-act="flow"
      data-sc-drift="#0a1a17"
    >
      <div class="sc-wrap">
        <div class="show-head" data-sc-in>
          <p class="sc-label">{{ $t("craft.showTitle") }}</p>
          <p class="sc-body show-sub">{{ $t("craft.showSub") }}</p>
        </div>

        <div class="show-grid">
          <NuxtLink
            v-for="(p, i) in showPieces"
            :key="p.id"
            :to="`/products/${p.id}`"
            class="show-card"
            :data-sc-reveal="i % 2 ? 'right' : 'left'"
            :data-sc-reveal-at="`${0.06 + i * 0.06} ${0.3 + i * 0.06}`"
            :data-sc-parallax="showRates[i]"
          >
            <span class="show-frame">
              <ProductImage
                :colors="p.colors"
                :kind="p.kind"
                :seed="p.id"
                :image="p.image"
                :alt="productName(p.id, p.name)"
              />
            </span>
            <span class="show-meta">
              <span class="show-name">{{ productName(p.id, p.name) }}</span>
              <span class="show-price sc-nums"
                >{{ formatNumber(p.price) }} ₭</span
              >
            </span>
          </NuxtLink>
        </div>

        <p class="show-more" data-sc-in>
          <NuxtLink to="/products" class="show-link">{{
            $t("craft.showAll")
          }}</NuxtLink>
        </p>
      </div>
    </section>

    <!-- Act 5 · The voice. A pinned quote assembling word by word while the
         ground warms to plum. Centre anchor, the only one on the page. -->
    <section data-sc-act="pin" data-sc-span="2" data-sc-drift="#1a0e15">
      <div class="sc-stage quote-stage">
        <figure class="sc-wrap quote-inner">
          <blockquote
            class="sc-display sc-display--lg quote-text"
            data-sc-cue="0.06 0.94 0.3 0.2"
            data-sc-kinetic="words"
          >
            {{ $t("craft.quote") }}
          </blockquote>
          <figcaption class="sc-label quote-by" data-sc-cue="0.3 0.94 0.3 0.2">
            {{ $t("craft.quoteBy") }}
          </figcaption>
        </figure>
      </div>
    </section>

    <!-- Act 6 · Resolve. The close holds; it does not fade away. -->
    <section class="sc-section close" data-sc-act="flow" data-sc-drift="#081512">
      <div class="sc-wrap close-inner" data-sc-in data-sc-stagger="110">
        <hr class="sc-rule" />
        <h2 class="sc-display sc-display--md close-title">
          {{ $t("craft.ctaTitle") }}
        </h2>
        <p class="sc-body">{{ $t("craft.ctaText") }}</p>
        <NuxtLink to="/products" class="close-btn" data-sc-magnet="0.25">
          {{ $t("craft.ctaBtn") }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style>
@import "~/assets/css/scrollcraft.css";

/* ---- page composition (our markup, not the engine's) ------------------- */

/* Hero */
.hero-stage {
  display: flex;
  align-items: center;
}
.hero-inner {
  padding-top: 4rem; /* clearance for the site's sticky header */
}
.hero-inner .sc-label {
  color: var(--sc-accent);
  margin-bottom: var(--sc-5);
}
.hero-inner .sc-lede {
  margin-top: var(--sc-6);
  color: var(--sc-ink-soft);
}
.hero-ghost {
  position: absolute;
  right: -0.08em;
  top: 50%;
  translate: 0 -50%;
  font-family: var(--sc-font-display);
  font-size: clamp(18rem, 42vw, 38rem);
  line-height: 1;
  font-weight: 600;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in oklab, var(--sc-ink) 14%, transparent);
  user-select: none;
  pointer-events: none;
}

/* Signature stitch */
.stitch {
  position: absolute;
  inset-inline: 0;
  pointer-events: none;
}
.stitch svg {
  width: 100%;
  height: 48px;
}
.stitch-path {
  fill: none;
  stroke: var(--sc-accent);
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 16 13;
  /* the dashes run along the seam as the act progresses */
  stroke-dashoffset: calc(var(--sc-p, 0) * -180px);
}
.stitch--hero {
  bottom: clamp(3rem, 10vh, 6rem);
}
.stitch--process {
  bottom: clamp(2rem, 7vh, 4.5rem);
  opacity: 0.85;
}

/* Process rail */
.process-stage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(2rem, 5vh, 4rem);
  padding-top: 4rem;
}
.process-head .sc-body {
  margin-top: var(--sc-4);
}
.process-rail {
  gap: clamp(1.5rem, 3vw, 3rem);
  padding-inline: var(--sc-gutter);
  align-items: stretch;
}
.step {
  flex: 0 0 auto;
  width: clamp(17rem, 34vw, 26rem);
  padding: var(--sc-6);
  background: var(--sc-surface);
  border: 1px solid var(--sc-hairline);
  border-radius: var(--sc-r-lg);
  box-shadow: var(--sc-e2), var(--sc-edge);
}
.step-num {
  display: block;
  font-family: var(--sc-font-display);
  font-size: var(--sc-t-3xl);
  line-height: 1;
  font-weight: 600;
  color: transparent;
  -webkit-text-stroke: 1.5px
    color-mix(in oklab, var(--sc-accent) 75%, transparent);
}
.step-title {
  font-family: var(--sc-font-display);
  font-size: var(--sc-t-lg);
  letter-spacing: var(--sc-track-snug);
  line-height: var(--sc-leading-tight);
  margin: var(--sc-5) 0 0;
}
.step-text {
  margin-top: var(--sc-3);
  font-size: var(--sc-t-sm);
}

/* Stats */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(1rem, 2.5vw, 2rem);
  margin-top: var(--sc-6);
}
.stat {
  padding: var(--sc-6) var(--sc-5);
  border-top: 1px solid var(--sc-hairline-strong);
}
.stat-value {
  font-family: var(--sc-font-display);
  font-size: var(--sc-t-2xl);
  line-height: 1;
  font-weight: 600;
  margin: 0;
}
.stat-plus {
  color: var(--sc-accent);
}
.stat-label {
  margin-top: var(--sc-3);
  font-size: var(--sc-t-sm);
}

/* Quote */
.quote-stage {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 4rem;
}
.quote-inner {
  margin: 0;
}
.quote-text {
  max-width: 24ch;
  margin-inline: auto;
}
.quote-by {
  display: block;
  margin-top: var(--sc-6);
}

/* Close */
.close-inner > .sc-display {
  margin-top: var(--sc-7);
}
.close-inner > .sc-body {
  margin-top: var(--sc-4);
}
.close-btn {
  display: inline-block;
  margin-top: var(--sc-7);
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
.close-btn:hover {
  box-shadow: var(--sc-e3);
}

/* ---- mobile ------------------------------------------------------------- */
@media (max-width: 860px) {
  .hero-ghost {
    font-size: 16rem;
    opacity: 0.7;
  }
  .step {
    width: min(78vw, 20rem);
    padding: var(--sc-5);
  }
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
