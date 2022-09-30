import { useState } from "react";
import { useParams } from "react-router";
import AnnouncementComponent from "./announcement";
import AnnouncementPageComponent from "./announcementpage";
import AnnouncementsPageContentComponent from "./announcementspagecontent";
import ChatContentComponent from "./chatcontent";
import ClassesTableComponent from "./classestable";
import ClassInfoComponent from "./classinfo";
import CoursePageContentComponent from "./coursepagecontent";
import CoursesContentComponent from "./coursescontent";
import CoursesListComponent from "./courseslist";
import EditProfileContentComponent from "./editprofilecontent";
import EnrollCourseComponent from "./enrollcourse";
import ExamPageComponent from "./exampage";
import ExamPageContentComponent from "./exampagecontent";
import GradeComponent from "./grade";
import HomepageContentComponent from "./homepagecontent";
import HwPageContentComponent from "./hwpagecontent";
import MyCoursesContentComponent from "./mycoursescontent";
import ProfileConcentComponent from "./profilecontent";
import CourseSearchComponent from "./searchcourse";
import UsersContentComponent from "./userscontent";
import UsersListComponent from "./userslist";
import UsersSearchComponent from "./userssearch";

function ContentComponent(props) {


    if(props.page === "homepage") {
        return (        
            <div className="content">
                <HomepageContentComponent/>
            </div>
        );
    }
    else if(props.page === "announcements") {
        return (
            <div className="content">
                <AnnouncementsPageContentComponent/>
            </div>
        )
    }
    else if(props.page === "my_courses") {
        return (
            <div className="content">
                <MyCoursesContentComponent/>
            </div>
        )
    }
    else if(props.page === "courses") {
        return (
            <div className="content">
                <CoursesContentComponent/>
            </div>
        )
    }
    else if(props.page === "users") {
        return (
            <div className="content">
                <UsersContentComponent />
            </div>
        )
    }
    else if(props.page === "classes") {
        return (
            <div className="content"  style={{minHeight: "500px"}}>
                <ClassesTableComponent />
            </div>
        );
    }
    else if(props.page === "course") {
        return (
            <div className="content">
                <CoursePageContentComponent courseCode={props.courseCode}/>
            </div>
        );
    }
    else if(props.page === "exam") {
        return (
            <div className="content">
                <ExamPageContentComponent examId={props.examId} courseCode={props.courseCode}/>
            </div>
        );
    }
    else if(props.page === "homework") {
        return (
            <div className="content">
                <HwPageContentComponent hwId={props.hwId} courseCode={props.courseCode}/>
            </div>
        );
    }
    else if(props.page === "editProfile") {
        return (
            <div className="content">
                <EditProfileContentComponent/>
            </div>
        );
    }
    else if(props.page === "profile") {
        return (
            <div className="content">
                <ProfileConcentComponent username={props.username}/>
            </div>
        );
    }
    else if(props.page === "messages") {
        return (
            <div className="content">
                <ChatContentComponent />
            </div>
        );
    }
    else return;
}

export default ContentComponent;