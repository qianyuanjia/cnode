<template>
    <div class="page">
      <div class="btnWrap clearfix">
          <button @click="changePage">首页</button>
          <button @click="changePage">上一页</button>
          <button class="pageBtn" v-if="pages[0]>1">...</button>
          <button @click="changePage(page)" :class="{pageBtn:true,currentPage:page===curPage}" v-for="page in pages">{{page}}</button>
          <button class="pageBtn">...</button>
          <button @click="changePage">下一页</button>
      </div>
    </div>
</template>

<script>
    export default {
        name: "pagination",
        data(){
          return {
            pages:[1,2,3,4,5],
            curPage:1
          }
        },
        methods:{
          changePage(page){
            if(typeof page !== 'number'){
              switch(page.target.innerText){
                case '首页':
                  this.curPage=1;
                  this.pages=[1,2,3,4,5];
                  break;
                case '上一页':
                  this.changePage(this.curPage-1);break;
                case "下一页":
                  this.changePage(this.curPage+1);break;
              }
              this.$emit('handle',this.curPage)
              return
            }
            if(page<1){
              page=1
            }
            this.curPage=page
            if(page===this.pages[this.pages.length-1]){
              this.pages.shift()
              this.pages.push(page+1)
            }else if(page===this.pages[0] && this.pages[0] !== 1){
              this.pages.pop()
              this.pages.unshift(page-1)
            }
            this.$emit('handle',this.curPage)
          }
        }
    }
</script>

<style scoped>
  .page{
    background: #fff;
    padding: 12px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  button{
    background: none;
    border: 1px solid #ccc;
    cursor: pointer;
    height:32px;
    font-size: 14px;
  }
  button:focus{
    outline: none;
  }
  button:hover{
    background: #eee;
  }
  .pageBtn{
    width: 40px;
  }
  button:nth-child(even){
    border-right: none;
    border-left: none;
  }
  .currentPage{
    color: #80BE33;
  }
  .btnWrap{
    border-right:1px solid #ccc;
    display: inline-block;
  }
  .btnWrap button{
    float:left;
  }
  .clearfix::after{
    content: '';
    display: block;
    clear: both;
  }
  </style>
