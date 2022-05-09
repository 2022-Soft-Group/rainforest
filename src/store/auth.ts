import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || '');
  const avatar = ref('');
  const ID = ref(-1);
  const isLogin = computed(() => {
    return token.value !== '';
  });

  function signIn(userToken: string, userID: number, userAvatar: string) {
    token.value = userToken;
    avatar.value = userAvatar;
    ID.value = userID;
  }
  function signOut() {
    token.value = '';
    avatar.value = '';
    ID.value = 0;
  }

  return { token, avatar, ID, isLogin, signIn, signOut };
});
