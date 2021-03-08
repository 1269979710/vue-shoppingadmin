import axios from 'axios'
import qs from 'qs'
axios.defaults.baseURL = '/api'

axios.interceptors.request.use(function (config) {
    config.headers['token'] = localStorage.getItem('token') || ''
    return config;
}, function (error) {
    return Promise.reject(error);
})

export const getUserApi = params => {
    return axios.get('users/index.php', { params }).then(res => res.data)
}

export const postUserApi = postData => {
    return axios.post('/users/create.php', qs.stringify(postData)).then(res => res.data)
}
export const getUserHistoryApi = params => {
    return axios.get('users/history.php', { params }).then(res => res.data)
}


export const deleteUserApi = params => {
    return axios.delete('/users/delete.php', { params }).then(res => res.data)
}

export const putUsersStateApi = postData => {
    return axios.put('/users/state.php', qs.stringify(postData)).then(res => res.data)
}

export const putUsersRolesApi = postData => {
    return axios.put('/users/assign.php', qs.stringify(postData)).then(res => res.data)
}

export const getRolesApi = postData => {
    return axios.get('/roles/index.php').then(res => res.data)
}

export const deleteRolesApi = params => {
    return axios.delete('/roles/delete.php', { params }).then(res => res.data)
}

export const postRolesApi = postData => {
    return axios.post('/roles/create.php', qs.stringify(postData)).then(res => res.data)
}

export const getAuthsApi = () => {
    return axios.get('/auth/index.php').then(res => res.data)
}

export const putAuthsApi = postData => {
    return axios.put('/roles/assign.php', qs.stringify(postData)).then(res => res.data)
}


export const postLoginApi = postData => {//uname:'',pwd:'',question:'',answer:'',
    return axios.post('/users/login.php', qs.stringify(postData)).then(res => res.data)
}
export const postLoginsmApi = postData => {//uname:'',pwd:'',question:'',answer:'',
    return axios.post('/qr/check.php', qs.stringify(postData)).then(res => res.data)
}

export const getGoodsApi = params => {
    return axios.get('/goods/index.php', { params }).then(res => res.data)
}

//商品分类列表
export const getCateApi = params => {
    return axios.get('/cate/index.php', { params }).then(res => res.data)
}
//商品创建
export const postGoodsCreateApi = postData => {//goods_name,goods_number,market_price,shop_price,cat_id,thumb,
    return axios.post('/goods/create.php', qs.stringify(postData)).then(res => res.data)
}

//订单统计
export const getGoodsTotal = params => {
    return axios.get('/orders/total.php', { params }).then(res => res.data)
}


