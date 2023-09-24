import { Form, Input, message } from 'antd'
import Modal from 'antd/es/modal/Modal'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../redux/loadersSlice'
import { placeNewBid } from '../../apicalls/bids'

const BidModal = ({
    showBidModal,
    setShowBidModal,
    product,
    reloadData
}) => {
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const formRef = useRef(null);
    const rules = [{
        required: true,
        message: "Required"
    }]



    const onFinish = async (values) => {
        try {
            dispatch(setLoader(true));
            const response = await placeNewBid({
                ...values,
                product: product._id,
                seller: product.seller._id,
                buyer: user._id

            });
            dispatch(setLoader(false));
            if (response.success) {
                message.success(response.message);
                reloadData();
                setShowBidModal(false)
            }
        } catch (error) {
            message.error(error.message);
            dispatch(setLoader(false));
        }
    }

    return (
        <Modal
            open={showBidModal}
            onCancel={() => setShowBidModal(false)}
            centered
            width={600}
            onOk={() => formRef.current.submit()}
        >
            <div className="flex flex-col gap-5 mb-5">
                <h1 className='text-2xl font-semibold text-orange-900 text-center'>
                    Place a Bid
                </h1>

                <Form
                    layout='vertical'
                    ref={formRef}
                    onFinish={onFinish}
                >

                    <Form.Item label="Bid Amount"
                        name='bidAmount'
                        rules={rules}
                    >
                        <Input type='number' />
                    </Form.Item>



                    <Form.Item label="Message"
                        name='message'
                        rules={rules}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item label="Mobile Number"
                        name='mobileNumber'
                        rules={rules}
                    >
                        <Input type='number' />
                    </Form.Item>


                </Form>
            </div>
        </Modal>
    )
}

export default BidModal