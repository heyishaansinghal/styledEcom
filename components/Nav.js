import Link from 'next/link'
import React from 'react'
import {FiShoppingBag} from 'react-icons/fi'
import { NavStyles , NavItems} from '../styles/NavStyles'
import Cart from './Cart'
import { useContext } from 'react'
import ShopContext from '../lib/Context'
import Profile from './Profile'
import styled from 'styled-components'

const {AnimatePresence,motion} = require("framer-motion")

export default function Nav() {
  const {showCart , setShowCart , totalQty} = useContext(ShopContext)
  return (
    <NavStyles>
        <Link href={"/"}>Styled.</Link>
        <NavItems>
          <Profile></Profile>
            <div onClick={()=>{setShowCart(true)}}>
              {totalQty > 0 && <motion.span initial={{scale:0}} animate={{scale:1}}>{totalQty}</motion.span>}
                <FiShoppingBag />
                <h3>Cart</h3>
            </div>
        </NavItems>
        <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </NavStyles>
  )
}
  