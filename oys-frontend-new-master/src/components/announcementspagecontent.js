import { Button, Modal, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import AnnouncementApi from "../api/announcementapi";
import MainAnnouncementComponent from "./mainannouncement";
import UsersPaginationComponent from "./userspagination";

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

export default function AnnouncementsPageContentComponent() {
    const announcementApi = new AnnouncementApi();
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [announcements,setAnnouncements] = useState([]);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [title, setTitle] = useState('');
    const [announcement, setAnnouncement] = useState('');


    const handlePageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        fetchAnnouncements();
    }, [announcements]);

    async function fetchAnnouncements() {
        const response = (await announcementApi.getAnnouncements(page-1)).data;
        setAnnouncements(response);
        if(response.length > 0) setPageCount(response[0].pageCount);
    }


    async function handleSubmit() {
        const request = {
            title: title,
            announcement: announcement,
            postDate: new Date()
        }

        const response = (await announcementApi.newAnnouncement(request)).data;
        console.log(response);
        handleClose();
    }

    return (
        <div style={{gridColumn: 'span 3'}}>
            {(localStorage.getItem("role") === 'ADMIN') ? <Button onClick={handleOpen}>Duyuru Ekle</Button> : ""}
            {announcements.map((a,index) => {
                return <MainAnnouncementComponent key={index} announcement={a} />
            })}
            <UsersPaginationComponent pageCount={pageCount} page={page} handleChange={handlePageChange}/>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                <TextField
                    sx={{display: 'block', marginBottom: '10px'}}
                    onChange={(e) => {setTitle(e.target.value)}}
                    required
                    name="title"
                    id="outlined-required"
                    label="Duyuru Başlığı"/>
                    <TextField
                    sx={{
                        width: '100%',
                        marginBottom: '10px'
                    }}
                    onChange={(e) => {setAnnouncement(e.target.value)}}
                    required
                    multiline
                    name="announcement"
                    id="outlined-required"
                    label="Duyuru"
                    minRows={8}/>
                    <Button sx={{display: 'block', float: 'right'}} variant="contained" onClick={handleSubmit}>Ekle</Button>
                    <Button sx={{display: 'block', float: 'right', marginRight: '10px'}} variant="contained" onClick={handleClose}>İptal</Button>

                </Box>
            </Modal>  
        </div>
    );
}