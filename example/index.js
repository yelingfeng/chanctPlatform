/**
 * Created by ylf on 2017/7/22.
 */
import Vue from 'vue'
import App from './App'
import xForm from '../src/index'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css';
import '../src/style/index.css'
Vue.use(xForm)
Vue.use(elementUI)
new Vue({
  el: '#app',
  render: h => h(App)
})
