import Stripe  from "stripe"

import {getSession} from "@auth0/nextjs-auth0"

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`)
export default async function handler (req,res){
    const getUser = getSession(req,res)
    const user = getUser?.user
    try {
        if(user){
            const stripeId = user["http://localhost:3000/stripe_customer_id"]
            const session = await stripe.checkout.sessions.create({
                submit_type : 'pay',
                mode : 'payment',
                customer : stripeId,
                payment_method_types : ['card'],
                shipping_address_collection : {
                    
                },
                allow_promotion_codes : true,
                shipping_options : [{shipping_rate : "shr_1LojRLSHrqrWTYpXr0egedHV"},{shipping_rate : "shr_1LojYtSHrqrWTYpXsjSQV1MI"}],
                line_items : req.body.map((item)=>{
                    return {
                        price_data : {
                            currency : 'usd',
                            product_data : {
                                name : item.name,
                                images : [item.image.data.attributes.formats.thumbnail.url],
                            },
                            unit_amount : item.price * 100
                        },
                        quantity : item.qty,
                        adjustable_quantity : {
                            enabled : true,
                            minimum : 1,
                        },
                    }
                }),
                success_url : `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
                cancel_url : `${req.headers.origin}/cancel`
            })
            res.status(200).json(session)
        }
        else{
            const session = await stripe.checkout.sessions.create({
                submit_type : 'pay',
                mode : 'payment',
                payment_method_types : ['card'],
                shipping_address_collection : {
                    
                },
                allow_promotion_codes : true,
                shipping_options : [{shipping_rate : "shr_1LojRLSHrqrWTYpXr0egedHV"},{shipping_rate : "shr_1LojYtSHrqrWTYpXsjSQV1MI"}],
                line_items : req.body.map((item)=>{
                    return {
                        price_data : {
                            currency : 'usd',
                            product_data : {
                                name : item.name,
                                images : [item.image.data.attributes.formats.thumbnail.url],
                            },
                            unit_amount : item.price * 100
                        },
                        quantity : item.qty,
                        adjustable_quantity : {
                            enabled : true,
                            minimum : 1,
                        },
                    }
                }),
                success_url : `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
                cancel_url : `${req.headers.origin}/cancel`
            })
            res.status(200).json(session)
        }
    } catch (error) {
        res.status(error.statusCode || 500).json(error.message)
    }
}