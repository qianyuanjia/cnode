<template>
  <div id="app">
    <top-nav />
    <router-view name="main" class="main"></router-view>
  </div>
</template>

<script>
  import topNav from "./components/topNav"
export default {
  name: 'App',
  components:{
    topNav
  }
}
</script>

<style>
  body{
    background: #E1E1E1;
  }
  .main{
    margin-top: 18px;
    width:80%;
    margin-left: auto;
    margin-right: auto;
  }
  #app{
    padding-bottom: 20px;
  }
</style>
