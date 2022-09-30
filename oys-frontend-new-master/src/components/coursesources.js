import { List, ListItem, ListItemText, Button, Modal, Box, Select, MenuItem, TextField, ListItemButton, Typography, ListItemIcon } from "@mui/material";
import { useEffect, useState } from "react";
import CourseApi from "../api/courseapi";
import LaunchIcon from '@mui/icons-material/Launch';
import AttachmentIcon from '@mui/icons-material/Attachment';

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

export default function CourseSourcesComponent(props) {
    const courseApi = new CourseApi();
    const [file, setFile] = useState('');
    const [sources,setSources] = useState([]);
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('');
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const openInTab = (e) => {
        console.log(e);
        window.open(e.target.value,'_blank','noopener,noreferrer');
    }

    useEffect(() => {
        fetchSources();
    },[sources]);

    async function fetchSources() {
        const response = (await courseApi.getSources(props.courseCode.toUpperCase())).data;
        setSources(response);
    }

    async function handleSubmit() {
        if(type === 'LINK') {
            const request = {
                name: name,
                url: url
            };
            const response = (await courseApi.addLinkSource(props.courseCode.toUpperCase(), request)).data;
            handleClose();
            console.log(response);
        }
        else {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('name', name);
            const response = (await courseApi.addFileSource(props.courseCode.toUpperCase(), formData)).data;
            handleClose();
            console.log(response);
        }
    }

    async function handleClick(file) {
        const response = (await courseApi.getFileSource(props.courseCode.toUpperCase(), file.id)).data;
        let url = window.URL.createObjectURL(new Blob([response]));
        let a = document.createElement('a');
        a.href = url;
        a.download = file.name + '.pdf';
        a.click();
    }
    return (
        <div>
            
            {sources.length > 0 ? <List
            sx={{backgroundColor: "#F4F6F6",
            gridColumn:"span 2",
                borderStyle: "solid #D2DADA",
                borderWidth: "1px",
                margin: '10px 0 20px 0',
                borderRadius: '3px'}}>
                {sources.map((s) => {return <ListItem>
                    <ListItemButton onClick={() => s.type === 'LINK' ? window.open(s.url) : handleClick(s)}>
                    <ListItemIcon>
                        { s.type === 'LINK' ? <LaunchIcon/> : <AttachmentIcon/>}
                    </ListItemIcon>
                    <ListItemText  primary={s.name}/>
                    </ListItemButton>
                </ListItem>})}
            </List> : <Typography>Şu anda eklenmiş kaynak yok.</Typography>}
            
            {(localStorage.getItem("role") === 'STUDENT') ? "" :<Button variant="contained" sx={{float:'right'}} onClick={handleOpen}>Kaynak Ekle</Button>}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Select
                    sx={{width: '100%', marginBottom: '20px'}}
                    labelId="source-type-select"
                    id="source-type-select"
                    value={type}
                    label="Tip"
                    onChange={(e) => {setType(e.target.value)}}>
                        <MenuItem value="LINK">Link</MenuItem>
                        <MenuItem value="DOCUMENT">Dosya</MenuItem>
                    </Select>
                    {type !== '' ? <div>
                    <TextField
                    sx={{width: '100%' , marginBottom: '20px'}}
                    onChange={(e) => {setName(e.target.value)}}
                    required
                    name="name"
                    id="outlined-required"
                    label="Kaynak Adı"
                    />
                    {(type === 'LINK' ? 
                    <TextField
                        sx={{width: '100%' , marginBottom: '20px'}}
                        onChange={(e) => {setUrl(e.target.value)}}
                        required
                        name="link"
                        id="outlined-required"
                        label="Kaynak Linki"
                    />
                    :
                    <input type="file" onChange={(e) => setFile(e.target.files[0])}/> 
                )}
                <Button sx={{float: 'right'}}variant="contained" onClick={handleSubmit}>Ekle</Button>
                    </div> : ""}
                </Box>
            </Modal>  
        </div>
    );

}