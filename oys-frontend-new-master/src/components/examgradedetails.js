import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import ExamApi from "../api/examapi";

export default function ExamGradeDetailComponent(props) {
    const examApi = new ExamApi();
    const [grade, setGrade] = useState({});
    const [average, setAverage] = useState(0);
    const [std, setStd] = useState(0);
    const emptyTable = [0,0,0,0,0,0,0,0,0,0];

    

    useEffect(() => {
        fetchGrades();
    },[]);

    async function fetchGrades() {
        const response = (await examApi.getGrades(props.examId)).data;
        const tempData = [...emptyTable];
        const avg = response.reduce((a, b) => a + b, 0) / response.length;
        const dev = (response.length === 0 ? 0 : Math.sqrt(response.map(x => Math.pow(x - avg, 2)).reduce((a, b) => a + b) / response.length));
        setAverage(avg);
        setStd(dev);
    }

    useEffect(() => {
        fetchGrade();
    }, []);

    async function fetchGrade() {
        const response = (await examApi.getGrade(props.examId)).data;
        setGrade(response);
    }

    return (
        <Box>
            <div style={{marginBottom: '10px'}}>
            <Typography
                 sx={{
                    fontWeight: 'bold',
                    display: "inline"
                }}>Notunuz: </Typography><Typography sx={{
                    display: "inline"
                }}>{grade.grade}</Typography>     
                </div>
                <div style={{marginBottom: '10px'}}>
                <Typography
                 sx={{
                    fontWeight: 'bold',
                    display: "inline"
                }}>Not Ortalamas─▒: </Typography><Typography sx={{
                    display: "inline"
                }}>{average}</Typography>     
                </div><div style={{marginBottom: '10px'}}>
                <Typography
                 sx={{
                    fontWeight: 'bold',
                    display: "inline"
                }}>Standart Sapma: </Typography><Typography sx={{
                    display: "inline"
                }}>{std}</Typography>     
                </div><div style={{marginBottom: '10px'}}>
                <Typography
                 sx={{
                    fontWeight: 'bold',
                    display: "inline"
                }}>De─čerlendirme:</Typography><Typography sx={{
                    display: "inline"
                }}>{grade.evaluation}</Typography>     
                </div>
        </Box>
    );
}