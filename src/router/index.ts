import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import LoginPage from '../views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue';
import FirebaseDatastore from '@/views/FirebaseDatastore.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/firebasedatastore', name: 'FirebaseDatastore', component: FirebaseDatastore}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
