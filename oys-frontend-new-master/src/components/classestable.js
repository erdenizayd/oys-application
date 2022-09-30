import { FormControl, InputLabel, Select, MenuItem, Button, Box, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ClassesTimeTableComponent from "./classestimetable";
import { RoomApi } from "../api/roomapi";
import AddNewClassComponent from "./addnewclass";

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

export default function ClassesTableComponent() {

    const roomApi = new RoomApi();
    const [classes, setClasses] = useState([]);
    const [currentClass, setCurrentClass] = useState('');
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
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    function createRows(course) {
        const newRows = [...rows];

        switch(course.dayOfWeek){
            case 1:
                newRows[course.hour - 1].monday = course.courseName;
                break;
            case 2:
                newRows[course.hour - 1].tuesday = course.courseName;
                break;
            case 3:
                newRows[course.hour - 1].wednesday = course.courseName;
                break;
            case 4:
                newRows[course.hour - 1].thursday = course.courseName;
                break;
            case 5:
                newRows[course.hour - 1].friday = course.courseName;
                break;
        }

        setRows(newRows);
    }

    useEffect(() => {
        fetchClasses();
    }, [])

    async function fetchClasses() {
        const response = (await roomApi.getRooms()).data;
        setClasses(response);
    }

    const handleChange = (event) => {
        setCurrentClass(event.target.value);
        setRows(emptyRows);
        fetchTable(event.target.value.name);
    };

    async function fetchTable(name) {
        const response = (await roomApi.getRoom(name)).data;
        response.map((e) => createRows(e));
    }

    return (
        <div className="classestable">
        {localStorage.getItem("role") === 'ADMIN' ? <div><Button sx={{float: 'right'}} onClick={() => setOpen(true)}>Sınıf Ekle</Button>
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <Typography align='center'>Yeni Sınıf Ekle</Typography>
                <Box
                sx={{
                    marginTop   : "20px",
                }}
                >
                    <AddNewClassComponent setOpen={setOpen}/>
                </Box>
                </Box>
            </Modal> 
        </div>: ""}
        <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="select-a-class">Sınıflar</InputLabel>
            <Select
            labelId="select-a-class-label"
            id="select-a-class"
            value={currentClass}
            onChange={handleChange}
            label="Class"
            >
               { classes.map((e,index) => {return <MenuItem key={index} value={e}>{e.name}</MenuItem>})}
            </Select>
        </FormControl>
        {(currentClass && <ClassesTimeTableComponent class={currentClass} rows={rows}/>
            )}
        </div>
    );
}