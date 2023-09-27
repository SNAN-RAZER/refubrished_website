import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, message } from 'antd';
import moment from 'moment';
import { getAllBids } from '../../../apicalls/bids';
import Divider from '../../../components/Divider';
import { setLoader } from '../../../redux/loadersSlice';
const UserBids = () => {
  const [bidsData, setBidsData] = useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user)

  const getData = async () => {
    try {
      dispatch(setLoader(true));

      const response = await getAllBids({
        buyer: user._id
      });
      dispatch(setLoader(false));
      if (response.success) {
        setBidsData(response.data);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message)
    }
  }

  useEffect(() => {
    getData();
  }, []);

  console.log(bidsData)
  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      render: (text, record) => {
        return record.product.name
      }
    },
    {
      title: "Seller",
      dataIndex: "seller",
      render: (text, record) => {
        return record.seller.username
      }
    },
    {
      title: "Offered Price",
      dataIndex: "offeredPrice",
      render: (text, record) => {
        return record.product.price
      }
    },
    {
      title: "Bid Amount",
      dataIndex: "bidAmount",
    },
    {
      title: "Bid Date",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(record.seller.createdAt).format("DD/MM/YY hh:mm:ss")
      }
    },
    {
      title: "Bid Placed On",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(text).format("DD/MM/YY hh:mm:ss")
      }
    },
    {
      title: "Message",
      dataIndex: "message",
    },
    {
      title: "Contact Details",
      dataIndex: "contactDetails",
      render: (text, record) => {
        return (
          <div className="">
            <p>Phone: {record.mobileNumber}</p>
            <p>Email:{record.buyer.email} </p>
          </div>
        )
      }
    },

  ]

  return (
    <div

    >




      <h1 className="text-xl text-primary">
        Bids
      </h1>
      < Divider />
      <div className="flex flex-col flex-gap-15">

        <Table className="mt-5" columns={columns} dataSource={bidsData} />
      </div>
    </div >
  )
}

export default UserBids;