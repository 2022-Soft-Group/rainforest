import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const userID = ref(localStorage.getItem('userID') || '');
  const token = ref(localStorage.getItem('token') || '');
  const isLogin = computed(() => {
    return token.value !== '';
  });

  function signIn(userToken: string, id: number) {
    token.value = userToken;
    userID.value = id.toString();
  }
  function signOut() {
    token.value = '';
    userID.value = '0';
  }

  return { token, userID, isLogin, signIn, signOut };
});
