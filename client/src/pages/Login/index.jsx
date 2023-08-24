import React from 'react'
import {Button, Divider, Form,Input} from 'antd';
import { Link } from 'react-router-dom';


const rules = [
  {
    required: true,
    message:"Required"
  }
]

const Login = () => {

// OnFinish function
const onFinish =(values) =>{
  console.log(values);
}

  return (
   <div className="h-screen bg-primary flex justify-center items-center">
    <div className="bg-white p-3 rounded w-[450px]">
    <h1 className='text-primary text-2xl'>
      SMP - <span className="text-gray-400">
        Login
      </span>
    </h1>
    <Divider />
    <Form 
    layout='vertical'
    onFinish={onFinish}
    >
      {/*  Email*/}
      <Form.Item
      label ="Email"
      name="email"
      rules = {rules}
      >
        <Input  placeholder='Email'  type='email'/>
      </Form.Item>

      {/* Password */}
      <Form.Item
      label ="Password"
      name="password"
      rules = {rules}
      >
        <Input  placeholder='Password' type='password'/>
      </Form.Item>

      
      <Button type='primary' htmlType='submit' block>
        Login
      </Button>

      <div className="mt-5 text-center mt-2">
        <span className="text-gray-500">
          Don't have an account?{" "}
          <Link to='/register' className='text-primary'>
            Register
          </Link>
        </span>
      </div>

    </Form>

    </div>
   </div>
  )
}

export default Login;
