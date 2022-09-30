import HeaderComponent from "./header";
import NavigationComponent from "./navigation";
import ContentComponent from "./content";
import ReminderComponent from "./reminder";
import BreadcrumbsComponent from "./breadcrumbs";


function CoursesPageComponent() {
    const breadcrumbs = [
        {
            name: "Anasayfa",
            address: "/"
        },
        {
            name: "Tüm Dersler",
            address: "/courses"
        }
    ];
    return (
        <div className="container">
            <HeaderComponent/>
            <BreadcrumbsComponent breadcrumbs={breadcrumbs}/>
            <NavigationComponent />
            <ContentComponent page={"courses"}/>
            <ReminderComponent />
        </div>
    );
}

export default CoursesPageComponent;