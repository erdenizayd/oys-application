import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import UserApi from "../api/userapi";
import ProfilePageTimetableComponent from "./profilepagetimetable";

export default function ProfileConcentComponent(props) {
    const userApi = new UserApi();
    const [request,setRequest] = useState({
        username: "",
        name: "",
        role: "",
        primaryEmail: "",
        secondaryEmail: "",
        phoneNumber: "",
        about: "",
        address: ""
    });

    const [profilePhoto, setProfilePhoto] = useState('');

    useEffect(() => {
        fetchProfile();
        fetchProfilePhoto();
    }, []); 

    async function fetchProfilePhoto() {
        try {
            const response = (await userApi.getProfilePhoto(props.username)).data;
            let url = window.URL.createObjectURL(new Blob([response]));
            setProfilePhoto(url);
        }
        catch(e) {
            
        }
    }

    async function fetchProfile() {
        const response = (await userApi.getProfile(props.username)).data;
        setRequest(response);
    }



    return (
        <div style={{gridColumn: 'span 3', padding:'20px', display: 'grid', gridTemplateColumns: '23% 2% 75%'}}>
            <Box sx={{
                gridColumn: '1', 
                backgroundColor: "#F4F6F6",
                borderStyle: "solid #D2DADA",
                borderWidth: "1px",
                padding: 3,
                borderRadius: '3px'
            }}>
            {profilePhoto === '' ? "" :<Box sx={{padding: '5px', marginBottom: '10px'}}><img src={profilePhoto} width='100%'/> </Box>}
            <div style={{marginBottom: '10px'}}><Typography sx={{color: '#2F9C95'}} display="inline">İsim: </Typography>{request.name}</div>
            <div style={{marginBottom: '10px'}}><Typography sx={{color: '#2F9C95'}} display="inline">Kullanıcı Adı: </Typography>{request.username}</div>
            <div style={{marginBottom: '10px'}}><Typography sx={{color: '#2F9C95'}} >Hakkında: </Typography>{request.about}</div>
            <div style={{marginBottom: '10px'}}><Typography sx={{color: '#2F9C95'}} display="inline">Birincil E-Mail Adresi: </Typography>{request.primaryEmail}</div>
            <div style={{marginBottom: '10px'}}><Typography sx={{color: '#2F9C95'}} display="inline">İkincil E-Mail Adresi: </Typography>{request.secondaryEmail}</div>
            <div style={{marginBottom: '10px'}}><Typography sx={{color: '#2F9C95'}} display="inline">Telefon Numarası: </Typography>{request.phoneNumber}</div>
            <div style={{marginBottom: '10px'}}><Typography sx={{color: '#2F9C95'}} >Adres: </Typography>{request.address}</div>
            </Box>
            <Box sx={{gridColumn: '3', backgroundColor: "#F4F6F6",
                borderStyle: "solid #D2DADA",
                borderWidth: "1px",
                padding: 3,
                borderRadius: '3px'}}>
            <ProfilePageTimetableComponent username={props.username} role={request.role} />
            </Box>
        </div>
    );
}