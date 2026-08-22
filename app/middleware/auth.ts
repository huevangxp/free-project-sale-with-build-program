export default defineNuxtRouteMiddleware((to) => {
  const user = useCookie("shop_user");
  if (!user.value) {
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
  }
});
