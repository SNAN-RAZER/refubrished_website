import { Button } from "antd";
import React, { useState } from "react";
import ProductFormLayout from "./ProductFormLayout";

const Products = () => {

    const [showProductsForm, setShowProductsForm] = useState(false);


  return (
    <div className="flex justify-end">
      <Button type="default"
      onClick={()=>setShowProductsForm(true)}
      >Add Product</Button>
      {showProductsForm && <ProductFormLayout 
    showProductsForm={showProductsForm}
    setShowProductsForm= {setShowProductsForm}
/>}
    </div>
  );
};


export default Products;
