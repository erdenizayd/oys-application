import { IconButton, Typography, TableHead, Table, TableBody, TableCell, TableContainer, TableRow, Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useEffect, useState } from "react";
import CourseApi from "../api/courseapi";
import AddIcon from '@mui/icons-material/Add';

export default function CourseStudentsComponent(props) {
    const courseApi = new CourseApi();
    const [courseStudents,setCourseStudents] = useState(
        [{
            studentId: 0,
            name: "",
            username: "",
            examGrades: [],
            homeworkGrades: []
        }]
    );

    useEffect(() => {
        fetchCourseStudents();
    }, []);

    async function fetchCourseStudents() {
        const response = (await courseApi.getCourseStudents(props.courseCode.toUpperCase())).data;
        setCourseStudents(response);
        console.log(courseStudents)
    }

    return (
            <div>
                <TableContainer sx={{width: '100%', margin: 'auto', marginTop: '20px', gridColumn: 'span 3'}} >
            <Table sx={{ }} aria-label="simple table">
                <TableHead>
                    <TableRow >
                        <TableCell sx={{ width: '40%' }}>Öğrenci Adı</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {courseStudents.map((row) => (
                    <TableRow>
                    <TableCell>
                    <Accordion>
                        <AccordionSummary
                        expandIcon={<AddIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        >
                        <Typography>{row.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Typography>
                            {row.examGrades.map(
                                (examRow) => {
                                    return (examRow.grade);
                                }
                            )}

                            {row.homeworkGrades.map(
                                (homeworkRow) => {
                                    return (homeworkRow.grade);
                                }
                            )}
                        </Typography>
                        </AccordionDetails>
                    </Accordion></TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
            </div>
    );
}