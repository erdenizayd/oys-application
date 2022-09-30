import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import StudentApi from '../api/studentapi';

import { differenceInCalendarDays } from 'date-fns';
import { useNavigate } from 'react-router';
import { Divider, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/system';

function isSameDay(a, b) {
  return differenceInCalendarDays(a, b) === 0;
}

function ReminderComponent() {
    const [value, setValue] = useState(new Date());
    const studentApi = new StudentApi();
    const [dates,setDates] = useState([]);
    const [dateObj, setDateObj] = useState([]);
    const [recent, setRecent] = useState([]);
    let navigate = useNavigate();

    function onChange(nextValue) {
        setValue(nextValue);
    }

    function tileContent({ date, view }) {
        if (view === 'month') {
          if (dates.find(dDate => isSameDay(dDate, date))) {
            return '';
          }
        }
      }
    
    function tileClassName({ date, view }) {
      if (view === 'month') {
        if (dates.find(dDate => isSameDay(dDate, date))) {
          return 'importantDate';
        }
      }
    }

    function checkDate(dates) {
      const tempRecent = [];
      const today = new Date();
      const tenDaysAfter = new Date();
      tenDaysAfter.setDate(tenDaysAfter.getDate() + 10);
      dates.forEach(d => {
        if(( new Date(d.date) > today) && (new Date(d.date) < tenDaysAfter)) {
          tempRecent.push(d);
        }
      });
      
      setRecent(tempRecent);

    }
    
    useEffect(() => {
        if(localStorage.getItem("role") === 'STUDENT')(fetchDates());
    },[]);

    async function fetchDates() {
        const response = (await studentApi.getImportantDates()).data;
        const newDates = [];
        response.map(d => newDates.push(Date.parse(d.date)));
        checkDate(response);
        setDates(newDates);
        setDateObj(response);
    }

    function handleClick(date,event) {
        dateObj.forEach((dDate) => {
            if(isSameDay(Date.parse(dDate.date), date)) {
                navigate(dDate.address);
            }
        })
    }


    return (
        <div className="reminder">
            <Calendar
            onClickDay={handleClick}
            onChange={onChange}
            value={value}
            tileContent={tileContent}
            tileClassName={tileClassName}/>
            <Box sx={{margin: "auto",  marginTop: '20px', backgroundColor: "#F4F6F6", padding: 2,
          borderRadius: '7px'}}>
            <List>
              
            
            <Typography align='center' gutterBottom>Yaklaşan Ödev ve Sınavlar</Typography>
            <Divider/>

            {recent.map(d => {
                  return <ListItemButton onClick={() => {window.open(d.address, "_self")}}>
                    <ListItemText primary={d.name}/>
                    <ListItemText primary={d.date}/>
                  </ListItemButton>
                }
              )
            }
            </List>
            </Box>
        </div>
    );
}

export default ReminderComponent;