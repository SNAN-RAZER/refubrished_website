import React, { useEffect } from 'react'
import {Button, Divider, Form,Input, message} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../../apicalls/users';


const rules = [
  {
    required: true,
    message:"Required"
  }
]

const Login = () => {

  const navigate = useNavigate();

// OnFinish function
const onFinish =async (values) =>{
  try {
     const response = await LoginUser(values);
     if(response.success){
      message.success(response.message);
      localStorage.setItem('token', response.data);
      navigate("/");
     }
     else{
      throw new Error(response.message);
     }
     
  } catch (error) {
    message.error(error);
  }
}

useEffect(()=>{
  if(localStorage.getItem('token'))
  {
    navigate('/');
  }
},[]);

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
