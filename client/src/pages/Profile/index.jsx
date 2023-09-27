import { Tabs } from 'antd';
import React from 'react'
import Products from '../Products';
import UserBids from './userBids';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Divider from '../../components/Divider';

const Profile = () => {

  const { user } = useSelector(state => state.user);

  const generalTab =
    <div className="flex flex-col w-1/2 ">
      <span className="text-primary text-xl flex justify-between flex-wrap ">
        <p>Name : </p>
        <b className="text-2xl">{user.username}</b>
      </span>
      <Divider />
      <span className="text-primary text-xl flex justify-between flex-wrap ">
        <p>Email : </p>
        <b className="text-2xl">{user.email}</b>
      </span>
      <Divider />
      <span className="text-primary text-xl flex justify-between flex-wrap">
        <p>Created At :{" "}</p>

        <b className="text-2xl">
          {moment(user.createdAt).format("MM D , YYYY hh:mm A")}
        </b>
      </span>
    </div>

  const items = [
    {
      key: '1',
      label: 'Products',
      children: <Products />,
    },
    {
      key: '2',
      label: 'Bids',
      children: <UserBids />,
    },
    {
      key: '3',
      label: 'General',
      children: generalTab,
    },
  ]

  return (
    <div>
      <Tabs defaultActiveKey='1' items={items} />

    </div>
  )
}

export default Profile;
