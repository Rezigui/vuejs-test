import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Companies from './views/Companies.vue';
import CompanyDetails from './views/CompanyDetails.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/companies',
      name: 'companies',
      component: Companies,
    },
    {
      path: '/company/:company/details',
      name: 'details',
      component: CompanyDetails,
    },
  ],
});
