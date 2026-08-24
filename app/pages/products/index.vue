<script setup lang="ts">
const { categories, byCategory } = useProducts();
const { t } = useI18n();
useHead(() => ({ title: t("nav.products") }));
const route = useRoute();
const router = useRouter();

const activeCategory = computed(() => {
  const cat = route.query.cat as string | undefined;
  return cat && (categories as readonly string[]).includes(cat) ? cat : "all";
});

const products = computed(() => byCategory(activeCategory.value));

function selectCategory(category: string) {
  router.push({
    path: "/products",
    query: category === "all" ? {} : { cat: category },
  });
}
</script>

<template>
  <div class="mx-auto max-w-6xl px-4 py-8">
    <h1 class="text-2xl font-bold text-gray-800 sm:text-3xl">
      {{ $t("product.allTitle") }}
    </h1>

    <div class="mt-4 flex flex-wrap gap-2">
      <button
        v-for="category in categories"
        :key="category"
        class="rounded-full px-4 py-2 text-sm font-medium transition"
        :class="
          category === activeCategory
            ? 'bg-primary-700 text-white'
            : 'bg-white text-primary-700 ring-1 ring-primary-200 hover:bg-primary-100'
        "
        @click="selectCategory(category)"
      >
        {{ $t(`categories.${category}`) }}
      </button>
    </div>

    <p class="mt-4 text-sm text-gray-500">
      {{ $t("product.found", { count: products.length }) }}
    </p>

    <div
      class="mt-4 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4"
    >
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
