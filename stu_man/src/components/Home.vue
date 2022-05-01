<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <span>在线数字图像处理实验平台</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF"
                 :collapse="isCollapse" :collapse-transition="false" :default-active="activePath" router>
                 <!-- el-menu 中的router属性决定是否在点击时进行路由跳转 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist[Number(identity)]" :key="item.id">
            <template slot="title">
              <!-- 绑定了图标 -->
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState(subItem.path)">
              <i :class="iconsObj[subItem.id]"></i>
              <span>{{subItem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      // 左侧菜单渲染数据列表
      // 根据用户的identity渲染，0为管理员，1为学生
      menulist: [
        [
          { id: 1, authName: '用户管理', children: [{ id: 11, authName: '进度监控', path: '/accounts' },{ id: 5, authName: '添加账号', path: '/addaccounts' }] }
        ],
        [
          { id: 2, authName: '个人信息', children: [{ id: 21, authName: '查看', path: '/stuProfile' }] },
          { id: 3, authName: '实验进度', children: [{ id: 32, authName: '实验题目', path: '/tasks' }] }
        ]
      ],
      iconsObj: {
        1: 'el-icon-user-solid',
        11: 'el-icon-menu',
        2: 'el-icon-user-solid',
        21: 'el-icon-view',
        3: 'el-icon-tickets',
        31: 'el-icon-s-check',
        32: 'el-icon-document-add',
        33: 'el-icon-document-checked',
        34: 'el-icon-document-delete',
        4: 'el-icon-first-aid-kit',
        5: 'el-icon-plus'
      },
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: '',
      // 用户的身份
      identity: ''
    }
  },
  created () {
    this.activePath = window.sessionStorage.getItem('activePath')
    this.identity = window.sessionStorage.getItem('identity')
  },
  methods: {
    // 退出
    logout () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
