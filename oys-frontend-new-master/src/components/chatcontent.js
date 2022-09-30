import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import MessageApi from '../api/messageapi';
import { List, ListItem, ListItemText, TextField, Tabs, Tab, Typography, Box } from '@mui/material';
import MessageContext from '../context/messagecontext';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, }}>
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function ChatContentComponent() {
    const [value, setValue] = useState(0);
    const {
        stompClient, users, setUsers, message, setMessage, privateMessages, setPrivateMessages
    } = useContext(MessageContext);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    console.log(privateMessages);
    const messageApi = new MessageApi();
    const [text, setText] = useState('');

    const handleText = (e) => {
        setText(e.target.value);
    }

    async function handleSubmitPrivate(e,u) {
        e.preventDefault();
        if(text !== ""){
            const msg = {
                to: u,
                from: localStorage.getItem('username'),
                text: text
            };

            const response = (await messageApi.sendPrivateMessage(msg)).data;
            privateMessages.get(u).push(response);
            setPrivateMessages(new Map(privateMessages));
            
            setText("");
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if(text !== ""){
            const msg = {
                to: "",
                from: localStorage.getItem('username'),
                text: text
            };

            const response = (await messageApi.sendMessage(msg)).data;
            setText("");
        }
    }
  
    return (
      <Box
        sx={{display: 'grid', gridTemplateColumns: '10% 90%', gridColumn: 'span 3'}}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: 'divider', gridColumn: '1' }}
        >
            <Tab label="Genel" {...a11yProps(0)} />
            {users.map((m,index) => {
              return <Tab label={m} {...a11yProps(index+1)}/>  
            })}
        </Tabs>
        <TabPanel sx={{width: '100%', background: 'black', gridColumn: '2'}} value={value} index={0}>
        <Box
            sx={{
                display: 'grid',
                gridTemplateRows: '85% 15%',
                width: '100%',
                height: '600px'
            }}
        >
            <Box
            sx={{
                display: 'flex',
                flexDirection: 'column-reverse',
                gridRow: '1',
                overflow: 'auto',
                padding: 2,
                borderRadius: '5px',
                borderStyle: 'solid',
                borderColor: '#b3b5b5',
                borderWidth: '1px',
                marginBottom: '20px'
            }}>
            <List>
            {message.map((m) => (
                <Box sx={{
                    display: 'block',
                    float: (m.from === localStorage.getItem('username') ? 'right': 'left'),
                    width: '100%'
                }}>
                <ListItem 
                sx={{
                    padding: 1,
                    display: 'inlineBlock',
                    float: (m.from === localStorage.getItem('username') ? 'right': 'left'),
                    maxWidth: '54%',
                    borderRadius: '5px'
                }}
                disablePadding key={m.text}>
                    <ListItemText
                        primary={<div>
                            <Typography
                align={(m.from === localStorage.getItem('username') ? 'right': 'left')}

                            sx={{ 
                                width: '100%',
                                color: '#2f9c95',
                                display: 'block',
                                margin: '2px'
                            }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                            >
                                {m.from}
                            </Typography>
                            <Typography
                            sx={{
                                padding: 1,
                                display: 'block',
                                float: (m.from === localStorage.getItem('username') ? 'right': 'left'),
                                backgroundColor: '#d6d6d6',
                                borderRadius: '5px',
                                maxWidth: '100%'
                            }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                            >
                                {m.text}
                            </Typography>
                        </div>
                            
                        }
                    />
                </ListItem>
                </Box>
            ))}
            </List>
            </Box>
            <form onSubmit={handleSubmit}>
                <TextField
                    sx={{
                        gridRow: '2',
                        width: '100%'
                    }}
                    value={text}
                    onChange={handleText}
                />
            </form>
        </Box>
        </TabPanel>
        {users.map((m,index) => { return (
            <TabPanel sx={{width: '100%', gridColumn: '2'}} value={value} index={index+1}>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateRows: '85% 15%',
                    width: '100%',
                    height: '600px'
                }}
            >
                <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    gridRow: '1',
                    overflow: 'auto',
                    padding: 2,
                    borderRadius: '5px',
                    borderStyle: 'solid',
                    borderColor: '#b3b5b5',
                    borderWidth: '1px',
                    marginBottom: '20px'
                }}>
                <List>
                {privateMessages.get(m).map((u) => (
                    <Box sx={{
                        display: 'block',
                        float: (u.from === localStorage.getItem('username') ? 'right': 'left'),
                        width: '100%'
                    }}>
                    <ListItem 
                    sx={{
                        padding: 1,
                        display: 'inlineBlock',
                        float: (u.from === localStorage.getItem('username') ? 'right': 'left'),
                        maxWidth: '54%',
                        borderRadius: '5px'
                    }}
                    disablePadding key={index}>
                        <ListItemText
                            primary={<div>
                                <Typography
                    align={(u.from === localStorage.getItem('username') ? 'right': 'left')}
    
                                sx={{ 
                                    width: '100%',
                                    color: '#2f9c95',
                                    display: 'block',
                                    margin: '2px'
                                }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                                >
                                    {u.from}
                                </Typography>
                                <Typography
                                sx={{
                                    padding: 1,
                                    display: 'block',
                                    float: (u.from === localStorage.getItem('username') ? 'right': 'left'),
                                    backgroundColor: '#d6d6d6',
                                    borderRadius: '5px',
                                    maxWidth: '100%'
                                }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                                >
                                    {u.text}
                                </Typography>
                            </div>
                                
                            }
                        />
                    </ListItem>
                    </Box>
                ))}
                </List>
                </Box>
                <form onSubmit={(e) => {handleSubmitPrivate(e,m)}}>
                    <TextField
                        sx={{
                            gridRow: '2',
                            width: '100%'
                        }}
                        value={text}
                        onChange={handleText}
                    />
                </form>
            </Box>
            </TabPanel> )
        })}

      </Box>
    );
}