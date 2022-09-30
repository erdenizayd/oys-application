import { TextField, Button} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

export default function NewUserFormComponent(props) {

    String.prototype.turkishtoEnglish = function () {
        return this.replace('Ğ','g')
            .replace('Ü','u')
            .replace('Ş','s')
            .replace('I','i')
            .replace('İ','i')
            .replace('Ö','o')
            .replace('Ç','c')
            .replace('ğ','g')
             .replace('ü','u')
            .replace('ş','s')
            .replace('ı','i')
            .replace('ö','o')
            .replace('ç','c');
    };

    const [formState, setFormState] = useState({
        "name": "",
        "surname" : ""
    });

    function isValue() {
        if((props.role === 'LECTURER') || (props.role === 'ASSISTANT')) {
            return (<TextField
                disabled
                onChange={onFormChange}
                required
                defaultValue={formState['name'].toLowerCase().turkishtoEnglish() + "." 
                + formState['surname'].toLowerCase().turkishtoEnglish()}
                value={formState['name'].toLowerCase().turkishtoEnglish() + "." + formState['surname'].toLowerCase().turkishtoEnglish()}
                name="username"
                id="outlined-required"
                label="Kullanıcı Adı"
            />);
        }
        else return (<TextField
            onChange={onFormChange}
            required
            name="username"
            id="outlined-required"
            label="Kullanıcı Adı"
        />);
    }

    function onFormChange(event) {

        const name = event.target.name;
        const value = event.target.value;
        const newState = {...formState};
        newState[name] = value;
        if((props.role === 'LECTURER') || (props.role === 'ASSISTANT')) newState['username'] = formState['name'].toLowerCase().turkishtoEnglish() + "." 
        + formState['surname'].toLowerCase().turkishtoEnglish();
        setFormState(newState);

    }

    return (props.role &&
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        marginTop   : "20px",
      }}
      noValidate
      autoComplete="off"
        >
            <div><TextField
                margin=""
                onChange={onFormChange}
                required
                name="name"
                id="outlined-required"
                label="İsim"
                defaultValue=""
            /></div>
            <div><TextField
                onChange={onFormChange}
                required
                name="surname"
                id="outlined-required"
                label="Soyisim"
                defaultValue=""
            /></div>
            <div><TextField
                onChange={onFormChange}
                required
                name="email"
                id="outlined-required"
                label="Okul Mail Adresi"
                defaultValue="@yoku.edu.tr"
            /></div>
            <div>{isValue()}</div>
            <div><Button sx={{float: "right"}} onClick={() => props.submit(formState)}>Kullanıcı Ekle</Button></div>
            </Box>
    );
}