import { createContext, useState, useContext, useReducer, useEffect } from "react";
import {
    doc,
    collection, 
    addDoc,
    setDoc,
    getDocs,
    deleteDoc,
    updateDoc,
    onSnapshot,
    getDoc,
    query,
    where
} from "firebase/firestore"

import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithCredential, signInWithEmailAndPassword, SignInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { auth } from "./fireBaseInit";

import { db } from "./fireBaseInit";

// create a context 
const buyBusyContext = createContext();

// create custom hook 
function useValue(){
    const value = useContext(buyBusyContext);
    return value;
}


function CustomBuyBusyProvider({children}){
// product context 
    const [isLoading, setIsLoading] = useState(true);
    const [Data, setData] = useState(null);
    const [range, setRange]= useState(0);
    const [selected, setSelected] = useState([]);
    const [search, setSearch] = useState("");
    const [cartData, setCartData] = useState([]);
    const [qunatity, setQuantity] = useState("");
    const [total, setTotal] = useState(0);
    const [cartLoading, setcartLoading] = useState(true);
    const [orderLoading, setOrderLoading] = useState(true);

// login context 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(null);
    const auth = getAuth();

    
    useEffect(()=> {
        const Unsubscribe = onAuthStateChanged(auth, (user)=> {
            if(user) {
                setUserLoggedIn(user.uid);
                setIsLoggedIn(true);
            }
            else{
                setUserLoggedIn(null);
                setIsLoggedIn(false);
            }
        });
        return () => Unsubscribe();

    }, [auth]);
    
    const signUp = async (data) => {
        try {
            await createUserWithEmailAndPassword(auth, data.Email, data.Password);
            const user = auth.currentUser;
            
            await updateProfile(user, {
                name : data.Name
            })
            
            await setDoc(doc(db , "userInfo", user.uid), {
                name: data.Name,
                email: user.email,
                password: data.Password,
            })

        }
        catch(err){
            console.log(err);
        }
    } 
    
    // const navigate = useNavigate();
    const signIn = async(data) => {
        try{
           await signInWithEmailAndPassword(auth, data.email, data.password);
           setUserLoggedIn(auth.currentUser.uid);
           setIsLoggedIn(true);
           return true;
        }
        catch(error) {
            console.log(error);
            return false;
        }
    }

    function logOut(){
        signOut(auth)
            .then(()=> {
                setIsLoggedIn(false);
                setUserLoggedIn(null);
                console.log("sign out successful");
            })
            .catch((error) => {
                console.log(error);
            })
    }

// product context
    function handleSort(newRange){
        setRange(newRange);
    }

    function handleCheckbox(category){
        const update = selected.includes(category)
        ? selected.filter((element)=> element !== category)
        : [...selected, category];
        setSelected(update);
    }

    function handleSearch(value){
        setSearch(value);
    }

    function filterData() {
        let filteredData = Data;
        if(range > 0){
            filteredData = filteredData.filter(prod => prod.price <= range);
        }
        if(selected.length > 0){
            filteredData = filteredData.filter(prod => selected.includes(prod.category))
        }
        if(search.length > 0){
            filteredData = filteredData.filter(prod => prod.title.toLowerCase().includes(search))
        }
        return filteredData;
    }

// cart js used files 
    // useEffect(()=>{
    //     const fetchData = async() => {
    //         // console.log(userLoggedIn);
    //         if(cartLoading){
    //             setTimeout(()=>{
    //                 setcartLoading(false);
    //             }, 500)
    //         }
    //     }
    //     return ()=> fetchData();
    // }, [cartLoading]);

    useEffect(() => {
        const cartQuery = query(collection(db, "cart"), where('user', '==', userLoggedIn));

        const unsubscribe = onSnapshot(cartQuery, (snapShot)=>{
            const Data = snapShot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            // setTotal(0);
            setCartData(Data);
            setcartLoading(false);
            // console.log(cartData);

            const totalPrice = cartData.reduce((total, item)=> total+item.qty* item.product.price, 0)
            setTotal(totalPrice)
        })
        return () => unsubscribe();
    }, [userLoggedIn, cartData]); // Include userLoggedIn in the dependency array

    const addToCart = async(product) =>{
        if(!isLoggedIn){
            return;
        }
        try{
            // console.log(product.id);
            const existingItemIndex = cartData.findIndex((item) => item.product.id === product.id);
            // console.log(existingItemIndex);
            if(existingItemIndex !== -1){
                const existingItem = cartData[existingItemIndex];
                const update = existingItem.qty +1;
                const itemRef = doc(collection(db, "cart"), existingItem.id);

                await updateDoc(itemRef, {
                    qty: update
                });
            }
            else{
                await addDoc(collection(db, "cart"), {
                    user: userLoggedIn,
                    product: product,
                    qty : 1,
                })
            }
        }
        catch(err){
            console.log(err);
        }
    }

    const removeFromCart = async (id) =>{
        try {
            const docRef = doc(collection(db, "cart"), id);
            // console.log(get);
            await deleteDoc(docRef);
        }
        catch(error){
            console.log(error);
        }
    }

    const IncreaseQty = async(id) => {
        try{
            const itemRef = doc(collection(db, "cart"), id);
            const itemSnapshot = await getDoc(itemRef);
            const currentItem = itemSnapshot.data();

            const updateQty = currentItem.qty + 1;

            await updateDoc(itemRef, {
                qty: updateQty
            });
        }
        catch(error){
            console.log(error);
        }
    }

    const decreaseQty = async(id) => {
        try{
            const itemRef = doc(collection(db, "cart"), id);
            const itemSnapshot = await getDoc(itemRef);
            const currentItem = itemSnapshot.data();
            if(currentItem.qty === 1){
                return;
            }
            const updateQty = currentItem.qty - 1;

            await updateDoc(itemRef, {
                qty: updateQty
            });
        }
        catch(error){
            console.log(error);
        }
    }


    // function to create order here 
    const handleOrder = async()=>{
        try{
            await addDoc(collection(db, "orders"), {
                cartItems: cartData,
                total: total,
                user: userLoggedIn,
                createdAt: new Date()
            });
            const cartQuery = query(collection(db, "cart"), where('user', "==", userLoggedIn))
            const cartSnapshot = await getDocs(cartQuery);

            cartSnapshot.forEach(async(doc)=> {
                await deleteDoc(doc.ref);
            })
            setTotal(0);
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <buyBusyContext.Provider value={{isLoading, setIsLoading, 
                                        Data, setData, 
                                        range, setRange, 
                                        handleSort, 
                                        selected, 
                                        handleCheckbox, 
                                        filterData ,
                                        search , setSearch, 
                                        handleSearch,
                                        isLoggedIn, setIsLoggedIn,
                                        signUp,
                                        signIn,
                                        userLoggedIn, setUserLoggedIn,
                                        logOut,
                                        addToCart,
                                        cartData, setCartData,
                                        qunatity, setQuantity,
                                        total, setTotal,
                                        cartLoading, setcartLoading,
                                        removeFromCart,
                                        IncreaseQty,
                                        decreaseQty,
                                        handleOrder,
                                        orderLoading, setOrderLoading
                                        }}>
            {children}
        </buyBusyContext.Provider>
    )
}

export {buyBusyContext, useValue}
export default CustomBuyBusyProvider;