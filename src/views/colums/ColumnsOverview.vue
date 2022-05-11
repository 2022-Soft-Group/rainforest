<template>
  <div class="ColumnHomeTop">
    <h1 class="ColumnHomeTop-logo"></h1>
    <h2 class="ColumnHomeTop-subTitle">随心写作，自由表达</h2>
    <button style="button" class="ColumnHomeTop-requestButton Button--plain Button--green">申请开通专栏</button>
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
  background: url(https://static.zhihu.com/heifetz/assets/logo.84666bea.png) 50% no-repeat;
  background-size: 129px 179px;
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
</style>
