import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useState } from "react";
import { Button } from '@mui/material';


export default function CourseTimeTableComponent(props) {

    function handleClick(index,secIndex,text) {
        if(text === "" && index !== 4){
            let tempTable = [...props.clicked];
            tempTable[index][secIndex] = !tempTable[index][secIndex];
            props.setClicked(tempTable);
        }
    }

    return (
        <TableContainer component={Paper} sx={{width: '100%', margin: 'auto', marginTop: '20px'}} >
            <Table sx={{ }} aria-label="simple table">
                <TableHead>
                    <TableRow >
                        <TableCell sx={{ width: '10%' }}>Saatler</TableCell>
                        <TableCell sx={{ width: '18%' }}>Pazartesi</TableCell>
                        <TableCell sx={{ width: '18%' }}>Salı</TableCell>
                        <TableCell sx={{ width: '18%' }}>Çarşamba</TableCell>
                        <TableCell sx={{ width: '18%' }}>Perşembe</TableCell>
                        <TableCell sx={{ width: '18%' }}>Cuma</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {props.rows.map((row,index) => (
                    <TableRow
                    >
                    <TableCell>{row.hour}</TableCell>
                    <TableCell sx={props.clicked[index][0] ? 
                        {backgroundColor: "#2F9C95"} :
                        {}} onClick={() => handleClick(index,0, row.monday)}>
                            {row.monday == "" ? "" : row.monday}
                        </TableCell>
                    <TableCell sx={props.clicked[index][1] ? 
                        {backgroundColor: "#2F9C95"} :
                        {}} onClick={() => handleClick(index,1,row.tuesday)}>
                            {row.tuesday == "" ? "": row.tuesday}</TableCell>
                    <TableCell sx={props.clicked[index][2] ? 
                        {backgroundColor: "#2F9C95"} :
                        {}} onClick={() => handleClick(index,2,row.wednesday)}>
                            {row.wednesday == "" ? "": row.wednesday}</TableCell>
                    <TableCell sx={props.clicked[index][3] ? 
                        {backgroundColor: "#2F9C95"} :
                        {}} onClick={() => handleClick(index,3,row.thursday)}>
                            {row.thursday == "" ? "": row.thursday}</TableCell>
                    <TableCell sx={props.clicked[index][4] ? 
                        {backgroundColor: "#2F9C95"} :
                        {}} onClick={() => handleClick(index,4,row.friday)}>
                            {row.friday == "" ? "": row.friday}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}