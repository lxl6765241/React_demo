import React, { Component } from 'react'
import { Form, Icon, Input, Button, } from 'antd'
import './login.less'
import {saveUser} from '../../utils/storageUtils'
import logo from './image/logo.png'
import {Redirect} from 'react-router-dom'
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils';

const Item = Form.Item
// let mongoose = require('mongoose')

class Login extends Component {
  handleSubmit = e => {
    e.preventDefault()


    // const values = this.props.form.getFieldsValue()
    // const username = this.props.form.getFieldValue('username')
    // const pwd = this.props.form.getFieldValue('pwd')
    // console.log(values, username, pwd)
    this.props.form.validateFields(async (err,values)=>{
        if(!err){
         const result = await reqLogin(values)
         if(result.status===0){
            const user = result.data
            saveUser(user)
            // localStorage.setItem('user_key',JSON.stringify(user))
            memoryUtils.user = user

            this.props.history.replace('/')
         }else{
           
         }
        }
    })
    
  }
  validatorPwd = (rule,value,callback) =>{
    value = value.trim()
    if(!value){
      callback('密码必须输入')
    }else if(value.length < 4){
      callback('密码必须大于等于四位')
    }else if(value.length >12){
      callback('密码不能大于12位')
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
      callback('用户名必须是英文，数字，下划线构成')
    }else{
      callback()
    }
  }
  
    render() {
      // 如果当前用户已经登陆, 自动跳转到admin
      if (memoryUtils.user._id) {
        return <Redirect to="/"></Redirect>
      }

    const getFieldDecorator = this.props.form.getFieldDecorator

    return (
      <div className="login">
        <div className="login-header">
          <img src={logo} alt="logo"/>
          <h1>后台管理系统</h1>
        </div>
        <div className="login-content">
          <h1>用户登陆</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>

              {
                getFieldDecorator('username', { 
                  initialValue:'admin',
                  rules:[
                   {required:true ,whitespace:true, message:'用户名不能为空'} ,
                   {min:4 , message:'用户名不能小于4位'} ,
                   {max:12 , message:'用户名不能大于12位'} ,
                   {pattern:/^[a-zA-Z0-9_]+$/ , message:'用户名必须是英文，数字，下划线构成'} 
                  ]                 
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />
                )
              }
              
            </Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  initialValue:'admin',
                    rules:[
                      {validator:this.validatorPwd}
                    ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登  陆
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}


const WrappedLoginForm = Form.create()(Login)   

export default WrappedLoginForm



