import styles from "./styles/Card.module.css"
// import data from "../data/data"
import { useValue } from "../buyBusyContext";
function Card({Data}){
    const {addToCart} = useValue();
    return (
        <div className={styles.dataContainer}>
                {Data().map((prod, index)=>(
                    // (prod.price >= range) ? 
                    <div className={styles.cardContainer} key={index}>
                        <div className={styles.imageContainer}>
                            <img src={prod.image} alt={prod.type} className={styles.image}/>
                        </div>
                        <div className={styles.name}>
                            {(prod.title.length)>60 ? prod.title.slice(0,20)+"...." : prod.title}
                        </div>
                        <div className={styles.price}>
                            $ {prod.price}
                        </div>
                        <button className={styles.button} onClick={() => addToCart(prod)}>Add To Cart</button>
                    </div> 
                    // : [] 
                ))}
            </div>
    )
}

export default Card;