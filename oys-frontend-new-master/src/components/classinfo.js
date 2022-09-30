import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router";
function ClassInfoComponent(props) {

    const [sx, setSx] = useState({
        marginBottom: "20px",
        backgroundColor: "#DEE3E3",
        borderRadius: "7px",
        padding: 2,
        transitionDuration: "0.5s",
        "&:hover": {
            boxShadow: "2px 2px 5px #a5a5a5"

        }
    });

    let navigate = useNavigate();

    function handleClick() {
        navigate("/my_courses/" + props.course.code.toLowerCase());
    }

    return (
        <Box onClick={handleClick} sx={sx}>
            <Typography variant="h6">
                {props.course.code + " - "} 
             {props.course.name}</Typography>
             <Divider sx={{margin:'10px 0 10px 0'}}/>
            <Typography variant="body2">
                {"Öğretim Görevlisi: " + props.course.lecturerName}
            </Typography>
            </Box>
    );
}

export default ClassInfoComponent;