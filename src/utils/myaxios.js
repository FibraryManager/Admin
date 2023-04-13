import axios from 'axios'

axios.create({
    baseURL:'/', //基础路径，发送请求路径的前缀
    timeout:5000 //超时时间
})

//请求拦截器
myaxios.interceptors.request.use(function(config){
    return config;
},function(error){
    return Promise.reject(error)
})


//响应拦截器
myaxios.interceptors.response.use(function(response){
    return response;
},function(error){
    return Promise.reject(error)
})

export default myaxios
