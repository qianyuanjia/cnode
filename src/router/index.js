import Vue from 'vue'
import Router from 'vue-router'
import newsList from "../components/newsList"
import detailPage from "../components/detailPage"
import userInfo from "../components/userInfo"

Vue.use(Router)


export default new Router({
  routes: [
    {
      name:"root",
      path:'/',
      components:{
        main:newsList
      }
    },
    {
      name:"detail",
      path:'/detail/:topic_id',
      components:{
        main:detailPage
      }
    },
    {
      name:'user',
      path:"/user/:loginname",
      components:{
        main:userInfo
      }
    }
  ]
})
