import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";

function AnnouncementComponent(props) {
    


    return (
        <Box sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: ' auto auto'
        }}>
        <Box  sx={{
            backgroundColor: "#e4e4e4",
            gridColumn:"span 2",
            padding: 1,
            margin: '10px 0 10px 0',
            borderRadius: '3px'
        }}>
            <Box sx={{
            backgroundColor: "#F4F6F6",
            gridColumn:"span 2",
            borderRadius: '3px',
            marginBottom: "10px",
            padding: "20px"
        }}>
            <Typography sx={{display: 'inline'}}><a style={{textDecoration: 'none'}} href={"/usersList/" + props.announcement.author}>{props.announcement.author}</a></Typography>
            <Typography sx={{float: 'right', display: 'inline'}}>{props.announcement.postDate.split('T')[0] }</Typography>
            
        </Box>
        <Box sx={{
            backgroundColor: "#F4F6F6",
            gridColumn:"span 2",
            borderRadius: '3px',
            padding: "20px"
        }}>
            <Typography variant="h6">{props.announcement.title}</Typography>
            <Divider sx={{margin: '10px 0 10px 0'}}/>
            <Typography sx={{whiteSpace: 'pre-wrap'}}>{props.announcement.announcement}</Typography>
            
        </Box>
        </Box>
        </Box>
        
    );
}

export default AnnouncementComponent;