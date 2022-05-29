import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/accounts/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import StuProfile from '../components/profile/StuProfile.vue'
import Account from '../components/accounts/Account.vue'
import Tasks from '../components/tasks/tasks'
import AddAccount from '../components/accounts/AddAccount' 
import AddBatchAccount from '@/components/accounts/AddBatchAccount'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/stuProfile', component: StuProfile },
        { path: '/accounts', component: Account },
        { path: '/tasks', component: Tasks },
        { path: '/addaccounts', component: AddAccount },
        { path: '/addbatchaccounts', component: AddBatchAccount}
      ]
    }
  ]
})

// 挂载导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
