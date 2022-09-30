import { Button, TextField, Modal, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UserApi from "../api/userapi";
import ProfileTimetableComponent from "./profiletimetable";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: '5px'
};

export default function EditProfileContentComponent() {
    const userApi = new UserApi();
    const [request,setRequest] = useState({
        username: "",
        name: "",
        role: "",
        primaryEmail: "",
        secondaryEmail: "",
        phoneNumber: "",
        profilePhoto: "",
        about: "",
        address: ""
    });

    const [open, setOpen] = useState(false);
    const [file, setFile] = useState('');
    const [profilePhoto, setProfilePhoto] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetchProfile();
        fetchProfilePhoto();
    }, []); 


    async function fetchProfilePhoto() {
        const response = (await userApi.getProfilePhoto(localStorage.getItem("username"))).data;
        let url = window.URL.createObjectURL(new Blob([response]));
        setProfilePhoto(url);
    }

    async function fetchProfile() {
        const response = (await userApi.getProfile(localStorage.getItem("username"))).data;
        setRequest(response);
    }

    async function handleSubmit() {
        const response = (await userApi.updateProfile(request)).data;
        toast.success(response.message,{
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
    }

    async function handlePhotoSubmit() {
        const formData = new FormData();
        formData.append('image', file);

        const response = (await userApi.uploadProfilePhoto(localStorage.getItem("username"), formData)).data;
        handleChange();
        handleClose();
        toast.success(response.message,{
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
    }

    function handleChange(index, value) {
        const newRequest = {...request};
        switch(index) {
            case 0:
                newRequest.secondaryEmail = value;
                break;
            case 1:
                newRequest.phoneNumber = value;
                break;
            case 2:
                newRequest.about = value;
                break;
            case 3:
                newRequest.address = value;
                break;
        }
        setRequest(newRequest);
    }

    return (
        <div style={{gridColumn: 'span 3'}}>
            <Box sx={{
                width: '100%',
                height: '600px',
                backgroundColor: "#F4F6F6",
                gridColumn:"span 2",
                borderStyle: "solid #D2DADA",
                borderWidth: "1px",
                padding: 3,
                borderRadius: '3px'
            }}>
            
            {localStorage.getItem("role") === 'ADMIN' ? "" : <Box sx={{width: '75%', float: 'right'}}><ProfileTimetableComponent/></Box>}
            <Box sx={{width: '20%', marginTop: '20px'}}>
            <TextField
                sx={{marginBottom: '20px',  width: '100%'}}
                onChange={(e) => {handleChange(0,e.target.value)}}
                name="secondaryEmail"
                id="secemail"
                label="İkincil Email Adresi"
                defaultValue={request.secondaryEmail}
                value={request.secondaryEmail}
            />
            <TextField
                sx={{marginBottom: '20px',  width: '100%'}}
                onChange={(e) => {handleChange(1,e.target.value)}}
                name="phoneNumber"
                id="phonenumber"
                label="Telefon Numarası"
                defaultValue={request.phoneNumber}
                value={request.phoneNumber}
            />
            <TextField
                sx={{marginBottom: '20px',  width: '100%'}}
                onChange={(e) => {handleChange(2,e.target.value)}}
                multiline
                minRows={3}
                name="about"
                id="about"
                label="Hakkında"
                defaultValue={request.about}
                value={request.about}
            />
            <TextField
                sx={{marginBottom: '20px',  width: '100%'}}
                onChange={(e) => {handleChange(3,e.target.value)}}
                multiline
                minRows={3}
                name="address"
                id="address"
                label="Adres"
                defaultValue={request.address}
                value={request.address}
            />
            
            <Button variant="contained" sx={{marginBottom: '20px', width: '100%'}}onClick={handleSubmit} >Profili Düzenle</Button>
            <Button variant="contained" sx={{marginBottom: '20px', width: '100%'}}onClick={handleOpen}>Profil Fotoğrafı</Button>
            </Box>
            </Box>
            
            

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Box
                    component="form"
                    sx={{
                      marginTop   : "20px",
                    }}>
                    <img src={profilePhoto} width='150px'/>
                    <input type="file" onChange={(e) => {setFile(e.target.files[0])}}/>
                    <Button onClick={handlePhotoSubmit}>Yükle</Button>
                    </Box>
                </Box>
            </Modal>

        </div>
    );
}