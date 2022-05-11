<template>
  <a
    class="ColumnHomeColumnCard ColumnHomeRecommendation-card"
    target="_blank"
    href="https://zhuanlan.zhihu.com/c_1099983271789805568"
    rel="noopener noreferrer"
    ><img
      class="Avatar"
      width="50"
      height="48"
      src="https://pic1.zhimg.com/v2-6a4a46f73fd4d4124374fee1d3aafb92_xs.jpg?source=d16d100b"
      srcset="https://pic1.zhimg.com/v2-6a4a46f73fd4d4124374fee1d3aafb92_l.jpg?source=d16d100b 2x"
      alt="专栏图像"
    />
    <div class="ColumnHomeColumnCard-info">
      <div class="ColumnHomeColumnCard-title">儿童学画画</div>
      <div class="ColumnHomeColumnCard-description">画画牛逼，育儿也稳得一匹的 “戏精” 妈妈。</div>
    </div>
    <div class="ColumnHomeColumnCard-meta">2,158 人关注 | 248 篇文章</div>
    <button type="button" class="Button ColumnHomeColumnCard-followButton Button--green">进入专栏</button></a
  >
</template>

<script setup lang="ts"></script>

<style scoped>
.ColumnHomeRecommendation-card {
  margin: 0 8px 16px;
}
.ColumnHomeColumnCard {
  border-radius: 4px;
  -webkit-box-shadow: 0 8px 18px rgb(0 0 0 / 6%);
  box-shadow: 0 8px 18px rgb(0 0 0 / 6%);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  padding: 26px 0 23px;
  width: 206px;
}
.ColumnHomeColumnCard {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: #fff;
}
a {
  color: inherit;
  text-decoration: none;
}
.ColumnHomeColumnCard-info {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
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
  color: #11a668;
  border-color: #11a668;
}
.Button--green:hover {
  background-color: rgba(133, 144, 166, 0.06);
}
.Button {
  display: inline-block;
  padding: 0 16px;
  font-size: 14px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  background: none;
  border: 1px solid;
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
  border-radius: 50%;
}
</style>
