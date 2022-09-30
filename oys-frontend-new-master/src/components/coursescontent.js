import { Box, Tab, Tabs, Typography} from "@mui/material";
import { useState } from "react";
import PropTypes from 'prop-types';
import CourseSearchComponent from "./searchcourse";
import CoursesListComponent from "./courseslist";
import AddNewCourseClassesTableComponent from "./addnewcourseclasses";


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
export default function CoursesContentComponent() {
    
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };



    return (
        <Box sx={{ width: '100%' , gridColumn: 'span 3'}}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Tüm Dersler" {...a11yProps(0)} />
            {localStorage.getItem("role") === 'ADMIN' ? <Tab label="Yeni Ders Ekle" {...a11yProps(1)} />: ""}
            </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
                <CourseSearchComponent />
                <CoursesListComponent />        
        </TabPanel>
        <TabPanel value={value} index={1}>
            <AddNewCourseClassesTableComponent setValue={setValue}/>
        </TabPanel>
        </Box>
    );
}