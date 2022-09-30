import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { Button, Typography } from '@mui/material';
import NewUserFormComponent from './newuserform';
import UserApi from '../api/userapi';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

export default function AddNewUserComponent(props) {

    const userApi = new UserApi();
    const [role, setRole] = useState('');
    const handleChange = (event) => {
        setRole(event.target.value);
    };

    async function addUser (formState) {
        const request = {
            name: formState.name + " " + formState.surname,
            primaryEmail: formState.email,
            username: formState.username,
            type: role
        };
        const response = (await userApi.addUser(request)).data;
        props.setResponse(response);
        toast.success("Kullanıcı başarıyla eklendi.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
    }

    return (
        <Box sx={{ minWidth: 120 }}>
            {props.response ? <div><Typography>Kullanıcı şifresi: {props.response}</Typography> 
            <Button sx={{float: "right"}} onClick={() => {props.setOpen(false)}}>
                Kapat</Button></div>: 
            <div><FormControl variant="standard" fullWidth>
            <InputLabel id="user-role-select">Kullanıcı Rolü</InputLabel>
            <Select
            labelId="user-role-select-label"
            id="user-role-select"
            value={role}
            label="role"
            onChange={handleChange}
            >
            <MenuItem value={"ADMIN"}>Admin</MenuItem>
            <MenuItem value={"STUDENT"}>Öğrenci</MenuItem>
            <MenuItem value={"LECTURER"}>Öğretim Görevlisi</MenuItem>
            <MenuItem value={"ASSISTANT"}>Asistan</MenuItem>
            </Select>
        </FormControl>
        <NewUserFormComponent role={role} submit={addUser} />
        <Button sx={{float: "right"}} onClick={() => {props.setOpen(false)}}>İptal</Button></div>}
        
        </Box>
        
    );
}