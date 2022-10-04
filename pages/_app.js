import '../styles/globals.css'
import Nav from '../components/Nav';
import { Provider , createClient } from 'urql';
import { StateContext } from '../lib/Context';
import { UserProvider } from '@auth0/nextjs-auth0';
import {Toaster} from "react-hot-toast"


function MyApp({ Component, pageProps }) {
  const client = createClient({url: process.env.NEXT_PUBLIC_BACKEND_API,});
    return (
      <UserProvider>
        <StateContext>
          <Provider value={client}>
            <Nav />
            <Toaster />
          <Component {...pageProps} />
          </Provider>
      </StateContext>
      </UserProvider>
    )
}

export default MyApp
