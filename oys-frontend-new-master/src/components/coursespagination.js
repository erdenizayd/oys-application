import Pagination from '@mui/material/Pagination';
import { PaginationItem } from '@mui/material';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function CoursesPaginationComponent(props) {
    return (
        <Stack spacing={2} sx={{marginTop: "10px", gridColumn: "span 3"}} alignItems="center">
          <Pagination
            count={props.pageCount}
            page={props.page}
            onChange={props.handleChange}
            renderItem={(item) => (
              <PaginationItem
                components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Stack>
    );
}