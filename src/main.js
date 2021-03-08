import Vue from 'vue'
import App from './App.vue'
import router from '@/router/index'
import store from '@/store/index'

import '@/utils/mixins.js'
import '@/utils/filters.js'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import '@/assets/css/reset.scss';
import '@/assets/font/iconfont.css';
Vue.config.productionTip = false

//excel 导出
import JsonExcel from 'vue-json-excel'

Vue.component('downloadExcel', JsonExcel)
//栗子特效
import VueParticles from 'vue-particles'
Vue.use(VueParticles)
//动画
import animated from 'animate.css' // npm install animate.css --save安装，再引入
Vue.use(animated)
//Echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
//diver
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'

Vue.prototype.$driver = new Driver({
    allowClose: false, //禁止点击外部关闭
    doneBtnText: '完成', // 完成按钮标题
    closeBtnText: '关闭', // 关闭按钮标题
    stageBackground: '#fff', // 引导对话的背景色
    nextBtnText: '下一步', // 下一步按钮标题
    prevBtnText: '上一步', // 上一步按钮标题
})

//editor


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
