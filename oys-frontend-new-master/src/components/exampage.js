import { useParams } from "react-router";
import HeaderComponent from "./header";
import NavigationComponent from "./navigation";
import ContentComponent from "./content";
import ReminderComponent from "./reminder";
import BreadcrumbsComponent from "./breadcrumbs";

export default function ExamPageComponent() {
    let params = useParams();
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
            name: params.course.toUpperCase(),
            address: "/my_courses/" + params.course
        },
        {
            name: "Sınav Detayları",
            address: "/my_courses/" + params.course + "/" + params.exam
        }
    ];
    return (
        <div className="container">
            <HeaderComponent/>
            <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
            <NavigationComponent />
            <ContentComponent page={"exam"} courseCode={params.course} examId={params.exam}/>
            <ReminderComponent />
        </div>
    );
}