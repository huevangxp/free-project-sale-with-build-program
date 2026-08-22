import { defineStore } from "pinia";

// Demo auth: accounts live in the browser (localStorage) and the session in
// a cookie so SSR pages know the login state. Swap these functions for real
// API calls when a backend is connected.

export interface AuthUser {
  name: string;
  phone: string;
  address: string;
}

interface StoredUser extends AuthUser {
  password: string;
}

const USERS_KEY = "shop_users";

function loadUsers(): StoredUser[] {
  if (!import.meta.client) return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export const useAuthStore = defineStore("auth", () => {
  const userCookie = useCookie<AuthUser | null>("shop_user", {
    maxAge: 60 * 60 * 24 * 30,
    default: () => null,
  });

  const user = computed(() => userCookie.value);
  const isLoggedIn = computed(() => !!userCookie.value);

  function register(
    name: string,
    phone: string,
    password: string,
  ): string | null {
    if (!name.trim() || !phone.trim() || !password) {
      return "fillAll";
    }
    if (password.length < 4) {
      return "shortPassword";
    }
    const users = loadUsers();
    if (users.some((u) => u.phone === phone)) {
      return "phoneExists";
    }
    users.push({ name: name.trim(), phone: phone.trim(), password, address: "" });
    saveUsers(users);
    userCookie.value = { name: name.trim(), phone: phone.trim(), address: "" };
    return null;
  }

  function login(phone: string, password: string): string | null {
    const found = loadUsers().find(
      (u) => u.phone === phone.trim() && u.password === password,
    );
    if (!found) {
      return "invalid";
    }
    userCookie.value = {
      name: found.name,
      phone: found.phone,
      address: found.address,
    };
    return null;
  }

  function updateProfile(data: Partial<Pick<AuthUser, "name" | "address">>) {
    const current = userCookie.value;
    if (!current) return;
    const users = loadUsers();
    const idx = users.findIndex((u) => u.phone === current.phone);
    if (idx >= 0) {
      users[idx] = { ...users[idx]!, ...data };
      saveUsers(users);
    }
    userCookie.value = { ...current, ...data };
  }

  function logout() {
    userCookie.value = null;
  }

  return { user, isLoggedIn, register, login, updateProfile, logout };
});
