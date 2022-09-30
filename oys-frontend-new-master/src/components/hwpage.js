import { useParams } from "react-router";
import HeaderComponent from "./header";
import NavigationComponent from "./navigation";
import ContentComponent from "./content";
import ReminderComponent from "./reminder";
import BreadcrumbsComponent from "./breadcrumbs";

export default function HwPageComponent() {
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
            name: "Ödev" + params.hw,
            address: "/my_courses/" + params.course + "/" + params.hw
        }
    ];
    return (
        <div className="container">
            <HeaderComponent/>
            <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
            <NavigationComponent />
            <ContentComponent page={"homework"} courseCode={params.course} hwId={params.hw}/>
            <ReminderComponent />
        </div>
    );
}