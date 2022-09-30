import './App.css';
import LoginComponent from './components/loginpage';
import HomePageComponent from './components/homepage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AnnouncementPageComponent from './components/announcementpage';
import AttendedCoursesPageComponent from './components/attendedcoursepage';
import CoursesPageComponent from './components/coursespage';
import UsersPageComponent from './components/userspage';
import GradesPageComponent from './components/gradespage';
import ClassesPageComponent from './components/classespage';
import RoleContext from './context/rolecontext';
import { useState, useEffect } from 'react';
import CoursePageComponent from './components/coursepage';
import ExamPageComponent from './components/exampage';
import HwPageComponent from './components/hwpage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FooterComponent from './components/footer';
import EditProfilePageComponent from './components/editprofilepage';
import ProfilePageComponent from './components/profilepage';
import ChatPageComponent from './components/chatpage';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import MessageContext from './context/messagecontext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2F9C95',
    },
    secondary: {
      main: '#663F46',
    },
    background: {
      paper: '#E9ECEC',
      default: 'white',
    },
    warning: {
      main: '#E3D081',
    },
    info: {
      main: '#2F9C95',
    },
    success: {
      main: '#2F9C95',
    },
    text: {
      primary: '#3C362A',
      disabled: 'rgba(84,73,75,0.71)',
    },
  },
}
)



function App() {

  let stompClient = null;
  const [newMessage, setNewMessage] = useState(false);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState([]);
  const [privateMessages, setPrivateMessages] = useState(new Map());
  const [role,setRole] = useState('');
  const contextData = {
    stompClient,
    users,
    setUsers,
    message,
    setMessage,
    privateMessages,
    setPrivateMessages,
    role,
    setRole,
    newMessage,
    setNewMessage
  };


  useEffect(() => {
    connect();
  },[]);

  const connect = () => {
    if(localStorage.getItem('isLoggedIn') === "true" && localStorage.getItem('isConnected') !== "true") {
      let Sock = new SockJS('http://localhost:8080/ws-message');
      stompClient = over(Sock);
      stompClient.connect({},onConnected, onError);
      localStorage.setItem("isConnected","true");
    }
  }

  const onConnected = () => {
      stompClient.subscribe('/topic/message', onMessageReceived);
      stompClient.subscribe('/user/'+localStorage.getItem('username')+'/private', onPrivateMessage);
  }

  const onError = (err) => {
      console.log(err);
  }

  const onMessageReceived = (payload) => {
    const data = JSON.parse(payload.body);
    message.push(data);
    setMessage([...message]);
    setNewMessage(true);
    if(data.from === localStorage.getItem('username')) setNewMessage(false);
}

const onPrivateMessage = (payload) => { 
    const data = JSON.parse(payload.body);
    if(privateMessages.get(data.from)) {
        privateMessages.get(data.from).push(data);
        setPrivateMessages(new Map(privateMessages));
    }
    else {
        let list =[];
        list.push(data);
        privateMessages.set(data.from,list);
        users.push(data.from);
        setPrivateMessages(new Map(privateMessages));
        setUsers([...users]);
    }
    setNewMessage(true);
}
  

  return (
    <ThemeProvider theme={theme}>
    <RoleContext.Provider value={contextData}>
    <MessageContext.Provider value={contextData}>
    <div className='App'>
      
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePageComponent connect={connect} />}/>
        <Route path="login" element={<LoginComponent />}/>
        <Route path="announcements" element={<AnnouncementPageComponent />}/>
        <Route path="my_courses" element={<AttendedCoursesPageComponent />}/>
        <Route path="courses" element={<CoursesPageComponent />}/>
        <Route path="usersList" element={<UsersPageComponent usersMessage={users} setUsersMessage={setUsers}
        privateMessages={privateMessages} setPrivateMessages={setPrivateMessages}/>}/>
        <Route path="grades" element={<GradesPageComponent/>}/>
        <Route path="classes" element={<ClassesPageComponent/>}/>
        <Route path="my_courses/:course" element={<CoursePageComponent/>}/>
        <Route path="my_courses/:course/exam/:exam" element={<ExamPageComponent/>}/>
        <Route path="my_courses/:course/hw/:hw" element={<HwPageComponent/>}/>
        <Route path="editProfile" element={<EditProfilePageComponent/>}/>
        <Route path="usersList/:username" element={<ProfilePageComponent />}/>
        <Route path="messages" element={<ChatPageComponent stompClient={stompClient} users={users} setUsers={setUsers} 
        message = {message} setMessage={setMessage} privateMessages={privateMessages} setPrivateMessages={setPrivateMessages}/>}/>

      </Routes>
    </BrowserRouter>
    
    </div>
    </MessageContext.Provider>
    </RoleContext.Provider>
    <FooterComponent/>
    </ThemeProvider>
  );
}

export default App;
