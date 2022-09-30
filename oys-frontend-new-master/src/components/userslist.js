import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IconButton, Tooltip } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import React, { useContext, useEffect, useState } from "react";
import UserApi from '../api/userapi';
import UsersPaginationComponent from './userspagination';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import MessageContext from '../context/messagecontext';

function UsersListComponent(props) {

    let navigate = useNavigate();
    const {users, setUsers, privateMessages, setPrivateMessages} = useContext(MessageContext);
    const [usersList, setUsersList] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const userApi = new UserApi();

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        fetchUsers();
    }, [props.response,isUpdated,props.usernameSearch, props.nameSearch]);

    async function fetchUsers() {
        if(props.nameSearch === '' && props.usernameSearch === ''){
            const response = (await userApi.getUsers(page-1)).data;
            setIsUpdated(!isUpdated);
            setUsersList(response);
            if(response.length > 0)setPageCount(response[0].pageCount);
        }
        else if(props.usernameSearch === '') {
            const response = (await userApi.getUsersByName(page-1,props.nameSearch)).data;
            setIsUpdated(!isUpdated);
            setUsersList(response);
            if(response.length > 0)setPageCount(response[0].pageCount);
        }
        else if(props.nameSearch === '') {
            const response = (await userApi.getUsersByUsername(page-1,props.usernameSearch)).data;
            setIsUpdated(!isUpdated);
            setUsersList(response);
            if(response.length > 0)setPageCount(response[0].pageCount);
        }
        else {
            const response = (await userApi.getUsersByNameAndUsername(page-1,props.nameSearch,props.usernameSearch)).data;
            setIsUpdated(!isUpdated);
            setUsersList(response);
            if(response.length > 0)setPageCount(response[0].pageCount);
        }
        
    }

    async function disableUser(id) {
        const response = (await userApi.disableUser(id)).data;
        setIsUpdated(!isUpdated);
        toast.success("Kullanıcı hesabı deaktive edildi.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
    }

    async function enableUser(id) {
        const response = (await userApi.enableUser(id)).data;
        setIsUpdated(!isUpdated);
        toast.success("Kullanıcı hesabı aktive edildi.", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
    }

    function handleNewMessage(username) {
        if(!users.includes(username)) {
            let list = [];
            privateMessages.set(username,list);
            setPrivateMessages(new Map(privateMessages));
            users.push(username);
            setUsers([...users]);
        }
        navigate("/messages");
    }

    return (
        <div>
        <TableContainer sx={{width: '100%', margin: 'auto', marginTop: '20px', gridColumn: 'span 3'}} >
            <Table sx={{ }} aria-label="simple table">
                <TableHead>
                    <TableRow >
                        <TableCell sx={{ width: '40%' }}>İsim</TableCell>
                        <TableCell sx={{ width: '45%' }}>Kullanıcı Adı</TableCell>
                        <TableCell sx={{ width: '15%' }}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {usersList.map((row,index) => (
                    <TableRow hover key={index}>
                    <TableCell onClick={() => {navigate("/usersList/" + row.username)}}>{row.name}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>
                        <IconButton onClick={() => {handleNewMessage(row.username)}}><EmailIcon/></IconButton>
                        {(localStorage.getItem("role") === 'ADMIN') &&
                        <Tooltip title={row.isEnabled ? "Deaktive et" : "Aktive et"}>
                        <IconButton color={row.isEnabled ? "inherit" : "error"} 
                        onClick={() => {row.isEnabled ? disableUser(row.id) : enableUser(row.id)}}><DoDisturbIcon/></IconButton>
                        </Tooltip>}
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <UsersPaginationComponent pageCount={pageCount} page={page} handleChange={handlePageChange}/>
        </div>
    );
}

export default UsersListComponent;