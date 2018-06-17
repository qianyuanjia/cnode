<template>
    <main>
      <div v-if="isLoading" class="loading">
        <img src="../assets/loading.gif" alt="loading">
      </div>
      <article v-else>
        <header class="new_head">
          <ul class="clearfix">
            <li class="active"><a href="###">全部</a></li>
            <li><a href="###">精华</a></li>
            <li><a href="###">分享</a></li>
            <li><a href="###">问答</a></li>
            <li><a href="###">招聘</a></li>
            <li><a href="###">客户端测试</a></li>
          </ul>
        </header>
        <section class="new_sect">
          <ul>
            <li v-for="item in news">
              <router-link :to="{
                name:'user',
                params:{
                  loginname:item.author.loginname
                }
              }">
                <img :src="item.author.avatar_url" alt="head">
              </router-link>
              <p class="line">
                <span class="count"><span title="回复数">{{item.reply_count}}</span>/<span title="点击数">{{item.visit_count}}</span></span>
                <span class="sTab" v-if="item.top">置顶</span>
                <span class="sTab" v-else-if="item.good">精华</span>
                <span class="tab" v-else>{{item.tab | transformTab}}</span>
                <router-link :to="{
                    name:'detail',
                    params:{
                      topic_id:item.id
                    }
                }">
                  <span class="title">{{item.title}}</span>
                </router-link>
              </p>
              <span class="time">{{item.last_reply_at | transformReplyTime}}</span>
            </li>
          </ul>
        </section>
        <pagination @handle="updatePage"></pagination>
      </article>
    </main>
</template>

<script>
    import pagination from "./pagination"
    export default {
        name: "newsList",
        data(){
          return{
            news:{},
            isLoading:false,
            page:1
          }
        },
        components:{
          pagination
        },
        methods:{
          getData(){
            this.$http.get("https://cnodejs.org/api/v1/topics",{
              params:{
                page:this.page,
                limit:20
              }
            })
              .then(res=>{
                this.news=res.data.data
                this.isLoading=false
              })
              .catch(err=>{
                console.log(err)
              })
          },
          updatePage(page){
            this.page=page
            this.getData()
          }

        },
      beforeMount:function(){
          this.isLoading=true
          this.getData()
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

  .new_head>ul{
    background: #F6F6F6;
    padding: 12px 6px;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .new_head>ul>li{
    float: left;
    margin: 0 13px;
    padding: 1px 2px;
  }
  .clearfix::after{
    content: '';
    display: block;
    clear: both;
  }
  .new_head>ul>li.active{
    background: #80BE33;
    border-radius: 4px;
  }
  .new_head>ul>li.active>a{
    color: #FFFFFF;
  }
  .new_head>ul>li>a{
    color: #80BE33;
    text-decoration: none;
    font-size: 16px;
  }
  .new_sect>ul>li{
    background: #fff;
    padding: 9px;
    border-bottom: 1px solid #F0F0F0;
  }
  .new_sect>ul>li:hover{
    background: #F5F5F5;
  }
  .new_sect>ul>li img{
    max-width:30px;
    vertical-align: top;
  }
  .count{
    font-size: 9px;
    display: inline-block;
    width: 70px;
    text-align: center;
  }
  span[title=回复数]{
    color: #A478C0;
    font-size: 13px;
  }
  span[title=点击数]{
    color:#B4B4B4;
    font-size: 11px;
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
  .time{
    color: #A18489;
    font-size: 12px;
    float: right;
    margin-top: 6px;
  }
  .line{
    display: inline-block;
    height: 30px;
    line-height: 30px;
  }
  .title{
    display: inline-block;
    width: 420px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    vertical-align: top;
    cursor: pointer;
    color: #333333;
    font-size: 16px;
    font-weight: normal;
  }
  .title:hover{
    text-decoration: underline;
  }
</style>
