import { TextField, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CourseApi from "../api/courseapi";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
    borderRadius: '5px'
  };

export default function EditCourseComponent(props) {

    const [course, setCourse] = useState(
        {
            name: "",
            about: "",
            type: "",
            code: "",
            roomName: "",
            lecturerName: ""
        }
    );
    const courseApi = new CourseApi();

    useEffect(() => {
        fetchCourse();
    },[]);

    async function fetchCourse() {
        const response = (await courseApi.getCourse(props.courseCode)).data;
        setCourse(response);
        console.log(response)
    }

    function onFormChange(event) {
        const newState = {...course};
        const name = event.target.name;
        const value = event.target.value;
        newState[name] = value;
        setCourse(newState);
    }

    async function handleClick() {
        try {
            const response = (await courseApi.updateCourse(props.courseCode.toUpperCase(), course)).data;
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
    catch(e) {
        toast.error("Ders silinemedi.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });  
    }
        props.handleClose();
    }
    
    return(
        <Box sx={style}>
            <Box sx={{ minWidth: 120 }}>
                <TextField
                onChange={onFormChange}
                name="name"
                id="name"
                label="Ders Adı"
                defaultValue={course.name}
                />
                <TextField
                onChange={onFormChange}
                name="about"
                id="about"
                label="Hakkında"
                defaultValue={course.about}
                />
                <TextField
                onChange={onFormChange}
                name="code"
                id="code"
                label="Ders Kodu"
                defaultValue={course.code}
                />
                <Button onClick={handleClick}>Dersi Güncelle</Button>
            </Box>
        </Box>
    );
}