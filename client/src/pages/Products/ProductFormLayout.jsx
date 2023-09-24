import { Tabs } from 'antd'
import Modal from 'antd/es/modal/Modal'
import React, { useEffect, useRef, useState } from 'react'
import ProductForm from './ProductForm'
import Images from './Images'
const ProductFormLayout = (
    {
        showProductsForm,
        setShowProductsForm,
        selectedProduct,
        setSelectedProduct,
        getData
    }
) => {
    const [selectedTab="1", setSelectedTab] = useState("1");
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
          children:  <Images  
          selectedProduct={selectedProduct}
          setSelectedProduct ={setSelectedProduct}
          getData = {getData}
          setShowProductsForm = {setShowProductsForm}
          />,
          disabled: !selectedProduct?true:false,
         
          
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
   {...(selectedTab==='2' && {footer: false})}
   >

    <h1>Add  product</h1>

    <Tabs 
    defaultActiveKey='1'
   activeKey={selectedTab}
    items={items}
    onChange={(e)=>setSelectedTab(`${e}`)}
    />


   </Modal>
  )
}

export default ProductFormLayout