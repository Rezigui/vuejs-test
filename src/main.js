import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
// import Vuex from 'vuex';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue';
import router from './router';
import store from './store/index';
import db from './services/db';


Vue.config.productionTip = true;

Vue.use(db);
Vue.use(Antd);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCPyGfhfFiBLR-tSI76TmFC52BMM9SSYfs',
  },
});

new Vue({
  router,
  store,
  beforeMount() {
    this.$store.dispatch('getAllCompanies', this);
    this.$store.dispatch('getAllRates', this);
  },
  render: h => h(App),
}).$mount('#app');
