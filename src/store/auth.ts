import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const userID = ref(localStorage.getItem('userID') || '');
  const token = ref(localStorage.getItem('token') || '');
  const avatar = ref(localStorage.getItem('avatar') || '');
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
    token.value = '';
    avatar.value = '';
    userID.value = '';
  }

  return { userID, token, avatar, isLogin, signIn, signOut };
});
