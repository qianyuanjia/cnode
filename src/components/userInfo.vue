<template>
  <div class="outer clearfix">
    <div v-if="isLoading" class="loading">
      <img src="../assets/loading.gif" alt="loading">
    </div>
    <div class="wrap clearfix" v-else>
      <article>
        <section class="user_info">
          <header>
            <span class="index">主页</span>
            /</header>
          <main>
            <img :src="userInfo.avatar_url" alt="head" class="head">
            <span class="name">{{loginname}}</span>
            <p class="score">{{userInfo.score}}积分</p>
            <p class="git">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-github"></use>
              </svg>
              <a :href="'https://github.com/'+userInfo.githubUsername">@{{userInfo.githubUsername}}</a>
            </p>
            <p class="reg">注册时间{{userInfo.create_at | transformReplyTime}}</p>
          </main>
        </section>
        <section class="create_topics">
          <header>最近创建的话题</header>
          <ul>
            <li v-for="item in userInfo.recent_topics" class="topic_item">
              <div class="usr_head">
                <img :src="item.author.avatar_url" alt="head" class="head">
                <topic-info :topic_id="item.id"></topic-info>
              </div>
              <span class="topic_title">
                <router-link :to="{
                  name:'detail',
                  params:{
                    topic_id:item.id
                  }
                }">
                  {{item.title}}
                </router-link>
              </span>
              <span class="reply_time">{{item.last_reply_at | transformReplyTime}}</span>
            </li>
            <li class="topic_item" v-if="userInfo.recent_topics.length === 0">该同学最近没有创建话题</li>
          </ul>
        </section>
        <section class="join_topics">
          <header>最近参与的话题</header>
          <ul>
            <li v-for="item in userInfo.recent_replies.slice(0,10)" class="topic_item">
              <div class="usr_head">
                <img :src="item.author.avatar_url" alt="head" class="head">
                <topic-info :topic_id="item.id"></topic-info>
              </div>
              <span class="topic_title">
                <router-link :to="{
                  name:'detail',
                  params:{
                    topic_id:item.id
                  }
                }">
                  {{item.title}}
                </router-link>
              </span>
              <span class="reply_time">{{item.last_reply_at | transformReplyTime}}</span>
            </li>
            <li class="topic_item" v-if="userInfo.recent_replies.length === 0">该同学最近没有参与话题</li>
          </ul>
        </section>
      </article>
      <aside>
        <section>
          <header>作者</header>
          <main>
            <img :src="userInfo.avatar_url" alt="head" class="head">
            <span class="name">{{loginname}}</span>
            <p class="score">积分:{{userInfo.score}}</p>
          </main>
        </section>
      </aside>
    </div>
  </div>
</template>

<script>
    export default {
        name: "userInfo",
        data(){
          return {
            loginname:'',
            userInfo:{},
            isLoading:false
          }
        },
        methods:{
          getUserData(){
            this.$http.get(`https://cnodejs.org/api/v1/user/${this.loginname}`)
              .then(res=>{
                this.userInfo=res.data.data
                this.isLoading=false
              })
              .catch(err=>{
                console.log(err)
              })
          }

        },
        beforeMount:function(){
          this.isLoading=true
          this.loginname=this.$route.params.loginname
          this.getUserData()
        },
        components:{
          topicInfo:{
            template:`
              <span>
                <span style="color: #A478C0;font-size: 13px;">{{topic.reply_count}}</span>/<span style="color:#B4B4B4;font-size: 11px;">{{topic.visit_count}}</span>
              </span>
            `,
            data(){
              return {
                topic:{}
              }
            },
            props:['topic_id'],
            methods:{
              getTopicInfo(){
                this.$http.get(`https://cnodejs.org/api/v1/topic/${this.topic_id}`)
                  .then(res=>{
                    this.topic=res.data.data
                  })
                  .catch(err=>{
                    console.log(err)
                  })
              }
            },
            beforeMount:function(){
              this.getTopicInfo()
            }

          }
        }

    }
</script>

<style scoped>
  .loading{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
  }
  .wrap{
    width: 100%;
  }
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
  section{
    margin: 0;
    margin-bottom: 15px;
    width: 100%;
    padding: 0;
  }
  .reply_time{
    float:right;
    color:#77777B;
    font-size: 12px;
    margin-top: 10px;
  }
  .topic_title{
    color:#5389CD;
    font-size: 16px;
    position: relative;
    top:5px;
    display: inline-block;
    width: 420px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .usr_head{
    width: 110px;
    display: inline-block;
  }
  .clearfix::after{
    content: '';
    display: block;
    clear: both;
  }

  .topic_item{
    background: #fff;
    padding: 10px;
    border-bottom: 1px solid #F0F0F0;
  }
  .git{
    color: #8E8388;
    font-size: 13px;
    margin: 9px 0 19px 0;
  }
  .git a{
    text-decoration: none;
    color: #8E8388;
    font-size: 13px;
  }
  .reg{
    color: #999999;
    font-size: 14px;
  }
  .score{
    margin-top: 15px;
    font-size: 14px;
  }
  .name{
    color: #76829C;
    font-size: 13px;
  }
  .head{
    width: 40px;
    margin-right: 10px;
    vertical-align: top;
  }
  article{
    width: 70%;
    float: left;
    background: #E1E1E1;
  }
  main{
    background: #fff;
    padding: 10px;
  }
  header{
    background: #F6F6F6;
    padding: 12px 9px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .index{
    color: #9AC57E;
  }
  aside{
    width: 28%;
    float: right;
  }
</style>
