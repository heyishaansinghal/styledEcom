import React from 'react'
import { useUser } from '@auth0/nextjs-auth0';
import {FaUserCircle} from 'react-icons/fa'
import { useRouter } from 'next/router';

export default function Profile() {
    const { user, error, isLoading } = useUser();
    const route = useRouter()

    if(!user){
        return (
            <div onClick={()=>route.push("/api/auth/login")}>
                <FaUserCircle></FaUserCircle>
                <h3>Profile</h3>
            </div>
          )
    }
    else{
        return (
            <div onClick={()=>route.push("/profile")}>
                <img src={user.picture} alt={user.name} />
                <h3>{user.name}</h3>
            </div>
        )
    }
}
