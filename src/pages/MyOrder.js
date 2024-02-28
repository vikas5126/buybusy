import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../fireBaseInit";
import { useValue } from "../buyBusyContext";
import { PacmanLoader } from "react-spinners";
import styles from "./styles/MyOrder.module.css"
import OrderTable from "../components/OrderTable";

function MyOrder(){
    const [orders, setOrders] = useState([]);

    const {userLoggedIn, orderLoading, setOrderLoading} = useValue();

    useEffect(()=> {
        try{
            const orderQuery = query(collection(db, "orders"), where('user', '==', userLoggedIn));
            const unsubscribe = onSnapshot(orderQuery, (snapShot) =>{
                const orderData= snapShot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setOrders(orderData);
                setOrderLoading(false);
            })

            return ()=> unsubscribe();
        }
        catch(err){
            console.log(err);
        }
    })
    return (
        <div>
            {orderLoading ? <PacmanLoader 
                        color="#36d7b7" 
                        className={styles.spinner}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"/> : (
                            <>
                            <h1 style={{margin:"2rem", textAlign:"center", color:" #7064E5"}}>{orders.length === 0 ? "You have no orders still!" : "Your Orders"}</h1>
                            {orders.length > 0 && orders.map((order, i) => (
                                <OrderTable key={i} order={order}/>
                            ))}
                            </>
                            )
            }
        </div>
    )
}

export default MyOrder;