import { Box, Tab, Tabs, Typography, IconButton} from "@mui/material";
import { useEffect, useState } from "react";
import CourseApi from "../api/courseapi";
import PropTypes from 'prop-types';
import AddIcon from '@mui/icons-material/Add';
import CourseDetailsComponent from "./coursedetails";
import CourseAssignmentsComponent from "./courseassignments";
import CourseAnnouncementsComponent from "./courseannouncements";
import CourseStudentsComponent from "./coursestudents";
import CourseSourcesComponent from "./coursesources";



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

export default function CoursePageContentComponent(props) {

    const courseApi = new CourseApi();
    const [course,setCourse] = useState({});
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    useEffect(() => {
        fetchCourse();
    }, []);

    async function fetchCourse() {
        const response = (await courseApi.getCourse(props.courseCode.toUpperCase())).data;
        setCourse(response);
        console.log(course)
    }

    return (
        <div style={{gridColumn: "span 3"}}>
            <Box sx={{ width: '100%' , gridColumn: 'span 3'}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
            <Tabs sx={{gridColumn: 'span 2'}}value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Ders Bilgileri" {...a11yProps(0)} />
            <Tab label="Ödev ve Sınavlar" {...a11yProps(1)} />
            <Tab label="Kaynaklar" {...a11yProps(2)} />
            <Tab label="Duyurular" {...a11yProps(2)} />
            </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
            
               <CourseDetailsComponent courseCode={props.courseCode}/> 

            </TabPanel>
            <TabPanel value={value} index={1}>
                <CourseAssignmentsComponent courseCode={props.courseCode}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <CourseSourcesComponent courseCode={props.courseCode}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <CourseAnnouncementsComponent courseCode={props.courseCode}/>
            </TabPanel>
            </Box>
        </div>
    );
}