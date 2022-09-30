import { Button, Modal, Typography, Box, TextField, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, IconButton, TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import CourseApi from "../api/courseapi";
import ExamApi from "../api/examapi";
import AddTaskIcon from '@mui/icons-material/AddTask';
import ExamGradeChartComponent from "./examgradecharts";
import ExamGradeDetailComponent from "./examgradedetails";
import { toast } from "react-toastify";

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
 
export default function ExamPageContentComponent(props) {
    const examApi = new ExamApi();
    const courseApi = new CourseApi();
    const [exam, setExam] = useState({
        id: -1,
        name: "",
        date: "0.0.0000 Saat: 0.0",
        roomName: "",
        details: "",
        isGraded: false
    });
    const [evaluation, setEvaluation] = useState('');
    const [grade, setGrade] = useState('0');
    const [students, setStudents] = useState([]);
    const [currentStudent, setCurrentStudent] = useState('');
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    function handleOpen(studentId) {
        setOpen(true);
        setCurrentStudent(studentId);
    };
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetchExam();
        fetchStudents();
    }, []);

    function getGrade(grades) {
        if(grades.length === 0) return "Notlandırılmadı";
        for(let i = 0; i < grades.length; i++) {
            if(grades[i].examId === Number(props.examId)) {
                if(grades[i].grade === -1) return "Notlandırılmadı";
                else return grades[i].grade;
            }
        }
    }

    async function fetchExam() {
        const response = (await examApi.getExam(props.examId)).data;
        setExam(response);
    }

    async function fetchStudents() {
        if(localStorage.getItem("role") !== "student") {
            const response = (await courseApi.getCourseStudents(props.courseCode.toUpperCase())).data;
            setStudents(response);
        }
    }

    async function handleEvaluation() {
        const request = {
            grade: grade,
            evaluation: evaluation
        };
        const response = (await examApi.evaluateExam(props.examId, currentStudent, request)).data;
        handleClose();
        toast.success(response.message,{
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
    }

    return (
        <div style={{gridColumn: 'span 3'}}>
            <Box sx={{
                    backgroundColor: "#F4F6F6",
                    gridColumn:"span 2",
                    borderStyle: "solid #D2DADA",
                    borderWidth: "1px",
                    padding: 3,
                    margin: '10px 0 10px 0',
                    borderRadius: '3px'}}>
                <div style={{marginBottom: '10px'}}>
                <Typography
                 sx={{
                    fontWeight: 'bold',
                    display: "inline"
                }}>Sınav Adı: </Typography><Typography sx={{
                    display: "inline"
                }}>{exam.name}</Typography>     
                </div><div style={{marginBottom: '10px'}}>
                <Typography
                 sx={{
                    fontWeight: 'bold',
                    display: "inline"
                }}>Sınav Tarihi </Typography><Typography sx={{
                    display: "inline"
                }}>{exam.date}</Typography>     
                </div><div style={{marginBottom: '10px'}}>
                <Typography
                 sx={{
                    fontWeight: 'bold',
                    display: "inline"
                }}>Sınav Yeri: </Typography><Typography sx={{
                    display: "inline"
                }}>{exam.roomName}</Typography>     
                </div><div style={{marginBottom: '10px'}}>
                <Typography
                 sx={{
                    fontWeight: 'bold',
                    display: "inline"
                }}>Genel Bilgiler: </Typography><Typography sx={{
                    display: "inline"
                }}>{exam.details}</Typography>     
                </div>

            </Box >
            {(localStorage.getItem("role") == 'STUDENT') ?
                (exam.isGraded ? <Box sx={{
                    backgroundColor: "#F4F6F6",
                    gridColumn:"span 2",
                    borderStyle: "solid #D2DADA",
                    borderWidth: "1px",
                    padding: 3,
                    margin: '10px 0 10px 0',
                    borderRadius: '3px'}}>
                    <ExamGradeDetailComponent examId={props.examId} />
                    <ExamGradeChartComponent examId={props.examId} />
                </Box> 
                : "Sınav henüz notlandırılmadı.") 
                : <Box sx={{ width: "100%" , gridColumn: 'span 3', margin: 'auto'}}>
                    <TableContainer sx={{width: '100%', margin: 'auto', marginTop: '20px', gridColumn: 'span 3'}} >
            <Table sx={{ }} aria-label="simple table">
                <TableHead>
                    <TableRow >
                        <TableCell sx={{ width: '90%' }}>Öğrenci Adı</TableCell>
                        <TableCell>Not</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {students.map((row) => (
                    <TableRow>
                    <TableCell>
                        <Typography>{row.name}</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography>{getGrade(row.examGrades)}</Typography>
                    </TableCell>
                    <TableCell>
                        <IconButton onClick={() => {handleOpen(row.studentId)}}><AddTaskIcon/></IconButton>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={students.length}
          rowsPerPage={10}
          page={page}
          onPageChange={handleChangePage}
        />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                
            <Box sx={style}>
                <Typography align="center">Sınavı Notlandır</Typography>
                <TextField
                    sx={{marginBottom: '20px', width: '100%', marginTop: '20px'}}
                    onChange={(e) => setGrade(e.target.value)}
                    id="grade"
                    label="Not"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    />
                    <TextField
                    sx={{marginBottom: '20px', width: '100%'}}
                    onChange={(e) => setEvaluation(e.target.value)}
                    id="about"
                    label="Değerlendirme"
                    multiline
                    rows={4}
                    />
                    <Button variant='contained' sx={{width: '100%'}}onClick={handleEvaluation}>Not Ekle</Button>
            </Box>
            </Modal>  
                </Box>
                
            }


        </div>
    );
}