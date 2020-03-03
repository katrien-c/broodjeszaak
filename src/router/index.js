import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import OrderAdd from '../components/Order/Add.vue'
import OrderList from '../components/Order/List.vue'
import OrderDetail from '../components/Order/Detail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/order/add',
    name: 'Order-add',
    component: OrderAdd
  }, 
  {
    path: '/order/list',
    name: 'Order-list',
    component: OrderList
  }, 
  {
    path: '/order/detail/:id',
    name: 'Order-detail',
    props: true,
    component: OrderDetail
  },
]

const router = new VueRouter({
  routes
})

export default router
