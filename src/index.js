/**
 * Created by ylf on 2017/7/22.
 */
import ChanctForm from './Form/index.vue'

ChanctForm.install = function (Vue) {
  Vue.component(ChanctForm.name, ChanctForm)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(ChanctForm)
}

export default ChanctForm