import React from 'react'
import { PRODUCT_DETAILS_QUERY } from '../../lib/query'
import { useRouter } from 'next/router'
import { useQuery } from 'urql'
import { DetailProduct  , DescriptionStyle , Quantity , Buy} from '../../styles/DetailProduct'
import {AiFillPlusCircle , AiFillMinusCircle} from 'react-icons/ai'
import { useContext } from 'react'
import ShopContext from '../../lib/Context'
import { useEffect } from 'react'
import toast from "react-hot-toast"

const {motion} = require("framer-motion")

export default function Product() {

  const {qty , increaseQty , decreaseQty , onAdd , setQty} = useContext(ShopContext)

  const {query} = useRouter()

  useEffect(()=>{
    setQty(1)
  },[])

  const [results] = useQuery({
    query:PRODUCT_DETAILS_QUERY,
    variables: query
});

  const {data , fetching , error} = results

  const notify = ()=>{
    toast.success(`${name} added to cart Yay!!!`,{duration : 1200})
  }

  if(fetching) return <p>Loading ....</p>
  if(error) return <p>Oh Crap Some Error Occured {error.message}</p>

  const {name,price,description,image} = data.products.data[0].attributes
  const imageUrl  = image.data.attributes.formats.small.url
  return (
    <DetailProduct>
        <img src={imageUrl} alt={name}></img>
        <DescriptionStyle>
            <h2>{name}</h2>
            <p>{description}</p>
            <h3>${price}</h3>
        <Quantity>
          <span>Quantity</span>
          <button onClick={decreaseQty}><AiFillMinusCircle/></button>
          <p>{qty}</p>
          <button onClick={increaseQty}><AiFillPlusCircle/></button>
        </Quantity>
        <Buy onClick={()=>{
          onAdd(data.products.data[0].attributes,qty)
          notify()
          }}>Add to Cart</Buy>
        </DescriptionStyle>
    </DetailProduct>
  )
}
