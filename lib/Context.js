import { createContext , useContext , useState } from "react";


 const ShopContext = createContext()

export const StateContext = ({children})=>{
    const [qty , setQty] = useState(1)
    const [showCart , setShowCart] = useState(false)
    const [cartItems , setCartItems] = useState([])
    const [totalQty , setTotalQty] = useState(0)
    const [totalPrice , setTotalPrice] = useState(0)

    const onAdd = (product,qty) =>{
        setTotalPrice((prevPrice)=>{
            return Math.round(Math.round(prevPrice * 100) + Math.round((product.price * qty) * 100))/100
        })

        setTotalQty((prevTotal)=>prevTotal+qty)

        const exsits = cartItems.find((e)=> e.slug === product.slug)

        if(exsits){
            setCartItems(
                cartItems.map((item)=>item.slug === product.slug ? {...exsits , qty : exsits.qty + qty} : item)
            )
        }
        else{
            setCartItems((prevCart)=>{return [...prevCart , {...product , qty : qty}]})
        }
    }

    const onRemove = (product) =>{
        
        setTotalPrice((prevPrice)=>{
            return Math.round(Math.round(prevPrice * 100) - Math.round(product.price * 100))/100
        })

        setTotalQty((prevTotal)=>prevTotal - 1)

        const exsits = cartItems.find((e)=> e.slug === product.slug)
        if(exsits.qty === 1){
            setCartItems(cartItems.filter((item)=>item.slug !== product.slug))
        }
        else{
            setCartItems(
                cartItems.map((item)=>item.slug===product.slug ? {...exsits , qty:exsits.qty -1} : item)
            )
        }
    }
    const decreaseQty = ()=>{
        setQty((prevQty) => {
            if(prevQty - 1 < 1){
                return 1
            }
            else {
                return prevQty - 1
            }
        } )
    }

    const increaseQty = ()=>{
        setQty((prevQty) => prevQty + 1 )
    }

    return(
        <ShopContext.Provider value={{qty , increaseQty , decreaseQty , onAdd , cartItems , showCart , setShowCart , onRemove , totalQty , totalPrice , setQty}}>
            {children}
        </ShopContext.Provider>
    )
}


export default ShopContext