import styles from "./styles/Home.module.css"
// import data from "../data/data";
import Card from "../components/Card";
import { useValue } from "../buyBusyContext";
import { useEffect } from "react";
import { PacmanLoader } from "react-spinners";


function Home(){
    const {isLoading, setIsLoading, Data, setData, range, handleSort, handleCheckbox, filterData, search, handleSearch} = useValue();

    useEffect(()=>{
        const fetchData = async () => {
            setIsLoading(true);
            try{
                const response = await fetch('https://fakestoreapi.com/products');
                const jsonData = await response.json();
                setData(jsonData);
                // console.log(jsonData);
                setTimeout(()=>{
                    setIsLoading(false);
                }, 500);
            }catch(error){
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        }

       return ()=> fetchData();
    }, []);

    
    return (
        isLoading ? <PacmanLoader 
                        color="#36d7b7"
                        className={styles.spinner}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
        /> : <div className={styles.container}>
            <div >
                <input className={styles.search} value={search} type="text" placeholder="Search By Name" onChange={(e)=> handleSearch(e.target.value)}/>
            </div>
            <div className={styles.filterContainer}>
                <div>
                    <h3 className={styles.h3} >Filter</h3> <br/>
                    <h4 className={styles.h4}>price : {range}</h4>
                    <br/>
                    <input type="range" min="0" max="1000" step="50" value={range} className={styles.range} onChange={(e)=>handleSort(parseInt(e.target.value))}/>
                </div>
                <form className={styles.formData}>
                    <h3 className={styles.h3} >Category :</h3>
                    <div className={styles.checkboxContainer} >
                        <input type="checkbox" name="men's Clothing" value="men's clothing" className={styles.check} onClick={(e)=> handleCheckbox(e.target.value)}/>
                        <label>Men's Clothing</label>
                    </div>
                    <div className={styles.checkboxContainer} >
                        <input type="checkbox" name="women's Clothing" value="women's clothing" className={styles.check} onClick={(e)=> handleCheckbox(e.target.value)}/>
                        <label>Women's Clothing</label>
                    </div>
                    <div className={styles.checkboxContainer} >
                        <input type="checkbox" name="jewelery" value="jewelery" className={styles.check} onClick={(e)=> handleCheckbox(e.target.value)}/>
                        <label>Jewelery</label>
                    </div>
                    <div className={styles.checkboxContainer} >
                        <input type="checkbox" name="electronics" value="electronics" className={styles.check} onClick={(e)=> handleCheckbox(e.target.value)}/>
                        <label>Electronics</label>
                    </div>
                </form>
            </div>
            <div className={styles.card}>
            <Card Data={filterData}/>
            </div>
        </div>
    );
}

export default Home;