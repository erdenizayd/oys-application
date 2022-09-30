import { useParams } from "react-router"
import BreadcrumbsComponent from "./breadcrumbs";
import ContentComponent from "./content";
import HeaderComponent from "./header";
import NavigationComponent from "./navigation";
import ReminderComponent from "./reminder";

export default function CoursePageComponent() {
    let courseCode = useParams();
    const breadcrumbs = [
        {
            name: "Anasayfa",
            address: "/"
        },
        {
            name: "Kayıtlı Derslerim",
            address: "/my_courses"
        },
        {
            name: courseCode.course.toUpperCase(),
            address: "/my_courses/" + courseCode.course
        }
    ];

    return (
        <div className="container">
            <HeaderComponent/>
            <BreadcrumbsComponent breadcrumbs={breadcrumbs}/>
            <NavigationComponent />
            <ContentComponent page={"course"} courseCode={courseCode.course}/>
            <ReminderComponent />
        </div>
    );
}