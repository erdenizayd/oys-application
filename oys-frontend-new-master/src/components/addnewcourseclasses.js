import { FormControl, InputLabel, Select, MenuItem, Button, Modal, Box, Snackbar, Alert} from "@mui/material";
import React, { useEffect, useState } from "react";
import CourseTimeTableComponent from "./addcoursestimetable";
import { RoomApi } from "../api/roomapi";
import AddNewCourseFormComponent from "./addnewcourseform";
import CourseApi from "../api/courseapi";
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

export default function AddNewCourseClassesTableComponent(props) {

    const roomApi = new RoomApi();
    const [type, setType] = useState('');
    const courseApi = new CourseApi();
    const [classes, setClasses] = useState([]);
    const [currentClass, setCurrentClass] = useState('');
    const [response, setResponse] = useState({});

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
            monday: "Öğle Arası",
            tuesday: "Öğle Arası",
            wednesday: "Öğle Arası",
            thursday: "Öğle Arası",
            friday: "Öğle Arası"
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
            monday: "Öğle Arası",
            tuesday: "Öğle Arası",
            wednesday: "Öğle Arası",
            thursday: "Öğle Arası",
            friday: "Öğle Arası"
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

    const [clicked,setClicked] = useState([
        [false,false,false,false,false],
        [false,false,false,false,false],
        [false,false,false,false,false],
        [false,false,false,false,false],
        [false,false,false,false,false],
        [false,false,false,false,false],
        [false,false,false,false,false],
        [false,false,false,false,false],
        [false,false,false,false,false]
    ]);

    const [hourList, setHourList] = useState([]);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        getHourList();
    };
    const handleClose = () => setOpen(false);

    

    function createRows(course) {
        const newRows = [...emptyRows];

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
    }, [response,rows])

    function getHourList() {
        const newList = [];
        for(let i = 0; i < 9; i++) {
            for(let j = 0; j < 5; j++) {
                if(clicked[i][j] == true) {
                    newList.push({"first": j+1 , "second": i+1});
                }
            }
        }
        if(newList.length === 0) toast.error("Ders oluşturmak için öncelikle saat seçmelisiniz.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        else {
            setHourList(newList);
            setOpen(true);
        }
    }

    async function createCourse(formState) {
        const request = {
            name: formState.name,
            about: formState.about,
            type: type,
            code: formState.code.toUpperCase(),
            courseHourList: hourList,
            roomName: currentClass,
            lecturerName: formState.lecturerName
        };
        const response = (await courseApi.createCourse(request)).data;
        setResponse(response);
        console.log(response);
        if(response.response === "SUCCESS") toast.success(response.message,{
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                } );
        else toast.error(response.message,{
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            } );
        props.setValue(0);
        
    }

    async function fetchClasses() {
        const response = (await roomApi.getRooms()).data;
        setClasses(response);
    }

    function handleChange(event) {
        setCurrentClass(event.target.value);
        fetchTable(event.target.value);
    };

    async function fetchTable(name) {
        const response = (await roomApi.getRoom(name)).data;
        setRows(emptyRows);
        response.map((e) => createRows(e));
    }

    

    return (
        <div className="classestable">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
            <InputLabel id="select-a-class">Sınıflar</InputLabel>
            <Select
            labelId="select-a-class-label"
            id="select-a-class"
            value={currentClass}
            onChange={handleChange}
            label="Class"
            >
               { classes.map((e) => {return <MenuItem value={e.name}>{e.name}</MenuItem>})}
            </Select>
        </FormControl>
        
        {(currentClass && <div><CourseTimeTableComponent clicked={clicked} setClicked={setClicked} rows={rows}/>
        <Button onClick={handleOpen} 
            sx= {{float:"right", marginTop:'20px'}}
            variant="contained">Ders Ekle</Button>
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <AddNewCourseFormComponent setType={setType} type={type} handleClose={handleClose} submit={createCourse}/>
                </Box>
            </Modal>  
        </div>
            )}

        </div>
    );
}