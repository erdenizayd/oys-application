import { Box, Tab, Tabs, Typography, Button, Modal} from "@mui/material";
import { useState } from "react";
import PropTypes from 'prop-types';
import UsersListComponent from "./userslist";
import UsersSearchComponent from "./userssearch";
import AddNewUserComponent from "./addnewuser";

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

export default function UsersContentComponent(props) {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const [response, setResponse] = useState('');
    const [open, setOpen] = useState(false);
    const handleOpen = () => {setOpen(true); setResponse();};
    const handleClose = () => setOpen(false);
    const [nameSearch, setNameSearch] = useState('');
    const [usernameSearch, setUsernameSearch] = useState('');

    return (
        <Box sx={{ width: '100%' , gridColumn: 'span 3'}}>
                        <Box sx={{ width: '100%' , gridColumn: 'span 3'}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
            <Tabs sx={{gridColumn: 'span 2'}}value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Kullanıcılar" {...a11yProps(0)} />

            </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
            
            <UsersSearchComponent handleOpen={handleOpen}
            nameSearch={nameSearch}
            usernameSearch={usernameSearch} 
            setNameSearch={setNameSearch} 
            setUsernameSearch={setUsernameSearch}/>
            <UsersListComponent 
            response={response}
            nameSearch={nameSearch}
            usernameSearch={usernameSearch} />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={style}>
                    <AddNewUserComponent setOpen={setOpen} response={response} setResponse={setResponse}/>        
                </Box>
            </Modal>  

            </TabPanel>

            </Box>
            
        </Box>
    );
}