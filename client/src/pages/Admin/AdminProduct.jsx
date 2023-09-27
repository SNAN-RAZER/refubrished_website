import { Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loadersSlice";
import { getAllProducts, updateProductStatus } from "../../apicalls/products";
import moment from 'moment';
const AdminProduct = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const getData = async () => {
        try {
            dispatch(setLoader(true));
            const response = await getAllProducts(null);
            if (response.success) {
                dispatch(setLoader(false));
                message.success(response.message);
                setProducts(response.products);


            }
        } catch (error) {
            dispatch(setLoader(false));
            message.error(error.message);

        }
    }

    const onStatusUpdate = async (id, status) => {
        try {
            dispatch(setLoader(true));
            const response = await updateProductStatus(id, status);
            dispatch(setLoader(false));
            if (response.success) {
                message.success(response.message);
                getData();


            }
        } catch (error) {
            dispatch(setLoader(false));
            message.error(error.message);

        }
    }
    const columns = [
        {
            title: "Product Image",
            dataIndex: "image",
            render: (text, record) => {
                return (
                    <img src={record?.images?.length > 0 ? record.images[0] : ""}
                        className="w-20 h-20 object-cover rounded-md"
                        alt="" />
                )
            }
        },
        {
            title: "Product",
            dataIndex: "name",
        },
        {
            title: "Seller",
            dataIndex: "name",
            render: (text, record) =>
                record.seller.username

        },

        {
            title: "Price",
            dataIndex: "price"
        },
        {
            title: "Category",
            dataIndex: "category"
        },
        {
            title: "Age",
            dataIndex: "age"
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (text, record) => {
                return record.status.toUpperCase()
            }
        },
        {
            title: "Added On",
            dataIndex: "createdAt",
            render: (text, record) => {
                return moment(record.createdAt).format('MMMM Do YYYY, h:mm:ss a')
            }
        },
        {
            title: "Action",
            render: (text, record) => {

                const { status, _id } = record
                return (<div className="flex gap-5">
                    {status === 'pending' && (
                        <span
                            className="underline cursor-pointer"
                            onClick={() => onStatusUpdate(_id, "approved")}
                        > Approve
                        </span>
                    )}

                    {status === 'pending' && (
                        <span
                            className="underline cursor-pointer"
                            onClick={() => onStatusUpdate(_id, "rejected")}
                        > Reject
                        </span>
                    )}

                    {status === 'approved' && (
                        <span
                            className="underline cursor-pointer"
                            onClick={() => onStatusUpdate(_id, "blocked")}
                        > Block
                        </span>
                    )}
                    {status === 'blocked' && (
                        <span
                            className="underline cursor-pointer"
                            onClick={() => onStatusUpdate(_id, "pending")}
                        > UnBlock
                        </span>
                    )}
                </div>)

            }
        },

    ];






    useEffect(() => {
        getData();
    }, [])

    return (
        <div >


            <Table columns={columns} dataSource={products} />


        </div>
    );
};


export default AdminProduct;
