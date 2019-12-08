import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

const routes = [
  {
    path: '/planned',
    name: 'Planned',
    component: () => import(/* webpackChunkName: "about" */ '../views/Planned.vue'),
  },
  {
    path: '/actual',
    name: 'Actual',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Actual.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
