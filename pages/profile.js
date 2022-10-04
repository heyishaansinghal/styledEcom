import React from 'react'
import { useRouter } from "next/router";
import styled from "styled-components";
import {withPageAuthRequired , getSession} from "@auth0/nextjs-auth0"
const stripe = require("stripe")(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`)


export const getServerSideProps = withPageAuthRequired({
    async getServerSideProps(ctx){
        console.log(ctx)
        const session = getSession(ctx.req,ctx.res)
        const stripeId = session.user[`${process.env.BASE_URL}/stripe_customer_id`]
        const paymentIntents = await stripe.paymentIntents.list({
            customer : stripeId
        })
        return {props : {orders : paymentIntents}}
    }
})

export default function Profile({user,orders}){
    const route = useRouter()
    return (
        user && (
            <div>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                {orders.data.map((order)=>{
                        return (
                            <Order key={order.id}>
                                <h1>Order Number : {order.id}</h1>
                                <h2>Amount : ${order.amount/100}</h2>
                                <h2>Reciept Email : {order.receipt_email}</h2>
                            </Order>
                        )
                    })}
                <LogoutButton onClick={()=>route.push("/api/auth/logout")}>Logout</LogoutButton>
            </div>
        )
    )
}

const Order = styled.div `
    background: white;
    margin: 2rem 0rem;
    padding: 3rem;
    color: var(--secondary);
    display: flex;
    justify-content: space-between;
    h1{
        font-size: 1rem;
    }
    h2{
        font-size: 0.8rem;
        color: var(--secondary);
    }
`

const LogoutButton = styled.button `
    padding: 15px 40px;
    border-radius: 12px;
    outline: none;
    border: none;
    cursor: pointer;
    color: white;
    background: var(--secondary);
`