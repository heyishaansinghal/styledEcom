import React from 'react'
import { ProductStyle } from '../styles/ProductStyle'
import Link from 'next/link'

export default function Product({product}) {
    const {name , slug , price , image} = product.attributes
    const imageUrl  = image.data.attributes.formats.small.url
  return (
    <ProductStyle>
      <Link href={`/product/${slug}`}>
        <div>
          <img src={imageUrl}></img>
        </div>
        </Link>
        <div>
            <h2>{name}</h2>
            <h3>{price}</h3>
        </div>
    </ProductStyle>
  )
}
