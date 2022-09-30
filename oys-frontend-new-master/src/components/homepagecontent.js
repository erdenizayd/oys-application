import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { useTheme } from '@emotion/react';
import AnnouncementApi from '../api/announcementapi';
import MainAnnouncementComponent from './mainannouncement';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


export default function HomepageContentComponent() {
    const announcementApi = new AnnouncementApi();
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [steps, setSteps] = useState(0);
    const [announcements,setAnnouncements] = useState([]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        fetchAnnouncements();
    }, []);

    async function fetchAnnouncements() {
        const response = (await announcementApi.getAnnouncements(page-1)).data;
        setAnnouncements(response);
        setSteps(response.length);
        if(response.length > 0) setPageCount(response[0].pageCount);
    }
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    const handleStepChange = (step) => {
      setActiveStep(step);
    };
  
    return (
      <Box sx={{ gridColumn: 'span 3', flexGrow: 1 }}>
        {announcements.length > 0 ? <div>
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {announcements.map((step, index) => (
            <div key={step.title}>
              {Math.abs(activeStep - index) <= 2 ? (
                <MainAnnouncementComponent announcement={step}/>
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        <MobileStepper
        sx={{
            backgroundColor: "#e4e4e4",
            borderRadius: '3px'
        }}
          steps={steps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === steps - 1}
            >
              İleri
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Geri
            </Button>
          }
        /> </div>: ""}
      </Box>
    );
}