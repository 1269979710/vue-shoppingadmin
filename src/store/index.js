import Vue from 'vue'
import Vuex from 'vuex'
import { getGoodsApi } from '@/api'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        goods: {
            namespaced: true,
            state: {
                //定义模型
                initData: [],
                total: 0,

            },
            mutations: {
                setInitData (state, payload) {
                    //payload用的actions37,38行数据
                    state.initData = payload.list

                    state.total = parseInt(payload.total)

                }
            },
            actions: {
                setInitData (context, params) {
                    getGoodsApi(params)
                        .then(res => {
                            context.commit('setInitData', {
                                list: res.data.list,
                                total: res.data.total,

                            })
                        })
                }
            }

        }
    }
})