import { Button, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import ProductFormLayout from "./ProductFormLayout";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../redux/loadersSlice";
import { deleteProduct, getAllProducts } from "../../apicalls/products";
import { useNavigate } from "react-router-dom";
import Bids from "./Bids";

const Products = () => {
    const [showBids, setShowBids] = useState(false)
    const { user } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [showProductsForm, setShowProductsForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const getData = async () => {
        try {
            dispatch(setLoader(true));
            const response = await getAllProducts({
                seller: user._id
            });
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
    const deleteTheProduct = async (record) => {
        try {
            dispatch(setLoader(true));
            const response = await deleteProduct(record._id);
            if (response.success) {
                dispatch(setLoader(false));
                message.success(response.message);
                getData();
            }
            else {
                throw new Error(response.message);
            }
        } catch (error) {
            dispatch(setLoader(false));
            message.error(error.message);

        }
    }

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Description",
            dataIndex: "description"
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
            dataIndex: "status"
        },
        {
            title: "Action",
            render: (text, record) => {
                return (<div className="flex gap-5">
                    <i className="ri-delete-bin-line re-icons"
                        onClick={async () => deleteTheProduct(record)}
                    ></i>
                    <i className="ri-pencil-line re-icons"
                        onClick={() => {
                            setSelectedProduct(record);
                            setShowProductsForm(true);
                        }}
                    ></i>

                    <span className="underline cursor-pointer"
                        onClick={() => {
                            setSelectedProduct(record);
                            setShowBids(true)
                        }}
                    >
                        Show Bids
                    </span>
                </div>)

            }
        },

    ];






    useEffect(() => {
        getData();
    }, [])

    return (
        <div >
            <div className="flex justify-end mb-2">
                <Button type="default"
                    onClick={() => {
                        setSelectedProduct(null)
                        setShowProductsForm(true)
                    }}
                >Add Product</Button>

            </div>

            <Table columns={columns} dataSource={products} />

            {showProductsForm && <ProductFormLayout
                showProductsForm={showProductsForm}
                setShowProductsForm={setShowProductsForm}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                getData={getData}
            />}

            {
                showBids && (
                    <Bids
                        showBidsModal={showBids}
                        setShowBidsModal={setShowBids}
                        selectedProduct={selectedProduct}
                    />
                )
            }

        </div>
    );
};


export default Products;
