import React, { useState } from 'react'
import {product} from './index'
import Product from './Product'
function ProductList() {
   const [item,setItem] = useState([])
   const addCart = (id) =>{
      const order = product.filter((p)=>p.id===id)
     
     item.push(order)
     console.log(item);
   }
  return (
    <div>{product.map(item=>(
        <Product key={item.id} title={item.title} feature={item.feature} price={item.price}
        type={item.type}
        id={item.id}
        addCart={addCart}
        />
    ))}</div>
  )
}

export default ProductList