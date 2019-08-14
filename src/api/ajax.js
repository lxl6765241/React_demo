//这是用来发ajax请求的函数模块
import axios from 'axios'
const qs = require('qs')
//使用请求拦截器
//使用响应拦截器
axios.interceptors.request.use(
    config =>{
        console.log('config', config)
        if (config.method.toUpperCase()==='POST'&&config.data instanceof Object){

            config.data = qs.stringify(config.data)
        }
        return config
    })
axios.interceptors.response.use(   
         //请求成功时执行
    response =>{
        alert('登录成功，木嘛')
        return response.data
    },
    //请求出异常时执行
    error => {
        alert('请求出错了，嘤嘤嘤')
        //统一处理请求异常，外部调用不用再处理异常
        //返回一个初始化状态的promise
        //相当于终止了promise链
        //不会再向下执行
        return new Promise(()=>{})
    }
    
   
)

// axios.post('/login',{username:'admin',password:'admin'})
// .then(
//     data =>{

//     },
//     error =>{

//     }
// )

export default axios
