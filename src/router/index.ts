import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import LoginPage from '@/views/LoginPage.vue';
import RegisterPage from '@/views/RegisterPage.vue';
import ForgotPasswordPage from '@/views/ForgotPasswordPage.vue';
import TabsPage from '@/views/TabsPage.vue';
import ActiveTasks from '@/views/ActiveTasks.vue';
import ClosedTasks from '@/views/ClosedTasks.vue';
import ArchivedTasks from '@/views/ArchivedTasks.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/forgot-password', name: 'ForgotPassword', component: ForgotPasswordPage },
  {
    path: '/tabs',
    component: TabsPage,
    children: [
      { path: 'actives', component: ActiveTasks },
      { path: 'fermees', component: ClosedTasks },
      { path: 'archivees', component: ArchivedTasks },
      { path: '', redirect: 'actives' } // onglet par défaut
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
