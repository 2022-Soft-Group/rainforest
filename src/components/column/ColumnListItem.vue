<template>
  .<router-link
    class="ColumnHomeColumnCard ColumnHomeRecommendation-card"
    tag="a"
    target="_blank"
    :to="'/columns/' + columnInfo.id"
  >
    <n-avatar :src="columnInfo.img" round></n-avatar>
    <div class="ColumnHomeColumnCard-info">
      <div class="ColumnHomeColumnCard-title">{{ columnInfo.title }}</div>
      <div class="ColumnHomeColumnCard-description">{{ columnInfo.description }}</div>
    </div>
    <div class="ColumnHomeColumnCard-meta">
      {{ columnInfo.followerNum }} 人关注 | {{ columnInfo.articleNum }} 篇文章
    </div>
    <n-button class="Button ColumnHomeColumnCard-followButton Button--green" type="primary">进入专栏</n-button>
  </router-link>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router';
const route = useRouter();
const props = defineProps<{ columnInfo: ColumnListItem }>();
</script>

<style scoped>
.ColumnHomeRecommendation-card {
  margin: 0 8px 16px;
}
.ColumnHomeColumnCard {
  border-radius: 10px;

  box-sizing: border-box;

  display: flex;
  background: #18181c;
  flex-direction: column;
  padding: 26px 0 23px;
  width: 206px;
}
.ColumnHomeColumnCard {
  align-items: center;
}
a {
  color: inherit;
  text-decoration: none;
}
.ColumnHomeColumnCard-info {
  align-items: center;
  height: 100px;
  display: flex;

  flex-direction: column;

  flex-grow: 1;
  padding: 0 16px;
}
.ColumnHomeColumnCard-title {
  margin-top: 16px;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-weight: 600;
  font-synthesis: style;
  font-size: large;
  color: #fff;
}
.ColumnHomeColumnCard-description {
  font-size: 14px;
  line-height: 21px;
  margin-top: 7px;
  text-align: center;
  word-break: break-all;
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  color: #fff;
}
.ColumnHomeColumnCard-meta {
  font-size: 14px;
  margin-top: 14px;
}
.ColumnHomeColumnCard-meta {
  color: grey;
}
.ColumnHomeColumnCard-followButton {
  margin-top: 15px;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}
.Button--green {
  background-color: rgba(133, 144, 166, 0.06);
  color: #63e2b7;
  border-color: #63e2b7;
}
.Button--green:hover {
  color: black;
}
.Button {
  display: inline-block;
  padding: 0 16px;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  background: none;

  border-radius: 3px;
}

.Button:focus {
  outline: none;
  -webkit-transition: -webkit-box-shadow 0.3s;
  transition: -webkit-box-shadow 0.3s;
  transition: box-shadow 0.3s;
  transition: box-shadow 0.3s, -webkit-box-shadow 0.3s;
}

.Avatar {
  background: #fff;
}
</style>
