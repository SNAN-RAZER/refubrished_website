import React, { useEffect } from 'react'
import { Button, Divider, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUser } from '../../apicalls/users';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../redux/loadersSlice';


const rules = [
  {
    required: true,
    message: "Required"
  }
]

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Antd message api implementation
  const [messageApi, contextHolder] = message.useMessage();
  const success = (content) => {
    messageApi.open({
      type: 'success',
      content,
    });
  };

  const errorM = (content) => {
    messageApi.open({
      type: 'error',
      content,
    });
  };


  //End of Antd message api implementation
  // OnFinish function
  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await RegisterUser(values);
      if (response.success) {
        success(response.message);
        dispatch(setLoader(false));
        navigate('/login');
      }
      else {
        throw new Error(response.message);
      }

    } catch (error) {
      message.error(error);
      dispatch(setLoader(false));
    }
  }


  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);
  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      {contextHolder}
      <div className="bg-white p-3 rounded w-[450px]">
        <h1 className='text-primary text-2xl'>
          SMP - <span className="text-gray-400 text-2xl">
            Register
          </span>
        </h1>
        <Divider />
        <Form
          layout='vertical'
          onFinish={onFinish}
        >
          {/* Name */}
          <Form.Item
            label="Name"
            name="username"
            rules={rules}
          >
            <Input placeholder='Name' />
          </Form.Item>

          {/*  Email*/}
          <Form.Item
            label="Email"
            name="email"
            rules={rules}
          >
            <Input placeholder='Email' type='email' />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={rules}
          >
            <Input placeholder='Password' type='password' />
          </Form.Item>


          <Button type='primary' htmlType='submit' block>
            Register
          </Button>

          <div className="mt-5 text-center mt-2">
            <span className="text-gray-500">
              Already have an account?{" "}
              <Link to='/login' className='text-primary'>
                Login
              </Link>
            </span>
          </div>

        </Form>

      </div>
    </div>
  )
}

export default Register;
