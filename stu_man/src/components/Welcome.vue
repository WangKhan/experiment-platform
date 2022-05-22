<template>
  <div class="container">
    <h2>欢迎来到数字图像处理在线实验平台</h2>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui';
export default {
  name: '',
  data () {
    return {
      JupUrl: 'http://52.24.79.132/hub/login',
      InitUrl: 'http://52.24.79.132/hub/user-redirect/git-pull?repo=https://github.com/WangKhan/experiment_material&branch=main&subPath=tasks/&app=notebook',
      id:'',
      init: '',
      identity:''
    }
  },
  created () {
    this.id=sessionStorage.getItem('id')
    this.identity=sessionStorage.getItem('identity')
    this.init=sessionStorage.getItem('init')
    if(this.identity === '1'){
      this.open()
    }
  },
  methods: {
    open () {
      this.$confirm('即将跳转到jupyterhub登陆界面，使用学号作为用户名，首次登陆Jupyterhub时可以任意设置密码，之后需要用首次登陆的密码进行登录,完成登陆后请返回该页面', '跳转登陆', {
        confirmButtonText: '跳转页面',
        cancelButtonText: '取消跳转',
        type: 'info',
        center: true
      }).then(() => {
        window.open(this.JupUrl, "_blank");
        console.log(this.init,this.init == 'null')
        if (this.init === 'null') {
          setTimeout(() => {
            this.$confirm('首次登陆jupyterhub账号成功，需要进行账号初始化', '账号初始化', {
              confirmButtonText: '初始化账号',
              cancelButtonText: '取消初始化',
              type: 'info',
              center: true
            }).then(async () => {
              window.open(this.InitUrl, "_blank");
              try {
                await this.$http.get('/accounts/init/' + this.id)
                sessionStorage.setItem('init', 1)
                this.$message.success("账号初始成功");
              } catch (err) {
                this.$message.error("账号初始化失败");
              }
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '账号初始化失败'
              });
            })
          }, 1000)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    }
  }
}
</script>

<style scoped lang="less">
</style>

