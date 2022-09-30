import { useEffect, useState } from "react";
import AssistantApi from "../api/assistantapi";
import LecturerApi from "../api/lecturerapi";
import StudentApi from "../api/studentapi";
import ClassInfoComponent from "./classinfo";
import { Box, Tab, Tabs, Typography} from "@mui/material";
import PropTypes from 'prop-types';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function MyCoursesContentComponent() {
    const studentApi = new StudentApi();
    const lecturerApi = new LecturerApi();
    const assistantApi = new AssistantApi();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [courses,setCourses] = useState([]);

    useEffect(() => {
        fetchCourses();
    });

    async function fetchCourses() {
        if(localStorage.getItem("role") === 'STUDENT') {
            const response = (await studentApi.getCourses()).data;
            setCourses(response);
        }
        else if(localStorage.getItem("role") === 'ASSISTANT') {
            const response = (await assistantApi.getCourses()).data;
            setCourses(response);
        }
        else if(localStorage.getItem("role") === 'LECTURER') {
            const response = (await lecturerApi.getCourses()).data;
            setCourses(response);
        }
    }
    return (
    
        <Box sx={{ width: '100%' , gridColumn: 'span 3'}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Derslerim" {...a11yProps(0)} />

            </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
            <div>
            {courses.map((row,index) => {return <ClassInfoComponent key={index} course={row}/>})}
            </div>    
        </TabPanel>
        </Box>
    
    );
}