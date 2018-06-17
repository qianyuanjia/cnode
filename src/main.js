// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from "axios"

Vue.prototype.$http=Axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

Vue.filter('transformTab',function(value){
  switch(value){
    case 'share':
      return '分享';
    case 'ask':
      return '问答';
    case 'good':
      return '精华';
    case 'job':
      return '招聘';
    default:
      return '';
  }
})

Vue.filter('transformReplyTime',function(value){
  var lastDate=new Date(value);
  var nowDate=new Date();
  var diffTime=parseInt((nowDate.getTime()-lastDate.getTime())/1000);
  if(diffTime<30){
    return '刚刚';
  }else if(diffTime<60){
    return diffTime+'秒前';
  }else if(diffTime/60<60){
    return parseInt(diffTime/60)+'分钟前';
  }else if(diffTime/3600<24){
    return parseInt(diffTime/3600)+'小时前';
  }else if(diffTime/86400<30){
    return parseInt(diffTime/86400)+'天前';
  }else if(diffTime/2592000<12){
    return parseInt(diffTime/2592000)+'月前';
  }else{
    return parseInt(diffTime/31104000)+'年前';
  }
})
