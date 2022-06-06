import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const token = computed(() => localStorage.getItem('token'));
  const isLogin = computed(() => {
    return token.value !== '';
  });
  const isAdmin = ref(false);

  function signIn(userToken: string, ID: number, userAvatar: string, admin: boolean) {
    localStorage.setItem('token', userToken);
    localStorage.setItem('userID', ID.toString());
    localStorage.setItem('avatar', userAvatar);
    isAdmin.value = admin;
  }
  function signOut() {
    localStorage.clear();
  }

  return { isLogin, signIn, signOut };
});
