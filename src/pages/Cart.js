import styles from "./styles/Cart.module.css"
import {
    doc,
    getDoc,
    onSnapshot,
    query,
    where,
    collection,
} from "firebase/firestore"
import { useValue } from "../buyBusyContext";
import { useEffect, useState } from "react";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithCredential, signInWithEmailAndPassword, SignInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { PacmanLoader } from "react-spinners";
import { auth } from "../fireBaseInit"
import { db } from "../fireBaseInit";
import CartCard from "../components/CartCard";

function Cart() {
    const {handleOrder, cartLoading, total} = useValue();
    // console.log(cartData);
    return (
        cartLoading ? <PacmanLoader 
                        color="#36d7b7" 
                        className={styles.spinner}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
        /> : <div className={styles.container}>
            
            <div className={styles.filterContainer}>
                <span className={styles.priceHeading}>
                    Total Price : $ {total}
                </span>
                {/* <span className={styles.price}>
                    
                </span> */}
                <span>
                    <button className={styles.purchase} onClick={handleOrder}>Purchase Cart Item</button>
                </span>
            </div>
            <div className={styles.card}>
                <CartCard />
            </div>
        </div>
    );
}

export default Cart;