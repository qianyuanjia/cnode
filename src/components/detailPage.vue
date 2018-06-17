<template>
  <div class="outer clearfix">
    <div v-if="isLoading" class="loading">
      <img src="../assets/loading.gif" alt="loading">
    </div>
    <div v-else>
      <div class="wrap">
        <article class="page_art">
          <header class="page_head">
            <span class="sTab" v-if="pageContent.top">置顶</span>
            <span class="sTab" v-else-if="pageContent.good">精华</span>
            <span class="tab" v-else>{{pageContent.tab | transformTab}}</span>
            <span class="title">{{pageContent.title}}</span>
            <p class="subline">
              <span class="time">☀︎发布于{{pageContent.last_reply_at | transformReplyTime}}</span>
              <span>☀作者{{pageContent.author.loginname}}</span>
              <span>☀{{pageContent.visit_count}}次浏览</span>
              <span>☀来自 {{pageContent.tab | transformTab}}</span>
            </p>
          </header>
          <section v-html="pageContent.content" class="page_sect"></section>
        </article>

        <div class="reply">
          <div class="top">{{pageContent.reply_count}}回复</div>
          <ul class="reply_list">
            <li v-for="(item,idx) in pageContent.replies">
              <router-link :to="{
                  name:'user',
                  params:{
                    loginname:item.author.loginname
                  }
              }">
                <img :src="item.author.avatar_url" alt="head" class="headImg">
                <span class="name">{{item.author.loginname}}</span>
              </router-link>
              <span class="posTime">
              <span>{{idx+1}}楼</span>
              <span>✎{{item.create_at | transformReplyTime}}</span>
            </span>
              <p v-html="item.content" class="reply_content"></p>
            </li>
          </ul>
        </div>
      </div>
      <aside class="page_aside">
      <div class="aside_wrap">
        <div class="aside_top">作者</div>
        <div class="aside_body">
          <router-link :to="{
            name:'user',
            params:{
              loginname:userInfo.loginname
            }
          }">
            <img :src="userInfo.avatar_url" alt="head" class="aside_img">
            <span class="user_name">{{userInfo.loginname}}</span>
          </router-link>
          <p class="score">积分:{{userInfo.score}}</p>
        </div>
      </div>
      <div class="aside_wrap">
        <div class="aside_top">作者其他话题</div>
        <div class="aside_body">
          <ul>
            <li class="recent_topic_title" v-for="item in userInfo.recent_topics">
              <router-link :to="{
                name:'detail',
                params:{
                  topic_id:item.id
                }
              }">
                {{item.title}}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
    </div>
  </div>
</template>

<script>
    export default {
        name: "detailPage",
        data(){
          return {
            topic_id:'',
            pageContent:{},
            isLoading:false,
            userInfo:{}
          }
        },
        methods:{
          getPageData(){
            this.isLoading=true
            this.topic_id=this.$route.params.topic_id
            this.$http.get(`https://cnodejs.org/api/v1/topic/${this.topic_id}`)
              .then(res=>{
                this.pageContent=res.data.data
                this.getUserData()
                this.isLoading=false
              })
              .catch(err=>{
                console.log(err)
              })
          },
          getUserData(){
            this.$http.get(`https://cnodejs.org/api/v1/user/${this.pageContent.author.loginname}`)
              .then(res=>{
                this.userInfo=res.data.data
              })
              .catch(err=>{
                console.log(err)
              })
          }
        },
        beforeMount:function(){
          this.getPageData()
        },
        watch:{
          '$route'(to,from){
            this.getPageData()
          }
        }
    }
</script>

<style>
  @import url("../assets/markdown.css");
  .loading{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }
  ul{
    margin:0;
  }
  .outer{
    padding-bottom: 20px;
  }
  .wrap{
    float: left;
    width: 70%;
  }
  .clearfix::after{
    content: '';
    display: block;
    clear: both;
  }
  .page_art{
    background: #fff;
    border-radius: 4px;
  }

  .page_aside{
    float: right;
    width: 28%;
    border-radius: 4px;
  }
  .aside_wrap{
    margin-bottom: 15px;
  }
  .aside_top{
    background: #F6F6F6;
    padding: 12px 9px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .aside_body{
    background: #fff;
    padding: 10px;
  }
  .aside_img{
    max-width: 40px;
    vertical-align: top;
    margin-right: 10px;
  }
  .score{
    padding-left: 54px;
    padding-top: 10px;
  }
  .recent_topic_title{
    color:#94989E;
    font-size: 14px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .page_head{
    border-bottom: 1px solid #E5E5E5;
    padding: 20px 10px 15px 10px;
  }
  .tab{
    color:#A0A1A0;
    background: #E5E5E5;
    border-radius: 4px;
    font-size: 13px;
    padding: 0 3px;
  }
  .sTab{
    color:#FBFFFF;
    background: #80BE33;
    border-radius: 4px;
    font-size: 13px;
    padding: 0 3px;
  }
  .title{
    font-size: 24px;
    font-weight: bold;
    margin-left: 10px;
  }
  .subline{
    font-size: 14px;
    color:#9E9689;
    margin-top: 15px;
  }
  .page_sect{
    padding: 10px 20px 5px 20px;
    color: #333333;
  }
  .reply{
    margin-top: 15px;
    border-radius: 4px;
  }
  .top{
    background: #F6F6F6;
    padding: 16px 14px;
  }
  .reply_list{
    background: #fff;
  }
  .reply_list li{
    border-bottom: 1px solid #F0F0F0;
    padding: 10px 15px;
  }
  .headImg{
    max-width: 30px;
    vertical-align: top;
    margin-right: 5px;
  }
  .name,.user_name{
    color: #666666;
    font-size: 13px;
    text-decoration: none;
  }
  .posTime{
    color: #2E88CD;
    font-size: 13px;
  }
  .reply_content{
    padding-left: 60px;
    color: #000000;
  }
</style>
