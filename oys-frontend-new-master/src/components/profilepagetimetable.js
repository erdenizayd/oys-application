import { useEffect, useState } from "react";
import AssistantApi from "../api/assistantapi";
import LecturerApi from "../api/lecturerapi";
import StudentApi from "../api/studentapi";
import { TableContainer, TableRow, TableCell, TableBody, Table, TableHead, Paper, Modal, Box, TextField, Button} from "@mui/material";
import { Schedule } from "@mui/icons-material";

export default function ProfilePageTimetableComponent(props) {
    const lecturerApi = new LecturerApi();
    const studentApi = new StudentApi();
    const assistantApi = new AssistantApi();
    const [refresh, setRefresh] = useState(false);

    const [rows, setRows] = useState([
        {
            hour: "8.40",
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: ""
        },
        {
            hour: "9.40",
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: ""
        },
        {
            hour: "10.40",
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: ""
        },
        {
            hour: "11.40",
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: ""
        },{
            hour: "12.40",
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: ""
        },{
            hour: "13.40",
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: ""
        },
        {
            hour: "14.40",
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: ""
        },{
            hour: "15.40",
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: ""
        },
        {
            hour: "16.40",
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: ""
        }
    ]);
    const emptyRows = [
        {
            hour: "8.40",
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: ""
        },
        {
            hour: "9.40",
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: ""
        },
        {
            hour: "10.40",
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: ""
        },
        {
            hour: "11.40",
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: ""
        },{
            hour: "12.40",
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: ""
        },{
            hour: "13.40",
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: ""
        },
        {
            hour: "14.40",
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: ""
        },{
            hour: "15.40",
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: ""
        },
        {
            hour: "16.40",
            monday: "",
            tuesday: "",
            wednesday: "",
            thursday: "",
            friday: ""
        }
    ]


    function createRows(schedule) {
        const newRows = [...rows];

        switch(schedule.dayOfWeek){
            case 1:
                newRows[schedule.hour - 1].monday = schedule.detail;
                break;
            case 2:
                newRows[schedule.hour - 1].tuesday = schedule.detail;
                break;
            case 3:
                newRows[schedule.hour - 1].wednesday = schedule.detail;
                break;
            case 4:
                newRows[schedule.hour - 1].thursday = schedule.detail;
                break;
            case 5:
                newRows[schedule.hour - 1].friday = schedule.detail;
                break;
        }

        setRows(newRows);
        setRefresh(!refresh);
    }

    useEffect(() => {
        fetchTable();
    }, [props.role])


    async function fetchTable() {
        let response = '';
        switch(props.role) {
            case 'STUDENT':
                response = (await studentApi.getSchedule(props.username)).data;
                response.map((e) => createRows(e));
                break;
            case 'ASSISTANT':
                response = (await assistantApi.getSchedule(props.username)).data;
                console.log(response);

                response.map((e) => createRows(e));
                break;
            case 'LECTURER':
                response = (await lecturerApi.getSchedule(props.username)).data;
                response.map((e) => createRows(e));
                break;
            default:
                break;
        }
    }

    return(
        <div className="profileTimeTable">
        <TableContainer component={Paper} sx={{width: '100%', margin: 'auto', marginTop: '20px'}} >
            <Table sx={{ }} aria-label="simple table">
                <TableHead>
                    <TableRow >
                        <TableCell sx={{ width: '10%' }}>Saatler</TableCell>
                        <TableCell sx={{ width: '18%' }}>Pazartesi</TableCell>
                        <TableCell sx={{ width: '18%' }}>Salı</TableCell>
                        <TableCell sx={{ width: '18%' }}>Çarşamba</TableCell>
                        <TableCell sx={{ width: '18%' }}>Perşembe</TableCell>
                        <TableCell sx={{ width: '18%' }}>Cuma</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row,index) => (
                    <TableRow key={index}
                    >
                    <TableCell>{row.hour}</TableCell>
                    <TableCell>
                            {row.monday == "" ? "" : row.monday}
                        </TableCell>
                    <TableCell>
                            {row.tuesday == "" ? "": row.tuesday}</TableCell>
                    <TableCell>
                            {row.wednesday == "" ? "": row.wednesday}</TableCell>
                    <TableCell>
                            {row.thursday == "" ? "": row.thursday}</TableCell>
                    <TableCell>
                            {row.friday == "" ? "": row.friday}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
}