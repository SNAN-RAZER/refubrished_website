import { Tabs } from 'antd'
import Modal from 'antd/es/modal/Modal'
import React, { useEffect, useRef } from 'react'
import ProductForm from './ProductForm'
const ProductFormLayout = (
    {
        showProductsForm,
        setShowProductsForm,
        selectedProduct,
        setSelectedProduct,
        getData
    }
) => {
    
    const formRef = useRef(null);
    const items = [
        {
          key: '1',
          label: 'General',
          children: <ProductForm  
            
            formRef= {formRef} 
            selectedProduct= {selectedProduct}
            setSelectedProduct = {setSelectedProduct}
            getData={getData}
            />,
        },
        {
          key: '2',
          label: 'Images',
          children:  <h1>Images</h1>,
        },
        
      ];
  
useEffect(()=>{
    getData();
},[selectedProduct]); 
     
  return (
   <Modal 
   title=""
   open={showProductsForm}
   onCancel={()=>setShowProductsForm(false)}
   centered
   width={800}
   onOk={()=>{
    formRef.current.submit();
    setShowProductsForm(false);
   }}
  
   >

    <h1>Add  product</h1>

    <Tabs defaultActiveKey='1' items={items} />


   </Modal>
  )
}

export default ProductFormLayout