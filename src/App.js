import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom"
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import MyOrder from "./pages/MyOrder";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { useValue } from "./buyBusyContext";

function App() {
  const {isLoggedIn, userLoggedIn} = useValue();
  const PrivateRoute = ({children}) =>{
    if(!isLoggedIn) return <Navigate to="/signIn"/>
    // console.log(children);
    return children;

    
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar/>,
      children:[
        {index: true, element: <Home/>},
        // {path: "/cart",
        //  element: <PrivateRoute status={isLoggedIn}>
        //   <Cart/>
        //  </PrivateRoute>},
        {path: "/cart", element: <Cart/>},
        {path: "/myorder", element: <MyOrder/>},
      //   {path: "/myorder", 
      //   element: <PrivateRoute status={isLoggedIn}>
      //   <MyOrder/>
      //  </PrivateRoute>},
        {path: "/signIn", element: <SignIn/>},
        {path: "signUp", element: <SignUp/>}
      ]
    }
  ])

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App;
