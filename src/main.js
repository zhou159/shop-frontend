import Vue from 'vue'
import App from './App.vue'
import router from './router'//自动扫描里面的路由配置

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.config.productionTip = false

axios.defaults.withCredentials = true


Vue.prototype.$axios = axios
Vue.prototype.$base_url = 'http://localhost:8081/'

Vue.use(VueAxios, axios);
//显示声明使用VueRouter
Vue.use(router);
Vue.use(ElementUI);

new Vue({
  //配置路由
  router,
  render: h => h(App),
}).$mount('#app')
