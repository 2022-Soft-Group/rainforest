import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '');
  const admin = ref(localStorage.getItem('isAdmin') || '');
  const isLogin = computed(() => {
    return token.value !== '';
  });
  const isAdmin = computed(() => {
    return admin.value == 'true';
  });
  function signIn(userToken: string, ID: number, userAvatar: string, admin: boolean) {
    localStorage.setItem('token', userToken);
    localStorage.setItem('userID', ID.toString());
    localStorage.setItem('avatar', userAvatar);
    localStorage.setItem('isAdmin', admin ? 'true' : 'false');
  }
  function signOut() {
    localStorage.clear();
  }

  return { isLogin, isAdmin, signIn, signOut };
});
