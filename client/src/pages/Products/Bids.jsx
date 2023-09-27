import Modal from 'antd/es/modal/Modal'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setLoader } from '../../redux/loadersSlice';
import { getAllBids } from '../../apicalls/bids';
import { Table, message } from 'antd';
import moment, { Moment } from 'moment';
import Divider from '../../components/Divider';
const Bids = ({
    showBidsModal,
    setShowBidsModal,
    selectedProduct
}) => {
    const [bidsData, setBidsData] = useState([]);
    const dispatch = useDispatch();
    const getData = async () => {
        try {
            dispatch(setLoader(true));
            const response = await getAllBids({
                product: selectedProduct._id
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
            title: "Bid Placed On",
            dataIndex: "createdAt",
            render: (text, record) => {
                return moment(text).format("DD/MM/YY hh:mm:ss")
            }
        },
        {
            title: "Name",
            dataIndex: "name",
            render: (text, record) => {
                return record.buyer.username
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
        <Modal
            title=""
            open={showBidsModal}
            onCancel={() => setShowBidsModal(false)}
            centered
            width={800}
        >




            <h1 className="text-xl text-primary">
                Bids
            </h1>
            < Divider />
            <div className="flex flex-col flex-gap-15">
                <h1 className="text-xl text-primary ">
                    Product Name : {selectedProduct.name}
                </h1>

                <Table className="mt-5" columns={columns} dataSource={bidsData} />
            </div>
        </Modal >
    )
}

export default Bids