import { CheckBox } from "@mui/icons-material";
import { FormControlLabel, FormGroup, Switch, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { RoomApi } from "../api/roomapi";

export default function AddNewClassComponent(props) {
    
    const roomApi = new RoomApi();
    const [checked, setChecked] = useState([false, false, false, false])
    const [name, setName] = useState("");
    const [capacity, setCapacity] = useState(0);
    function handleChange(index) {
        console.log(index); 
        const newChecked = [...checked];
        newChecked[index] = !checked[index];
        setChecked(newChecked);
    }

    async function submitClass() {
        const request = {
            name: name,
            projectionExists: checked[0],
            computerExists: checked[0],
            ventilationExists: checked[0],
            windowsExists: checked[0],
            capacity: capacity
        }

        const response = (await roomApi.createRoom(request)).data;
        console.log(response);
        props.setOpen(false);

    }

    return (<div style={{display: 'grid', gridTemplateColumn: '50% 40%'}}>
        <TextField
                sx={{marginBottom: '20px', gridColumn: 1, marginRight: '10px'}}
                onChange={(e) => {setName(e.target.value)}}
                required
                name="name"
                id="outlined-required"
                label="Sınıf Adı"
                defaultValue=""
            />
            <TextField
                sx={{marginBottom: '20px', gridColumn: 2}}
                onChange={(e) => {setCapacity(e.target.value)}}
                required
                type="number"
                name="name"
                id="outlined-required"
                label="Kapasite"
                defaultValue=""
            />
        <FormGroup>
            
            <FormControlLabel 
            control={<Switch checked={checked[0]} onChange={ () => {handleChange(0)}}/>} label="Projeksiyon Cihazı"/>
            <FormControlLabel 
            control={<Switch checked={checked[1]} onChange={ () => {handleChange(1)}}/>} label="Bilgisayar"/>
            <FormControlLabel 
            control={<Switch checked={checked[2]} onChange={ () => {handleChange(2)}}/>} label="Havalandırma"/>
            <FormControlLabel 
            control={<Switch checked={checked[3]} onChange={ () => {handleChange(3)}}/>} label="Pencere"/>
        </FormGroup>
        <Button variant="contained" sx={{width: '100%', gridColumn: 'span 2', marginTop: '20px'}} onClick={submitClass}>Sınıf Ekle</Button>

    </div>);
}