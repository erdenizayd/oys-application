import { Button, IconButton, Typography, Modal, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import CourseApi from "../api/courseapi";
import AnnouncementComponent from "./announcement";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    width: '700px',
    boxShadow: 24,
    p: 4,
    borderRadius: '5px'
};

export default function CourseAnnouncementsComponent(props) {
    const courseApi = new CourseApi();

    const [title, setTitle] = useState('');
    const [announcement, setAnnouncement] = useState('');

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [course,setCourse] = useState(
        {
            announcements: []
        }
    );

    useEffect(() => {
        fetchCourse();
    }, [announcement]);

    async function fetchCourse() {
        const response = (await courseApi.getCourse(props.courseCode.toUpperCase())).data;
        setCourse(response);
        console.log(course)
    }

    async function handleSubmit() {
        const request = {
            title: title,
            announcement: announcement,
            username: localStorage.getItem("username"),
            postDate: new Date()
        }

        const response = (await courseApi.newAnnouncement(props.courseCode.toUpperCase(), request)).data;
        console.log(response);
        handleClose();
    }

    return (
        <div>
            {(localStorage.getItem("role") === 'STUDENT') ? "" :<Button variant="contained" sx={{float:'right'}} onClick={handleOpen}>Duyuru Ekle</Button>}
            {course.announcements.length > 0 ? course.announcements.slice(0).reverse().map(a => {return <AnnouncementComponent announcement={a}/>})
            : <Typography>Şu anda dersin eklenmiş bir duyurusu yok.</Typography>}
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