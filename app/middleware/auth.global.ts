import { storeToRefs } from "pinia";
import { useApiAuthStore } from "~/stores/apiAuth";

export default defineNuxtRouteMiddleware((to) => {
  const { authenticated } = storeToRefs(useApiAuthStore());
  const token = useCookie("token");

  // Update authentication state based on token presence
  if (token.value) {
    authenticated.value = true;
  } else {
    authenticated.value = false;
  }

  // Define public routes that don't require authentication
  const publicRoutes = [
    "login",
    "home",
    "index",
    "product",
    "promotion",
    "team",
    "register",
  ];

  // Define routes that ONLY authenticated users can access
  const authOnlyRoutes = ["profile", "order", "cart", "checkout", "chat"];

  // If user is authenticated and trying to access login or register page, redirect to profile
  if (token.value && (to?.name === "login" || to?.name === "register")) {
    return navigateTo("/profile");
  }

  // If user is authenticated, allow access to all pages
  if (token.value) {
    return; // Allow navigation to any page
  }

  // If user is not authenticated and trying to access auth-only routes
  if (!token.value && authOnlyRoutes.includes(to?.name as string)) {
    abortNavigation();
    return navigateTo("/login");
  }

  // Allow access to public routes for non-authenticated users
  if (publicRoutes.includes(to?.name as string)) {
    return; // Allow navigation
  }

  // For any other routes not defined, redirect non-authenticated users to login
  if (!token.value) {
    abortNavigation();
    return navigateTo("/login");
  }
});
