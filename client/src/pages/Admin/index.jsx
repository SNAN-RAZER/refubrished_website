import { Tabs } from 'antd'
import React, { useEffect } from 'react'
import AdminProduct from './AdminProduct'
import Users from './Users'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Admin = () => {

  const navigate = useNavigate();
  const {user} = useSelector((state)=>state.user);
  const items =[
    {
      key: '1',
      label: 'Products',
      children: <AdminProduct />,
    },
    {
      key: '2',
      label: 'Bids',
      children: <Users />,
    },
   
  ]

  useEffect(()=>{
    if(user.role !=='admin')
    {
      navigate('/');
    }
  },[])

  return (
    <div>
        <Tabs defaultActiveKey='1'  items={items}/>
           
    </div>
  )
}

export default Admin