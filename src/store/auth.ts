import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const userID = ref(localStorage.getItem('userID') || '');
  const token = ref(localStorage.getItem('token') || '');
  const avatar = ref(localStorage.getItem('avatar') || '');
  const isLogin = computed(() => {
    return token.value !== '';
  });

  function signIn(userToken: string, ID: number, userAvatar: string) {
    localStorage.setItem('token', userToken);
    localStorage.setItem('userID', ID.toString());
    localStorage.setItem('avatar', userAvatar);
  }
  function signOut() {
    localStorage.clear();
    token.value = '';
    avatar.value = '';
    userID.value = '';
  }

  return { userID, token, avatar, isLogin, signIn, signOut };
});
