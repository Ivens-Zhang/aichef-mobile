import Vue from 'vue'
import VueRouter from 'vue-router'
import Success from '../views/Success.vue'
import Register from '../views/Register.vue';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Register',
    component: Register
  },
  {
    path: '/success',
    name: 'Success',
    component: Success
  }
]

const router = new VueRouter({
  routes
})

export default router
