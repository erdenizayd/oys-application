import { useEffect, useState } from "react";
import AssistantApi from "../api/assistantapi";
import LecturerApi from "../api/lecturerapi";
import StudentApi from "../api/studentapi";
import { TableContainer, TableRow, TableCell, TableBody, Table, TableHead, Paper, Modal, Box, TextField, Button} from "@mui/material";
import { Schedule } from "@mui/icons-material";

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

export default function ProfileTimetableComponent(props) {

    const lecturerApi = new LecturerApi();
    const studentApi = new StudentApi();
    const assistantApi = new AssistantApi();
    const [refresh, setRefresh] = useState(false);

    const [activity, setActivity] = useState('');
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

    const [clicked, setClicked] = useState(['','']);

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
    }

    useEffect(() => {
        fetchTable();
    }, [refresh])

    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleOpenDelete = () => setOpenDelete(true);
    const handleCloseDelete = () => setOpenDelete(false);

    async function fetchTable() {
        let response = '';
        switch(localStorage.getItem("role")) {
            case 'STUDENT':
                response = (await studentApi.getSchedule(localStorage.getItem('username'))).data;
                response.map((e) => createRows(e));
                break;
            case 'ASSISTANT':
                response = (await assistantApi.getSchedule(localStorage.getItem('username'))).data;
                response.map((e) => createRows(e));
                break;
            case 'LECTURER':
                response = (await lecturerApi.getSchedule(localStorage.getItem('username'))).data;
                response.map((e) => createRows(e));
                break;
            default:
                break;
        }
    }

    function handleClick(index,secIndex,text) {
        if(text === "" && index !== 4){
            const tempClicked = [index,secIndex];
            setClicked(tempClicked);
            handleOpen();
        }
        else if(text !== "") {
            const tempClicked = [index, secIndex];
            setClicked(tempClicked);
            handleOpenDelete();
        }
    }

    async function handleSubmit() {
        const request = {
            detail: activity,
            dayOfWeek: clicked[1]+1,
            hour: clicked[0]+1
        }
        let response = '';

        switch(localStorage.getItem("role")) {
            case 'STUDENT':
                response = (await studentApi.updateSchedule(localStorage.getItem('username'), request)).data;
                break;
            case 'ASSISTANT':
                response = (await assistantApi.updateSchedule(localStorage.getItem('username'), request)).data;
                break;
            case 'LECTURER':
                response = (await lecturerApi.updateSchedule(localStorage.getItem('username'), request)).data;
                break;
            default:
                break;
        }
        setRefresh(!refresh);
        console.log(response);
        handleClose();
    }

    async function handleSubmitDelete() {
        const request = {
            detail: "",
            dayOfWeek: clicked[1]+1,
            hour: clicked[0]+1
        }
        let response = '';

        switch(localStorage.getItem("role")) {
            case 'STUDENT':
                response = (await studentApi.deleteSchedule(localStorage.getItem('username'), request)).data;
                break;
            case 'ASSISTANT':
                response = (await assistantApi.deleteSchedule(localStorage.getItem('username'), request)).data;
                break;
            case 'LECTURER':
                response = (await lecturerApi.deleteSchedule(localStorage.getItem('username'), request)).data;
                break;
            default:
                break;
        }
        setRefresh(!refresh);
        console.log(response);
        handleCloseDelete();
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
                    <TableCell onClick={() => handleClick(index,0, row.monday)}>
                            {row.monday == "" ? "" : row.monday}
                        </TableCell>
                    <TableCell onClick={() => handleClick(index,1, row.tuesday)}>
                            {row.tuesday == "" ? "": row.tuesday}</TableCell>
                    <TableCell onClick={() => handleClick(index,2, row.wednesday)}>
                            {row.wednesday == "" ? "": row.wednesday}</TableCell>
                    <TableCell onClick={() => handleClick(index,3, row.thursday)}>
                            {row.thursday == "" ? "": row.thursday}</TableCell>
                    <TableCell onClick={() => handleClick(index,4, row.friday)}>
                            {row.friday == "" ? "": row.friday}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>

        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <TextField
                    sx={{marginBottom: '20px', gridColumn: 2}}
                    onChange={(e) => {setActivity(e.target.value)}}
                    name="detail"
                    id="outlined"
                    label="Aktivite"
                    />
                    <Button variant="contained" onClick={handleSubmit}>Aktivite Ekle</Button>
                </Box>
        </Modal>  

        <Modal
                open={openDelete}
                onClose={handleCloseDelete}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Button variant="contained" onClick={handleSubmitDelete}>Aktiviteyi Sil</Button>
                </Box>
        </Modal>  

        </div>
    );
}