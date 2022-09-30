import { IconButton, Typography, Button, Modal, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import CourseApi from "../api/courseapi";
import AddIcon from '@mui/icons-material/Add';
import NewExamFormComponent from "./newexamform";
import NewHwFormComponent from "./newhwform";

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

export default function CourseAssignmentsComponent(props) {
    const [examOpen, setExamOpen] = useState(false);
    const [hwOpen, setHwOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const handleExamOpen = () => {setExamOpen(true);};
    const handleExamClose = () => setExamOpen(false);
    const handleHwOpen = () => setHwOpen(true);
    const handleHwClose = () => setHwOpen(false);


    const courseApi = new CourseApi();
    const [course,setCourse] = useState(
        {
            exams: [],
            homeworks: [],
        }
    );

    useEffect(() => {
        fetchCourse();
    }, [refresh]);

    const handleRefresh = () => setRefresh(!refresh);

    async function fetchCourse() {
        const response = (await courseApi.getCourse(props.courseCode.toUpperCase())).data;
        setCourse(response);
        console.log(course)
    }

    return (
            <div><Box sx={{
                backgroundColor: "#F4F6F6",
                gridColumn:"span 2",
                borderStyle: "solid #D2DADA",
                borderWidth: "1px",
                padding: 3,
                margin: '10px 0 10px 0',
                borderRadius: '3px'
            }}>
                
                {course.exams.length > 0 ?
                <TableContainer sx={{width: '100%', gridColumn: 'span 3'}} >
                <Table sx={{ }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{ width: '40%' }}>Sınav</TableCell>
                            <TableCell sx={{ width: '20%' }}>Tarih</TableCell>
                            <TableCell sx={{ width: '20%' }}>Sınıf</TableCell>
                            <TableCell sx={{width:'20%'}}>
                                {(localStorage.getItem("role") === 'STUDENT') ? "" : <Button onClick={handleExamOpen} endIcon={<AddIcon/>} sx={{float:"right"}}>Sınav Ekle</Button>}
                                </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {course.exams.map((row) => (
                        <TableRow>
                        <TableCell><a style={{textDecoration: "none"}} href={"/my_courses/" + props.courseCode + "/exam/" + row.id}>{row.name}</a></TableCell>
                        <TableCell>{row.date}</TableCell>
                        <TableCell>{row.roomName}</TableCell>
                        <TableCell></TableCell>

                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer> : <span>Şu anda dersin eklenmiş bir sınavı yok.
            {(localStorage.getItem("role") === 'STUDENT') ? "" :<Button onClick={handleExamOpen} endIcon={<AddIcon/>} sx={{float:"right"}}>Sınav Ekle</Button>}</span>}
                </Box>
                <Box  sx={{
                    backgroundColor: "#F4F6F6",
                    gridColumn:"span 2",
                    borderStyle: "solid #D2DADA",
                    borderWidth: "1px",
                    padding: 3,
                    margin: '10px 0 10px 0',
                    borderRadius: '3px'
                }}>

                {course.homeworks.length > 0 ? <TableContainer sx={{width: '100%', gridColumn: 'span 3'}} >
                <Table sx={{ }} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell sx={{ width: '30%' }}>Ödev</TableCell>
                            <TableCell sx={{ width: '20%' }}>Tarih</TableCell>
                            <TableCell sx={{ width: '30%' }}>Sorumlu Asistan</TableCell>
                            <TableCell sx={{ width: '20%' }}>
                                {(localStorage.getItem("role") === 'STUDENT') ? "" :<Button onClick={handleHwOpen} sx={{float:"right"}} endIcon={<AddIcon/>}>Ödev Ekle</Button>}
                                </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {course.homeworks.map((row) => (
                        <TableRow>
                        <TableCell><a href={"/my_courses/" + props.courseCode + "/hw/" + row.id}>{"Ödev" + row.id}</a></TableCell>
                        <TableCell>{row.lastDate}</TableCell>
                        <TableCell>{row.assistantName}</TableCell>
                        <TableCell></TableCell>

                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer> : <span>Şu anda dersin eklenmiş bir ödevi yok.
            {(localStorage.getItem("role") === 'STUDENT') ? "" : <Button onClick={handleHwOpen} sx={{float:"right"}} endIcon={<AddIcon/>}>Ödev Ekle</Button>}</span>}
            </Box>
                <Modal
                open={examOpen}
                onClose={handleExamClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <NewExamFormComponent refresh={handleRefresh} handleClose={handleExamClose} courseCode={props.courseCode} />
                </Box>
                </Modal>  

                <Modal
                open={hwOpen}
                onClose={handleHwClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <NewHwFormComponent refresh={handleRefresh} handleClose={handleHwClose} courseCode={props.courseCode} />
                </Box>
                </Modal>  
            </div>
    );
}