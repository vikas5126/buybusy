import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./styles/SignIn.module.css"
import { useRef } from "react";
import { useValue } from "../buyBusyContext";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../fireBaseInit";

function SignIn(){
    const {signIn, loggedIn} = useValue();

    const userEmail = useRef();
    const userPassword = useRef();

    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        const data = {
            email : userEmail.current.value,
            password: userPassword.current.value
        }

        await signIn(data);
        // console.log(status);
        navigate("/") 
    }
    return (
        <div>
            <h1 className={styles.h1}>Sign In</h1>
            <form className={styles.container} onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="xyz@gmail.com" ref={userEmail} className={styles.input} required/>
                <input type="password" name="password" placeholder="anything you want" ref={userPassword} className={styles.input}/>
                <button value="submit" className={styles.submit}>Submit</button>
                <NavLink to="/SignUp">
                <p className={styles.link}>or Sign Up instead</p>
                </NavLink>
            </form>
        </div>
    )
}

export default SignIn;