import HeaderComponent from "./header";
import NavigationComponent from "./navigation";
import ContentComponent from "./content";
import ReminderComponent from "./reminder";
import BreadcrumbsComponent from "./breadcrumbs";


function AttendedCoursesPageComponent() {

    const breadcrumbs = [
        {
            name: "Anasayfa",
            address: "/"
        },
        {
            name: "Kayıtlı Derslerim",
            address: "/my_courses"
        }
    ];

    return (
        <div className="container">
            <HeaderComponent/>
            
            <NavigationComponent />
            <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
            <ContentComponent page={"my_courses"}/>
            <ReminderComponent />
        </div>
    );
}

export default AttendedCoursesPageComponent;