//包含多个接口请求函数的模块
//每个函数的返回值都是promise对象
import ajax from './ajax'




const BASE = ''
//1.登录

export const  reqLogin = ({username,password}) => ajax.post(BASE + '/login',{username,password})

//2.添加用户↓
export const reqAddUser = user => ajax({
    url: BASE + '/manage/user/add',
    method:'POST',
    data:user
})
   


