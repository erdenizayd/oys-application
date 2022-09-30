import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton, Alert , Snackbar, Modal} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import React, { useContext, useEffect, useState } from "react";
import RoleContext from '../context/rolecontext';
import DeleteIcon from '@mui/icons-material/Delete';
import CourseApi from '../api/courseapi';
import StudentApi from '../api/studentapi';
import EditIcon from '@mui/icons-material/Edit';
import EditCourseComponent from './editcourse';
import { toast } from 'react-toastify';
import CoursesPaginationComponent from './coursespagination';

function createCourseHours(courseHours) {
    const schedule = [[],[],[],[],[]];
    const scheduleObj = [[],[],[],[],[]];
    const hours = [
        "8.40","9.40","10.40","11.40","12.40","13.40","14.40","15.40","16.40"
    ];
    const days = [
        "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"
    ];

    let returnStr = ""

    courseHours.forEach(e => {
        schedule[e.dayOfWeek - 1].push(e.hour - 1);
    });
    

    for(let i = 0; i < 5; i++) {
        if(schedule[i].length > 0) {
            schedule[i].sort();
            returnStr = returnStr + days[i] + ": ";
            schedule[i].forEach((e) => {returnStr = returnStr + hours[e] + " "});
            returnStr = returnStr + "\n";
        }
    }

    return returnStr;
}

function CoursesListComponent(props) {
    const studentApi = new StudentApi();
    const courseApi = new CourseApi();
    const [responseMessage, setResponseMessage] = useState("");
    const [courses,setCourses] = useState([]);
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const handleModalClose = () => setOpenModal(false);
    const [currentCourse, setCurrentCourse] = useState('');

    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
    };
    

    useEffect(() => {
        fetchCourses();
    }, [responseMessage]);

    function editCourse(courseCode) {
        setOpenModal(true);
        setCurrentCourse(courseCode);
    }

    async function fetchCourses() {
        const response = (await courseApi.getCoursesList(page-1)).data;
        setCourses(response);
        if(response.length > 0)setPageCount(response[0].pageCount);
    }

    async function handleDelete(courseCode) {
        try{
            const response = (await courseApi.deleteCourse(courseCode)).data;
            setResponseMessage(response.message);
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
        
    }

    async function handleAttend(courseCode) {
        try{
        const response = (await studentApi.attendCourse(courseCode,localStorage.getItem("username"))).data;
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
            toast.error("Bu derse kayıt olamazsınız.", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
    }

    return (
        <div>
        <TableContainer sx={{width: '100%', margin: 'auto', marginTop: '20px'}} >
            <Table sx={{ }} aria-label="simple table">
                <TableHead>
                    <TableRow >
                        <TableCell sx={{ width: '10%' }}>Ders Kodu</TableCell>
                        <TableCell sx={{ width: '30%' }}>Ders Adı</TableCell>
                        <TableCell sx={{ width: '20%' }}>Öğretim Görevlisi</TableCell>
                        <TableCell sx={{ width: '30%' }}>Ders Saatleri</TableCell>
                        <TableCell sx={{ width: '10%' }}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {courses.map((row,index) => (
                    <TableRow key={index}
                    >
                    <TableCell>{row.code}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.lecturerName}</TableCell>
                    <TableCell>{createCourseHours(row.courseHours)}</TableCell>
                    <TableCell>{(localStorage.getItem("role") === 'STUDENT') && <IconButton onClick={() => {handleAttend(row.code)}}><SchoolIcon/></IconButton>}
                    {(localStorage.getItem("role") === 'ADMIN') && <IconButton onClick={() => {handleDelete(row.code)}}><DeleteIcon/></IconButton>}
                    {(localStorage.getItem("role") === 'ADMIN') && <IconButton onClick={() => {editCourse(row.code)}}><EditIcon/></IconButton>}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <CoursesPaginationComponent pageCount={pageCount} page={page} handleChange={handlePageChange}/>
        <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <EditCourseComponent handleClose={handleModalClose} courseCode={currentCourse}/>
                </Modal>  
        </div>
    );
}

export default CoursesListComponent;