import { Col, Form, Input, Row, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '../../redux/loadersSlice'
import { addProduct, editProduct } from '../../apicalls/products'
import { useNavigate } from 'react-router-dom';


const rules = [
    {
        required: true,
        message: "Required"
    }
]

const additionalThings = [
    {
        label: "Bill available",
        name: "billAvailable",
        key: "100"
    },
    {
        label: "Warranty available",
        name: "warrantyAvailable",
        key: "200"
    },
    {
        label: "Accessories available",
        name: "accessoriesAvailable",
        key: "300"
    },
    {
        label: "Box available",
        name: "boxAvailable",
        key: "400"
    },
]

const ProductForm = ({ formRef,
    selectedProduct,
    setSelectedProduct,
    getData }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);
    const onFinish = async (values) => {
        try {

            dispatch(setLoader(true));
            let response = null;
            if (selectedProduct) {
                response = await editProduct(selectedProduct._id, values);
            }
            else {
                values.seller = user._id;
                values.status = "pending";
                response = await addProduct(values);

            }
            if (response.success) {
                dispatch(setLoader(false));
                message.success(response.message);
                getData();
                navigate('/profile');
            }
            else {
                throw new Error(response.message)
            }
        } catch (error) {
            dispatch(setLoader(false));
            message.error(error.message);
            navigate('/profile');

        }
    }
    useEffect(() => {
        if (selectedProduct) {
            formRef.current.setFieldsValue(selectedProduct);
        }

    }, [])
    return (
        <div>
            <h1 className="text-primary text-xl text-center">
                {selectedProduct ? selectedProduct.name : "Add  product"}
            </h1>
            <Form layout='vertical'
                ref={formRef}
                onFinish={onFinish}
            >

                <Form.Item
                    label="Name"
                    name="name"
                    rules={rules}
                    key="1"
                >
                    <Input type="text" />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={rules}
                    key="2"
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
                            key="3"
                        >

                            <Input type='number' />
                        </Form.Item>

                    </Col>

                    <Col span={8}>
                        <Form.Item
                            label="Category"
                            name="category"
                            rules={rules}
                            key="4"
                        >

                            <select
                                style={{ backgroundColor: "white" }}
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
                                <option value="home">
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
                            key="5"
                        >

                            <Input type='number' />
                        </Form.Item>

                    </Col>

                </Row>

                <div className="flex gap-10">
                    {
                        additionalThings.map((item) => {
                            return (
                                <Form.Item
                                    label={item.label}
                                    name={item.name}
                                    valuePropName='checked'
                                    key={item}
                                >
                                    <Input type='checkbox'
                                        onChange={(e) =>
                                            formRef.current.setFieldsValue({
                                                [item.name]: e.target.checked
                                            })
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