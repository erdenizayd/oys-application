import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import { IconButton, Modal, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import EmailIcon from '@mui/icons-material/Email';
import UserApi from "../api/userapi";
import { toast } from "react-toastify";
import MessageContext from "../context/messagecontext";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '5px'
};

function HeaderComponent() {

    const {newMessage, setNewMessage} = useContext(MessageContext);
    let navigate = useNavigate();
    const [anchorElP, setAnchorElP] = useState(null);
    const userApi = new UserApi();
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClosePopup = () => setOpen(false);

    const handleHomepage = () => navigate("/");
    
    const handleProfile = (event) => {
        setAnchorElP(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorElP(null);
    };

    const handleMyProfile = () => {
        navigate("/usersList/" + localStorage.getItem("username"));
    };

    const handleEdit = () => {
        navigate("/editProfile")
    }

    const handlePassword = () => {
        handleClose();
        handleOpen();
    }

    const handleLogOut = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("isConnected");

        navigate("/login");
    };

    const handleChat = () => {
        setNewMessage(false);
        navigate("/messages");
    }
    
    async function handleSubmit() {
        const request = {
            password: password,
            newPassword: newPassword
        };

        const response = (await userApi.changePassword(request)).data;
        console.log(response.message);

        if(response.response === 'SUCCESS') {
            handleClosePopup();
            toast.success(response.message, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        else {
            toast.error(response.message, {
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
        <div className="header">
            <Button onClick={handleHomepage} className="logo" sx={{
                textTransform: 'none',
                fontSize: "100%"
                
            }}>YOKÜ Öğrenci Yönetim Sistemi</Button>
            <IconButton aria-controls="menu-profile"  color="inherit" className="profile" onClick={handleProfile} sx={{
                textTnansform: 'none',
                fontSize: "100%",
                
            }}><AccountCircle/></IconButton>
            
            <Menu id="menu-profile" 
                anchorEl={anchorElP} 
                anchorOrigin={{
                  vertical: 'bottom',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                    }}
                open={Boolean(anchorElP)}
                onClose={handleClose}>
                    <MenuItem onClick={handleMyProfile}>Profili Görüntüle</MenuItem>
                    <MenuItem onClick={handleEdit}>Profili Düzenle</MenuItem>
                    <MenuItem onClick={handlePassword}>Şifreyi Değiştir</MenuItem>
                    <MenuItem onClick={handleLogOut}>Çıkış Yap</MenuItem>

            </Menu>

            <IconButton color="inherit" className="messages" onClick={handleChat} sx={{
                textTransform: 'none',
                fontSize: "100%",
            }}><EmailIcon sx={(newMessage ? {color: "#2F9C95"} : "")}/></IconButton>

            <Modal
                open={open}
                onClose={handleClosePopup}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Box
                    component="form"
                    sx={{
                        marginTop: '20px'
                    }}>
                        <TextField 
                            sx={{width: '100%'}}
                                type="password" 
                                id="password" 
                                label="Eski Şifre" 
                                variant="standard" 
                                onChange={(e) => {setPassword(e.target.value)}}/>
                        <TextField 
                            sx={{width: '100%', marginTop:'10px', marginBottom:'20px'}}
                                type="password" 
                                id="newPassword" 
                                label="Yeni Şifre" 
                                variant="standard" 
                                onChange={(e) => {setNewPassword(e.target.value)}}/>
                        <Button sx={{width: '100%', marginBottom: '30px'}} variant="contained" onClick={handleSubmit}>Şifreyi Değiştir</Button>
                    </Box>
                </Box>
            </Modal>
                 
        </div>
    );
}

export default HeaderComponent;