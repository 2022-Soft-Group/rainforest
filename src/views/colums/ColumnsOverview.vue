<template>
  <div class="ColumnHomeTop">
    <h1 class="ColumnHomeTop-logo"></h1>
    <h2 class="ColumnHomeTop-subTitle">想写就写，想抄就抄</h2>
    <button style="button" class="ColumnHomeTop-requestButton Button--plain Button--green">申请开通专栏</button>
  </div>
  <div class="ColumnHomeRecommendation">
    <h3 class="ColumnHomeTitle">
      <div class="ColumnHomeTitle-text">专栏 · 探索</div>
      <div class="ColumnHomeTitle-line"></div>
    </h3>
    <column-list></column-list>
  </div>
  <div class="ColumnHomeBottom ColumnHome-HomeBttom">
    <h3 class="ColumnHomeBottom-title">在语林创作</h3>
    <button type="button" class="Button ColumnHomeBottom-requestButton">申请专栏</button>
  </div>
</template>

<style>
.ColumnHomeTop {
  background: url() 50% no-repeat;
  height: 470px;
  position: relative;
}
.ColumnHomeTop:before {
  background: url(https://static.zhihu.com/heifetz/assets/bg@2x.033e5b2d.png) repeat-x;
  background-size: 20px 450px;
  content: '';
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
}
.ColumnHomeTop-logo {
  background: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_JF3LxhTeQi-N-8tXh5XEazs24rri3-2E_w&usqp=CAU)
    50% no-repeat;
  background-size: 700px 379px;
  height: 0;
  left: 50%;
  margin: 0 0 0 -65px;
  overflow: hidden;
  padding-top: 179px;
  position: absolute;
  top: 152px;
  width: 129px;
}
.ColumnHomeTop-subTitle {
  font-size: 18px;
  font-weight: 300;
  letter-spacing: 0.5em;
  line-height: 24px;
  margin: 0;
  position: absolute;
  text-align: center;
  top: 350px;
  width: 100%;
}
.ColumnHomeTop-requestButton {
  font-size: 14px;
  left: 50%;
  line-height: 12px;
  margin-left: -36px;
  position: absolute;
  top: 466px;
}
.Button--link,
.Button--plain {
  height: auto;
  padding: 0;
  line-height: inherit;
  background-color: transparent;
  border: none;
  border-radius: 0;
}
.Button--green {
  color: #11a668;
  border-color: #11a668;
}
.ColumnHomeRecommendation {
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
  margin: 48px auto 0;
  width: 888px;
}
.ColumnHomeTitle {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin: 0 3px 32px;
  width: 100%;
}
.ColumnHomeTitle-text {
  font-size: 14px;
  line-height: 22px;
  margin: 0 16px;
  font-weight: 600;
  font-synthesis: style;
}
.ColumnHomeTitle-line {
  display: none;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  height: 1px;
}
.ColumnHome-HomeBttom {
  margin-top: 48px;
}
.ColumnHomeBottom {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: url(https://static.zhihu.com/heifetz/assets/bg@2x.033e5b2d.png) repeat-x;
  background-size: 20px 450px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  padding-top: 134px;
}
.ColumnHomeBottom-title {
  border: solid #97ffd8;
  border-width: 1px 0;
  font-size: 18px;
  font-weight: 300;
  letter-spacing: 14px;
  padding: 26px 0;
  text-align: center;
  white-space: nowrap;
  width: 345px;
}
.ColumnHomeBottom-requestButton {
  line-height: 36px;
  margin-top: 40px;
  height: 38px;
  width: 120px;
}
.ColumnHomeBottom-requestButton {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #444;
}
.ColumnHomeBottom-requestButton {
  border-color: #444;
}
</style>
