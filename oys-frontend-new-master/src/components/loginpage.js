import { useContext, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { LoginApi } from "../api/loginapi";
import { Link, useNavigate } from "react-router-dom";
import RoleContext from "../context/rolecontext";
import { toast } from "react-toastify";

function LoginComponent() {

    const loginApi = new LoginApi();
    const [valFirst, setValFirst] = useState('');
    const [valSecond, setValSecond] = useState('');
    const {setRole} = useContext(RoleContext);

    let navigate = useNavigate();
    async function handleClick() {
        try{
            const response = (await loginApi.login(valFirst, valSecond)).data;
            localStorage.setItem("username",response.username);
            localStorage.setItem("role",response.role);
            localStorage.setItem("isLoggedIn","true");
            setRole(response);
            navigate('/');
        }
        catch(error) {
            console.log(error.message);
            toast.error("Hatalı giriş.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }

    return (
        <Box sx={{
            padding: 2,
            margin: '100px 0 200px 0',

        }}>
        <div className="loginBox">
            <Typography>Giriş Yap</Typography>
            <div><TextField 
            sx={{width: '100%', marginTop:'10px'}}
                id="username" 
                label="Kullanıcı Adı" 
                variant="standard" 
                value={valFirst} 
                onChange={(e) => setValFirst(e.target.value)}/>
            </div>
            <div><TextField 
            sx={{width: '100%', marginTop:'10px'}}
                type="password" 
                id="password" 
                label="Şifre" 
                variant="standard" 
                value={valSecond} 
                onChange={(e) => setValSecond(e.target.value)}/>
            </div>
            <div><Button sx={{width: '100%', marginTop:'30px'}}variant="contained" onClick={handleClick}>Giriş Yap</Button></div>
            
        </div>
        </Box>
    );
}

export default LoginComponent;