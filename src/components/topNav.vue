<template>
    <header>
      <img src="../assets/logo.svg" alt="logo">
      <ul class="clearfix">
        <li><router-link :to="{name:'root'}">首页</router-link></li>
        <li><a href="###">新手入门</a></li>
        <li><a href="###">API</a></li>
        <li><a href="###">关于</a></li>
        <li><a href="###">注册</a></li>
        <li><a href="###">登录</a></li>
      </ul>
    </header>
</template>

<script>
    export default {
        name: "topNav"
    }
</script>

<style scoped>
  header{
    background: #444444;
    padding: 7px 75px 10px 62px;
  }
  img{
    max-width:122px;
  }
  ul{
    list-style: none;
    float: right;
    padding-top: 6px;
  }
  li{
    float:left;
    margin: 0 15px;
  }
  .clearfix::after{
    content: '';
    display: block;
    clear: both;
  }
  a,a:hover,a:active,a:visited,a:link{
    text-decoration: none;
    color: #CCCCCC;
    font-size: 14px;
  }
</style>
