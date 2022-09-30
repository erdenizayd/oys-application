import { Breadcrumbs } from "@mui/material";
import BreadcrumbsComponent from "./breadcrumbs";
import ContentComponent from "./content";
import HeaderComponent from "./header";
import NavigationComponent from "./navigation";
import ReminderComponent from "./reminder";

export default function ClassesPageComponent() {
    const breadcrumbs = [
        {
            name: "Anasayfa",
            address: "/"
        },
        {
            name: "Sınıflar",
            address: "/classes"
        }
    ];
    return (
        <div className="container">
            <HeaderComponent/>
            <BreadcrumbsComponent breadcrumbs={breadcrumbs}/>
            <NavigationComponent />
            <ContentComponent page={"classes"}/>
            <ReminderComponent />
        </div>
    );
}