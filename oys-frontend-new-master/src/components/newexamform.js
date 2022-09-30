import { TextField, FormControl, InputLabel, Select, MenuItem, Button, Typography } from "@mui/material";
import { RoomApi } from "../api/roomapi";
import { useState, useEffect } from "react";
import ExamApi from "../api/examapi";
import { toast } from "react-toastify";

export default function NewExamFormComponent(props) {
    const examApi = new ExamApi();
    const roomApi = new RoomApi();
    const [classes, setClasses] = useState([]);
    const [currentClass, setCurrentClass] = useState('');
    const [date,setDate] = useState('');
    const [time,setTime] = useState('');
    const [name,setName] = useState("");
    const [details,setDetails] = useState("");

    function handleChange(event) {
        setCurrentClass(event.target.value);
    };

    useEffect(() => {
        fetchClasses();
    }, [])

    async function fetchClasses() {
        const response = (await roomApi.getRooms()).data;
        setClasses(response);
    }

    async function handleClick() {
        const request = {
            name: name,
            details: details,
            roomName: currentClass,
            date: date,
            time: time,
            courseCode: props.courseCode.toUpperCase(),
            roomName: currentClass
        }
        
        const response = (await examApi.addExam(request)).data;

        if(response.response === 'SUCCESS') {
            props.handleClose();
            props.refresh();
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
        else if(response.response === 'WARNING') {
            props.handleClose();
            props.refresh();
            toast.warning(response.message,{
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
        }
        else if(response.response === 'ERROR') {
            toast.error(response.message,{
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
        <div style={{padding: '10px'}}>
            <Typography
            align='center'
                sx={{marginBottom: '10px'}}
            >Yeni Sınav Ekle</Typography>
            <TextField
            sx={{width: '100%',
            marginBottom: '10px'}}
                onChange={(e) => setName(e.target.value)}
                required
                name="name"
                id="name"
                label="Sınav Adı:"
            />
            <TextField
            sx={{width: '100%',
            marginBottom: '10px'}}
                onChange={(e) => setDetails(e.target.value)}
                required
                name="details"
                id="details"
                label="Detay"
            />
            <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="select-a-class">Sınıflar</InputLabel>
            <Select
            sx={{width: '100%', marginBottom: '10px'}}
            labelId="select-a-class-label"
            id="select-a-class"
            value={currentClass}
            onChange={handleChange}
            label="Class"
            >
               { classes.map((e) => {return <MenuItem value={e.name}>{e.name}</MenuItem>})}
            </Select>
            </FormControl>
            <div style={{width:'100%', alignContent: 'center'}}>
            <input className='examForm' type="date" onChange={(e) => setDate(e.target.value)}/>
            <input className='examForm' type="time" onChange={(e) => setTime(e.target.value)}/>
            </div>
            <Button variant='contained' sx={{width: '100%', marginBottom: '10px', marginTop: '10px'}} onClick={handleClick}>Sınav Ekle</Button>

        </div>

    );
}