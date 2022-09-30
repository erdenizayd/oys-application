import { FormControl, InputLabel, Select, MenuItem, Button, Modal, Box, Snackbar, Alert} from "@mui/material";
import React, { useEffect, useState } from "react";
import CourseTimeTableComponent from "./addcoursestimetable";
import { RoomApi } from "../api/roomapi";
import AddNewCourseFormComponent from "./addnewcourseform";
import CourseApi from "../api/courseapi";

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

export default function EditCourseTimeTableComponent(props) {

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

    function handleClicked(index,secIndex,text) {
        if(text === "" && index !== 4){
            let tempTable = [...props.clicked];
            tempTable[index][secIndex] = !tempTable[index][secIndex];
            setClicked(tempTable);
        }
        getHourList();
    }

    

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
            setHourList(newList);
            props.setHourList(newList);
    }

    async function fetchClasses() {
        const response = (await roomApi.getRooms()).data;
        setClasses(response);
    }

    function handleChange(event) {
        setCurrentClass(event.target.value);
        props.setCurrentClass(event.target.value)
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
        {(currentClass && <div><CourseTimeTableComponent clicked={clicked} setClicked={handleClicked} rows={rows}/>
        </div>
            )}
        </div>
    );
}