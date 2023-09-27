import { Button, Upload, message } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { setLoader } from '../../redux/loadersSlice';
import { editProduct, uploadProductImage } from '../../apicalls/products';




const Images = ({
  selectedProduct,
  setSelectedProduct,
  getData,
  setShowProductsForm
}) => {
  const [showPreview = false, setShowPreview] = useState(true);
  const dispatch = useDispatch();
  const [file = null, setFile] = useState(null);
  const [images = [], setImages] = useState(selectedProduct.images);

  const upload = async () => {
    try {
      dispatch(setLoader(true));
      // Upload Image to cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('productId', selectedProduct._id);
      const response = await uploadProductImage(formData);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        setImages([...images, response.data])
        getData();
        setShowPreview(false);

      }
      else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  }

  const deleteImage = async (image) => {
    try {
      dispatch(setLoader(true));
      const updatedImagesArray = images.filter(img => img !== image);
      const updatedProduct = { ...selectedProduct, images: updatedImagesArray };
      const response = await editProduct(
        selectedProduct._id,
        updatedProduct);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        setImages(updatedImagesArray);
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


  return (
    <div>

      <div className="flex gap-5 mb-5">
        {
          images.map(image => {
            return (
              <div className="flex gap-2 border border-solid border-gray-500 rounded p-5 items-end">
                <img className="h-20 w-20 object-cover"
                  src={image}
                  alt=""
                />
                <i className="ri-delete-bin-line re-icons"
                  onClick={() => {
                    deleteImage(image)
                  }}
                ></i>


              </div>
            )
          }
          )
        }
      </div>

      <Upload
        listType='picture'
        beforeUpload={() => false}
        onChange={(info) => {
          setFile(info.file);
          setShowPreview(true)
        }}
        showUploadList={showPreview}
      >
        <Button type="dashed">
          Upload Image
        </Button>
      </Upload>




      <div className="flex justify-end gap-5 mt-5">
        <Button
          type="default"
          onClick={() => {
            setShowProductsForm(false)
          }}
        >
          Cancel
        </Button>
        <Button
          type="default"
          onClick={() => {

            upload()
          }}
          disabled={!file}
        >
          Upload
        </Button>
      </div>
    </div>
  )
}

export default Images