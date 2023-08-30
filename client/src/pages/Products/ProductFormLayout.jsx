import { Tabs } from 'antd'
import Modal from 'antd/es/modal/Modal'
import React, { useRef } from 'react'
import ProductForm from './ProductForm'

const ProductFormLayout = (
    {
        showProductsForm,
        setShowProductsForm
    }
) => {

 
    const formRef = useRef(null);
 
     
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

    <Tabs defaultActiveKey='1'>

        <Tabs.TabPane tab="General" key = "1">
            <ProductForm  formRef= {formRef}/>
        </Tabs.TabPane>
        <Tabs.TabPane  tab="Images" key = "2">
            <h1>Images</h1>
        </Tabs.TabPane>

    </Tabs>

   </Modal>
  )
}

export default ProductFormLayout