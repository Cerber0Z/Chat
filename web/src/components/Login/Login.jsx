import React, { useState } from "react";
import axios from "axios";
import md5 from "md5";
import Cookies from "universal-cookie";
import styles from "./Login.module.css";
import { HiMail as Mail } from "react-icons/hi";
import { RiLockPasswordFill as Pw } from "react-icons/ri";
import { SiGmail as Gm } from "react-icons/si";
import { FaFacebookF as Fb } from "react-icons/fa";

const baseURL = "https://jsonplaceholder.typicode.com/users"; // deploy del back
const cookies = new Cookies();
const initialState = {
    form: {
        email: "",
        password: "",
    },
};

function Login() {
    const [state, setState] = useState(initialState);
    console.log(state);
    const handleChange = async (e) => {
        await setState({
            form: {
                ...state.form,
                [e.target.email]: e.target.value,
            },
        });
    };
    const login = async () => {
        await axios.get(baseURL, {
            params: {
                email: state.form.email,
                password: md5(state.form.password),
            }
                .then((response) => {
                    return response.data;
                })
                .then((response) => {
                    if (response.length > 0) {
                        var answer = response[0];
                        cookies.set("id", answer.id, { path: "/" });
                        cookies.set("username", answer.name, { path: "/" });
                        cookies.set("email", answer.email, { path: "/" });
                        cookies.set("password", answer.password, { path: "/" });
                        alert(`Bienvenido ${answer.name}`);
                        window.location.href = "../Principal/Principal.jsx";
                    } else {
                        alert("El correo o la contraseña no son válidos.");
                    }
                })
                .catch((error) => {
                    console.log(error);
                }),
        });
    };

    return (
        <div className={styles.container}>
            <div>INTOPCOL</div>
            <div className={styles.container2}>
                <div className={styles.formGroup}>
                    <br />
                    <label>
                        <Mail />
                        Correo:
                    </label>
                    <br />
                    <input
                        type="text"
                        className={styles.formControl}
                        name="email"
                        onChange={handleChange}
                    />
                    <br />
                    <br />
                    <label>
                        <Pw />
                        Contraseña:
                    </label>
                    <br />
                    <input
                        type="password"
                        className={styles.formControl}
                        name="password"
                        onChange={handleChange}
                    />
                    <br />
                    <br />
                    <button className={styles.btnLogin} onClick={() => login}>
                        Iniciar sesión
                    </button>
                    <br />
                    <br />
                    <span>OR</span>
                    <br />
                    <br />
                    <a href="">
                        <Gm /> Ingresa con Gmail
                    </a>
                    <br />
                    <a href="">
                        <Fb /> Ingresa con Facebook
                    </a>
                    <p>¿No tienes una cuenta?</p>
                    <button className={styles.btnLogin}>Regístrate</button>
                    <br />
                </div>
            </div>
        </div>
    );
}

export default Login;
