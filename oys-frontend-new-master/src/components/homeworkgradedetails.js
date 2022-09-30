import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import HwApi from "../api/hwapi";

export default function HomeworkGradeDetailsComponent(props) {
    const hwApi = new HwApi();
    const [grade, setGrade] = useState({});
    const [average, setAverage] = useState(0);
    const [std, setStd] = useState(0);
    const emptyTable = [0,0,0,0,0,0,0,0,0,0];

    

    useEffect(() => {
        fetchGrades();
    },[]);

    async function fetchGrades() {
        const response = (await hwApi.getGrades(props.hwId)).data;
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
        const response = (await hwApi.getGrade(props.hwId)).data;
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
                }}>Not Ortalaması: </Typography><Typography sx={{
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
                }}>Değerlendirme:</Typography><Typography sx={{
                    display: "inline"
                }}>{grade.evaluation}</Typography>     
                </div>
        </Box>
    );

}