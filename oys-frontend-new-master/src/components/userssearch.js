import { TextField, Button, Box } from "@mui/material";

function UsersSearchComponent(props) {
    return (
        <Box sx={{marginTop: '20px'}}>
            <span><TextField id="name" label="İsim" variant="standard"  
            sx={{marginRight: '30px'}} 
            value={props.nameSearch}
            onChange={(event) => {props.setNameSearch(event.target.value)}}/></span>
            <span><TextField id="username" label="Kullanıcı Adı" variant="standard" 
            value={props.usernameSearch}
            onChange={(event) => {props.setUsernameSearch(event.target.value)}}/></span>
            {localStorage.getItem("role") === 'ADMIN' ? <span><Button sx={{float: "right", margin:"20px"}}
                    color="success"
                    onClick={props.handleOpen} variant="contained">Yeni Kullanıcı Ekle</Button></span> : ""}
        </Box>
    );
}

export default UsersSearchComponent;