import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../redux/loadersSlice';
import { Divider, message } from 'antd';
import { getAllProducts } from '../../apicalls/products';
import { useNavigate } from 'react-router-dom';
import Filters from './Filters';

const Home = () => {

  const [showFilters, setShowFilters] = useState(true);
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    status: 'approved',
    category: [],
    age: [],
    productName: ""
  });
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      console.log(filters)
      const response = await getAllProducts(filters);
      dispatch(setLoader(false));
      if (response.success) {
        setProducts(response.products);
      }
      else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getData();
  }, [filters])


  return (
    <div className='flex gap-5'>
      {/* Filters */}
      {showFilters && <Filters
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        filters={filters}
        setFilters={setFilters}

      />}


      <div className="flex flex-col gap-5">

        <div className=" snap-center flex gap-5 items-center">
          {!showFilters && (
            <i className="ri-equalizer-line text-xl cursor-pointer"
              onClick={() => setShowFilters(true)}
            ></i>
          )}
          <input type="text"
            placeholder='Search Products here...'
            className='border border-gray-300 rounded border-solid w-full p-2 h-14'
            onChange={(e) => setFilters({
              ...filters,
              productName: e.target.value
            })}

          />


        </div>

        <div className={` content-center mt-5 grid gap-5 ${showFilters ? "grid-cols-4" : "grid-cols-5"}`}>
          {products?.map(product => {
            return (
              <div className="border border-gray-300 rounded border-solid flex  flex-col gap-3 pb2
          cursor-pointer
          "
                key={product._id}
                onClick={() => {
                  navigate(`/product/${product._id}`)
                }}
              >


                <img src={product.images[0]} alt=""
                  key={product.key}
                  className='w-full h-48 object-cover'

                />



                <div className="p-2 flex flex-col gap-1">
                  <h1 className="text-lg font-semibold">{product.name}</h1>
                  <p className="text-sm">
                    {product.age}{' '}
                    {product.age === 1 ? "Year" : "Years"} old
                  </p>
                  <Divider />
                  <span className="text-xl font-semibold text-green-700">
                    $ {product.price}
                  </span>
                </div>


              </div>
            )
          })}
        </div>
      </div>


    </div>

  )
}

export default Home;
