import styles from "./styles/SignUp.module.css"
import { useValue } from "../buyBusyContext";
import { useRef } from "react";
// import { useAuthValue } from "../buyBusyContext"
import { useNavigate } from "react-router-dom";

import { auth } from "../fireBaseInit";
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignUp(){
    const {signUp} = useValue();

    const userName = useRef();
    const userEmail = useRef();
    const userPass = useRef();

    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        const detail = {
            Name : userName.current.value,
            Email : userEmail.current.value,
            Password : userPass.current.value,
        }

        signUp(detail);
        navigate("/signIn");
    }
    
    return (
        <div className={styles.formContainer}>
            <h1 className={styles.h1}>Sign Up</h1>
            <form className={styles.container} onSubmit={handleSubmit}>
                <input type="name" name="name" placeholder="name" className={styles.input} ref={userName} required/>
                <input type="email" name="email" placeholder="xyz@gmail.com" className={styles.input} ref={userEmail} required/>
                <input type="password" name="password" placeholder="anything you want" className={styles.input} ref={userPass} required/>
                <button value="submit" className={styles.submit} >Submit</button>
            </form>
        </div>
    )
}

export default SignUp;