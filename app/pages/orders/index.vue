<script setup lang="ts">
import { PackageSearch, CircleCheck } from "lucide-vue-next";
import { useAuthStore } from "~/stores/auth";
import { useOrdersStore } from "~/stores/orders";

definePageMeta({ middleware: "auth" });

const auth = useAuthStore();
const ordersStore = useOrdersStore();
const route = useRoute();
const { formatNumber, formatDate } = useFormat();
const { productName, sizeLabel } = useProducts();

const myOrders = computed(() =>
  auth.user ? ordersStore.byPhone(auth.user.phone) : [],
);

const newOrderId = computed(() => route.query.new as string | undefined);

function statusClass(status: string) {
  if (status === "delivered") return "bg-green-100 text-green-700";
  if (status === "shipping") return "bg-amber-100 text-amber-700";
  return "bg-primary-100 text-primary-700";
}
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-8">
    <h1 class="text-2xl font-bold text-gray-800 sm:text-3xl">
      {{ $t("orders.title") }}
    </h1>

    <div
      v-if="newOrderId"
      class="mt-4 flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 text-green-700 ring-1 ring-green-200"
    >
      <CircleCheck class="h-5 w-5 shrink-0" />
      <p class="text-sm font-medium">
        {{ $t("orders.success", { id: newOrderId }) }}
      </p>
    </div>

    <ClientOnly>
      <div
        v-if="myOrders.length === 0"
        class="mt-6 rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-gray-100"
      >
        <PackageSearch class="mx-auto h-14 w-14 text-primary-300" />
        <p class="mt-3 text-gray-500">{{ $t("orders.empty") }}</p>
        <NuxtLink
          to="/products"
          class="mt-4 inline-block rounded-lg bg-primary-600 px-6 py-3 font-bold text-white transition hover:bg-primary-700"
        >
          {{ $t("cart.shop") }}
        </NuxtLink>
      </div>

      <ul v-else class="mt-6 space-y-4">
        <li
          v-for="order in myOrders"
          :key="order.id"
          class="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100 sm:p-5"
        >
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p class="font-bold text-gray-800">{{ order.id }}</p>
              <p class="text-xs text-gray-400">
                {{
                  formatDate(order.date, "en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                }}
              </p>
            </div>
            <span
              class="rounded-full px-3 py-1 text-xs font-bold"
              :class="statusClass(order.status)"
            >
              {{ $t(`orders.status.${order.status}`) }}
            </span>
          </div>

          <ul class="mt-3 divide-y divide-gray-50">
            <li
              v-for="item in order.items"
              :key="`${item.id}-${item.size}`"
              class="flex items-center gap-3 py-2"
            >
              <div class="h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                <ProductImage
                  :colors="item.colors"
                  :seed="item.id"
                  :kind="item.kind"
                  :image="item.image"
                  :alt="productName(item.id, item.name)"
                />
              </div>
              <div class="min-w-0 flex-1">
                <p class="line-clamp-1 text-sm font-medium text-gray-800">
                  {{ productName(item.id, item.name) }}
                </p>
                <p class="text-xs text-gray-400">
                  {{ sizeLabel(item.size) }} × {{ item.qty }}
                </p>
              </div>
              <p class="text-sm font-semibold text-gray-700">
                {{ formatNumber(item.price * item.qty) }} ₭
              </p>
            </li>
          </ul>

          <div
            class="mt-2 flex items-center justify-between border-t border-gray-100 pt-3"
          >
            <p class="text-xs text-gray-400">
              {{ $t(`checkout.${order.payment}`) }}
            </p>
            <p class="font-bold text-primary-700">
              {{ $t("orders.total") }} {{ formatNumber(order.total) }} ₭
            </p>
          </div>
        </li>
      </ul>

      <template #fallback>
        <p class="mt-6 text-center text-sm text-gray-400">
          {{ $t("orders.loading") }}
        </p>
      </template>
    </ClientOnly>
  </div>
</template>
