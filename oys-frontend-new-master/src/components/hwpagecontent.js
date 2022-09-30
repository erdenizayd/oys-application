import HwApi from "../api/hwapi";
import { Modal, Button, Box, Typography, TextField, Table, TableBody, TableContainer, TableRow, TableCell, TableHead, TablePagination } from "@mui/material";
import { useEffect, useState } from "react";
import CourseApi from "../api/courseapi";
import HomeworkGradeChartComponent from "./homeworkgradecharts";
import HomeworkGradeDetailsComponent from "./homeworkgradedetails";

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

export default function HwPageContentComponent(props) {
    const courseApi = new CourseApi();
    const hwApi = new HwApi();
    const [homework, setHomework] = useState({
        lastDate: "0.0.0000 Saat: 0.0",
        assistantName: "",
        isGraded: false,
    });
    const [evaluation, setEvaluation] = useState('');
    const [currentStudent, setCurrentStudent] = useState('');
    const [grade, setGrade] = useState('0');
    const [submissions, setSubmissions] = useState([]);
    const [students, setStudents] = useState([]);
    const [hwFile, setHwFile] = useState('');
    const [about, setAbout] = useState('');
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    function handleOpen(username,studentId) {
        setOpen(true);
        fetchStudentSubmission(username);
        setCurrentStudent(studentId);
    };
    const handleClose = () => setOpen(false);

    useEffect(() => {
        fetchHomework();
        fetchSubmission();
        fetchStudents();
    },[]);
    
    function isExpired() {
        const datearray = homework.lastDate.split(" ");
        const day = datearray[0].split(".");
        const time = datearray[2].split(".");
        const lastd = new Date(day[2],day[1],day[0],time[0],time[1]);
        return Date.now() >= lastd;
    }

    async function handleClick() {
        const response = (await hwApi.getDetail(props.hwId)).data;
        let url = window.URL.createObjectURL(new Blob([response]));
        let a = document.createElement('a');
        a.href = url;
        a.download = 'odev' + props.hwId + '.pdf';
        a.click();
    }

    async function fetchHomework() {
        const response = (await hwApi.getHomework(props.hwId)).data;
        setHomework(response);
    }

    async function fetchSubmission() {
        if(localStorage.getItem("role") === "student") {
            const response = (await hwApi.getSubmission(props.hwId, localStorage.getItem("username"))).data;
            setSubmissions(response);
        }
    }

    async function fetchStudentSubmission(username) {
        const response = (await hwApi.getSubmission(props.hwId, username)).data;
        setSubmissions(response);
    }
    
    async function handleSubmission(id) {
        const response = (await hwApi.getSubmissionFile(props.hwId,id)).data;
        let url = window.URL.createObjectURL(new Blob([response]));
        let a = document.createElement('a');
        a.href = url;
        a.download = 'odev' + props.hwId + 'teslim' + '.pdf';
        a.click();
    }

    async function handleSubmit() {
        const formData = new FormData();
        formData.append('file',hwFile);
        formData.append('details', about);
        formData.append('username', localStorage.getItem("username"));

        const response = (await hwApi.submitHomework(props.hwId,formData)).data;
        console.log(response)
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
        const response = (await hwApi.evaluateHomework(props.hwId, currentStudent, request)).data;
        console.log(response);
    }

    function getGrade(grades) {
        if(grades.length === 0) return "Notlandırılmadı";

        for(let i = 0; i < grades.length; i++) {
            if(grades[i].hwId === Number(props.hwId)) {
                if(grades[i].grade === -1) return "Notlandırılmadı";
                else return grades[i].grade;
            }
        }
    }

    return (
        <div style={{gridColumn: 'span 3'}}>
            <Box sx={{
                    backgroundColor: "#F4F6F6",
                    borderStyle: "solid #D2DADA",
                    borderWidth: "1px",
                    padding: 3,
                    margin: '10px 0 10px 0',
                    borderRadius: '3px'}}>
            <div>
                <Typography
                 sx={{
                    fontWeight: 'bold',
                    display: "inline"
                }}>Ödevden Sorumlu Asistan: </Typography><Typography sx={{
                    display: "inline"
                }}>{homework.assistantName}</Typography>     
                
                <Typography
                 sx={{
                    marginLeft: '20px',
                    fontWeight: 'bold',
                    display: "inline"
                }}>Ödevin son teslim tarihi: </Typography><Typography sx={{
                    display: "inline"
                }}>{homework.lastDate}</Typography>     
                <Button sx={{marginLeft: '20px'}}variant='outlined' onClick={handleClick}>Ödev Detayları</Button> 
                </div>
                
            </Box>
            {localStorage.getItem("role") === "STUDENT" ?<div>
            
            {homework.isGraded ? <Box>
                <HomeworkGradeDetailsComponent hwId={props.hwId}/>
                <HomeworkGradeChartComponent hwId={props.hwId} />
            </Box> : <Box sx={{
                    backgroundColor: "#F4F6F6",
                    borderStyle: "solid #D2DADA",
                    borderWidth: "1px",
                    padding: 3,
                    margin: '10px 0 10px 0',
                    borderRadius: '3px',
                    alignContent:'center'}}><Box 
                    sx= {{
                        width:'40%',
                        display: 'inline-block'
                    }}>
                <div style={{width: '100%', height: '110px'}}>                
                <input type="file" onChange={(e) => setHwFile(e.target.files[0])} disabled={isExpired()}/>
                <TextField
                sx={{float: 'right'}}
                onChange={(e) => setAbout(e.target.value)}
                disabled={isExpired()}
                id="about"
                label="Açıklama"
                multiline
                rows={3}
                />
                </div>

                <div style={{width: '100%'}}>
                <Button variant='contained' style={{float:'right',marginTop:'20px'}} disabled={isExpired()} onClick={handleSubmit}>Yükle</Button>
                </div>
            </Box>

            <Box sx= {{
                        width:'50%',
                        float: 'right',
                        display: 'inline-block'

                    }}>
                {(submissions.length === 0) ? "Henüz ödev teslimi yapmadınız." : 
                submissions.map((r) => {
                    return <div>
                        {r.submissionId}
                        <Button onClick={() => handleSubmission(r.submissionId)}>İndir</Button>
                        {r.details}
                    </div>
                })}
            </Box></Box>} </div>
            : <Box>
                <TableContainer sx={{width: '100%', margin: 'auto', marginTop: '20px', gridColumn: 'span 3'}} >
            <Table sx={{ }} aria-label="simple table">
                <TableHead>
                    <TableRow >
                        <TableCell sx={{ width: '50%' }}>Öğrenci Adı</TableCell>
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
                        <Typography>{getGrade(row.homeworkGrades)}</Typography>
                    </TableCell>
                    <TableCell>
                        <Button onClick={() => handleOpen(row.username, row.studentId)}>Detay</Button>
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={students.length}
          rowsPerPage={20}
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
                {submissions.map((r) => {
                    return <div>
                        {r.submissionId}
                        <Button onClick={() => handleSubmission(r.submissionId)}>İndir</Button>
                        {r.details}
                    </div>
                })}
                <TextField
                    sx={{marginBottom: '20px', width: '100%'}}
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
                    <Button variant='contained' sx={{width: '100%'}} onClick={handleEvaluation}>Not Ekle</Button>
            </Box>
            </Modal>  

            </Box>}
        </div>
    );
}