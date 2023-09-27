import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setLoader } from "../../redux/loadersSlice";
import { Button, message } from "antd";
import { getProductById } from "../../apicalls/products";
import Divider from "../../components/Divider";
import moment from "moment";
import BidModal from "./BidModal";
import { getAllBids } from "../../apicalls/bids";

const ProductInfo = () => {

  const { user } = useSelector(state => state.user);
  const [showAddNewBid, setShowAddNewBid] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await getProductById(id);
      if (response.success) {
        const bidsResponse = await getAllBids({ product: id });
        dispatch(setLoader(false));
        message.success(response.message);
        setProduct({
          ...response.product,
          bids: bidsResponse.data
        });
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    product && <div className="">
      <div className="grid grid-cols-2">
        {/* Images */}
        <div className="flex flex-col gap-5">
          <img src={product.images[selectedImageIndex]} alt=""
            className="w-96 h-96 object-cover rounded-md cursor-pointer"
          />

          <div className="flex gap-5">
            {
              product.images.map((image, index) => {
                return (
                  <img
                    className={
                      `w-20 h-20 object-cover rounded-md cursor-pointer` +
                      (
                        selectedImageIndex === index ? 'border-2 border-green-700 border-solid'
                          : ""
                      )

                    }
                    onClick={() => setSelectedImageIndex(index)}
                    src={image}
                    alt=""
                  />
                )
              })
            }
          </div>

          <div className="">

            <h1>
              Added on
            </h1>
            <span>
              {moment(product.createdAt).format("MMM D , YYYY hh:mm A")}
            </span>

          </div>

        </div>

        {/* Details */}
        <div className="flex flex-col gap-5 text-md">
          <div className="">
            <h1 className="text-2xl font-semibold  text-orange-900">{product.name}</h1>
            <span>
              {product.description}
            </span>
          </div>

          <Divider />
          <div className="">
            <h1 className="text-2xl font-semibold text-orange-900">
              Product Details
            </h1>

            <div className="flex justify-between mt-2">
              <span>Price</span>
              <span>${product.price}</span>
            </div>

            <div className="flex justify-between mt-2">
              <span>Category</span>
              <span>{product.category.toUpperCase()}</span>
            </div>

            <div className="flex justify-between mt-2">
              <span>Bill Available</span>
              <span>{product.billAvailable ? "Yes" : "No"}</span>
            </div>

            <div className="flex justify-between mt-2">
              <span>Box Available</span>
              <span>{product.boxAvailable ? "Yes" : "No"}</span>
            </div>

            <div className="flex justify-between mt-2">
              <span>Warranty Available</span>
              <span>{product.warrantyAvailable ? "Yes" : "No"}</span>
            </div>

            <div className="flex justify-between mt-2">
              <span>Accessories Available</span>
              <span>{product.accessoriesAvailable ? "Yes" : "No"}</span>
            </div>

            <div className="flex justify-between mt-2">
              <span>Purchased Year</span>
              <span>{
                moment().subtract(product.age, 'years').format("YYYY")
              } ({product.age} {product.age > 1 ? "years" : "year"} ago)</span>
            </div>

          </div>

          <Divider />
          <div className="">
            <h1 className="text-2xl font-semibold text-orange-900">
              Seller Details
            </h1>

            <div className="flex justify-between mt-2">
              <span>Name</span>
              <span>{product.seller.username.toUpperCase()}</span>
            </div>

            <div className="flex justify-between mt-2">
              <span>Category</span>
              <span>{product.seller.email}</span>
            </div>




          </div>

          <Divider />
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h1 className="text-2xl font-semibold text-orange-900">
                Bids
              </h1>
              <Button
                onClick={() => setShowAddNewBid(!showAddNewBid)}
                disabled={user._id === product.seller._id}
              >
                New Bid
              </Button>


            </div>
          </div>
          {
            product && (<div className="">

              {
                product.bids.map((bid) => {
                  return (
                    <div className="border-gray-300 border-solid p-3 rounded">
                      <div className="flex justify-between text-gray-700">
                        <span>Name</span>
                        <span>{bid.buyer.username}</span>
                      </div>
                      <div className="flex justify-between text-gray-600">
                        <span>Bid Amount</span>
                        <span>$ {bid.bidAmount} </span>
                      </div>

                      <div className="flex justify-between text-gray-600">
                        <span>Bid Place On</span>
                        <span>{" "}
                          {moment(bid.createdAt).format("MM D, YYYY hh:mm A")}
                        </span>

                      </div>
                    </div>
                  )
                })
              }

            </div>)
          }


        </div>
      </div>

      {showAddNewBid && <BidModal

        product={product}
        reloadData={getData}
        showBidModal={showAddNewBid}
        setShowBidModal={setShowAddNewBid}
      />}
    </div>
  );
};

export default ProductInfo;
