import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useState } from "react";
import { Button, Chip, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';

export default function ClassesTimeTableComponent(props) {

    const exists = (label) => {
        return <Chip variant="outlined" sx={{marginLeft: '5px', marginRight:'5px'}} icon={<CheckIcon/>} label={label} color="primary"/>
    }
    const doesntExist = (label) => {
        return <Chip variant="outlined" sx={{marginLeft: '5px', marginRight:'5px'}} icon={<CloseIcon/>} label={label} color="error"/>
    }


    return (
        <div>
            <div style={{margin: 'auto', width: 'max-content'}}>
            {props.class.computerExists ? exists("Bilgisayar") : doesntExist("Bilgisayar")} 
            {props.class.projectionExists ? exists("Projeksiyon") : doesntExist("Projeksiyon")} 
            {props.class.ventilationExists ? exists("Havalandırma") : doesntExist("Havalandırma")} 
            {props.class.windowExists ? exists("Pencere") : doesntExist("Pencere")}
            <Chip variant="outlined" sx={{marginLeft: '5px', marginRight:'5px'}} icon={<PersonIcon/>} label={"Kapasite: " + props.class.capacity} color="primary"/>
            </div>

        <TableContainer component={Paper} sx={{width: '90%', margin: 'auto', marginTop: '20px'}} >
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
                    <TableRow key={index}
                    >
                    <TableCell>{row.hour}</TableCell>
                    <TableCell>{row.monday}</TableCell>
                    <TableCell>{row.tuesday}</TableCell>
                    <TableCell>{row.wednesday}</TableCell>
                    <TableCell>{row.thursday}</TableCell>
                    <TableCell>{row.friday}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    );
}