import { TextField } from "@mui/material";

function CourseSearchComponent() {
    return (
        <div>
            <span><TextField id="standard-basic" label="Ders Kodu" variant="standard" margin='dense' sx={{marginRight: '30px'}} /></span>
            <span><TextField id="standard-basic" label="Ders Adı" variant="standard" margin='dense' /></span>
        </div>
    );
}

export default CourseSearchComponent;