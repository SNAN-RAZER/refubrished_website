import { Col, Form, Input, Row, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../redux/loadersSlice'
import { addProduct } from '../../apicalls/products'


const rules = [
    {
        required: true,
        message: "Required"
    }
]

const additionalThings = [
    {
        label:"Bill available",
        name:"billAvailable"
    },
    {
        label:"Warranty available",
        name:"warrantyAvailable"
    },
    {
        label:"Accessories available",
        name:"accessoriesAvailable"
    },
    {
        label:"Box available",
        name:"boxAvailable"
    },
]

const ProductForm = ({formRef}) => {
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.user);
    const onFinish = async (values) =>{
        try {
            values.seller = user._id;
            values.status = "pending";
            dispatch(setLoader(true));
            const response =await addProduct(values);
            if(response.success)
            {
                dispatch(setLoader(false));
                message.success(response.message);

            }
            else{
                throw new Error(response.message);
            }
        } catch (error) {
            dispatch(setLoader(false));
            message.error(error.message);
           
        }
    }
    return (
        <div>
            <Form layout='vertical' 
            ref={formRef}
            onFinish={onFinish}
            >

                <Form.Item
                    label="Name"
                    name="name"
                    rules={rules}
                >
                    <Input type="text" />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={rules}
                >
                    <TextArea type="text" />
                </Form.Item>

                <Row 
                gutter={16}
                >
                    <Col span={8}>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={rules}
                        >

                            <Input type='number' />
                        </Form.Item>

                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Category"
                            name="category"
                            rules={rules}
                        >

                            <select
                            style={{backgroundColor:"white"}}
                            >
                                <option value="">
                                    Select
                                </option>
                                <option value="electronics">
                                    Electronics
                                </option>
                                <option value="fashion">
                                    Fashion
                                </option>
                                <option value="hone">
                                    Home
                                </option>
                                <option value="sports">
                                    Sports
                                </option>
                            </select>
                        </Form.Item>

                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Age"
                            name="age"
                            rules={rules}
                        >

                            <Input type='number' />
                        </Form.Item>

                    </Col>

                </Row>  

                <div className="flex gap-10">
                    {
                        additionalThings.map((item)=>{
                            return (
                                <Form.Item 
                                label={item.label}
                                name ={item.name}
                                >
                                    <Input type='checkbox' 
                                    onChange={(e)=>
                                        formRef.current.setFieldsValue({
                                            [item.name]:e.target.checked})
                                    }
                                    value={item.name}
                                    checked={formRef.current?.getFieldValue(item.name)}
                                    />
                                </Form.Item>
                            )
                        })
                    }
                </div>

            </Form>
        </div>
    )
}

export default ProductForm