/**
 * Created by ylf on 2017/7/22.
 */
import xForm from './Form/index.vue'

xForm.install = function (Vue) {
  Vue.component(xForm.name, xForm)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(xForm)
}

export default xForm
