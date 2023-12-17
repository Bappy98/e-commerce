import React, { useState } from 'react'
import {product} from './index'
function Product({title,type,feature,price,id,addCart}) {
    
  return (
    <div>
        <h1>{id}</h1>
        <p>{title}</p>
        <p>{feature}</p>
        <p>{type}</p>
        <p>{price}</p>
        <button className='bg-green-500' onClick={()=>addCart(id)}>add to cart</button>
    </div>
  )
}

export default Product