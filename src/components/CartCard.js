import styles from "./styles/CartCard.module.css"
// import data from "../data/data"
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { useValue } from "../buyBusyContext";
function CartCard(){
    const {removeFromCart, IncreaseQty, decreaseQty, cartData} = useValue();
    return (
        <div className={styles.dataContainer}>
                {cartData.map((prod, index)=>(
                    // (prod.price >= range) ? 
                    <div className={styles.cardContainer} key={index}>
                        <div className={styles.imageContainer}>
                            <img src={prod.product.image} alt={prod.product.type} className={styles.image}/>
                        </div>
                        <div className={styles.name}>
                            {(prod.product.title.length)>60 ? prod.product.title.slice(0,20)+"...." : prod.title}
                        </div>
                        <div className={styles.price}>
                            $ {prod.product.price}
                            <div className={styles.ButtonContainer}>
                                <div className={styles.plus} onClick={()=> IncreaseQty(prod.id)}>
                                <FaCirclePlus />
                                </div>
                                <div>
                                    {prod.qty}
                                </div>
                                <div className={styles.minus} onClick={()=> decreaseQty(prod.id)} >
                                    <FaCircleMinus />
                                </div>
                            </div>
                        </div>
                        <button className={styles.button} onClick={() => removeFromCart(prod.id)}>Remove From Cart</button>
                    </div>
                ))}
            </div>
    )
}

export default CartCard;