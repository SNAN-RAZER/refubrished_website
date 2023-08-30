import { Tabs } from 'antd';
import React from 'react'
import Products from '../Products';

const Profile = () => {

  const items =[
    {
      key: '1',
      label: 'Products',
      children:   <Products />,
    },
    {
      key: '2',
      label: 'Bids',
      children:  <h1>Bids</h1>,
    },
    {
      key: '3',
      label: 'General',
      children:    <h1>General</h1>,
    },
  ]

  return (
    <div>
        <Tabs defaultActiveKey='1'  items={items}/>
           
    </div>
  )
}

export default Profile;
