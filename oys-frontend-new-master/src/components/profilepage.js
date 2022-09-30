import { useParams } from "react-router"
import BreadcrumbsComponent from "./breadcrumbs";
import ContentComponent from "./content";
import HeaderComponent from "./header";
import NavigationComponent from "./navigation";
import ReminderComponent from "./reminder";

export default function ProfilePageComponent() {
    let params = useParams();
    const breadcrumbs = [
        {
            name: "Anasayfa",
            address: "/"
        },
        {
            name: "Kullanıcılar",
            address: "/usersList"
        },
        {
            name: params.username,
            address: "/usersList/" + params.username
        }
    ];

    return (
        <div className="container">
            <HeaderComponent/>
            <BreadcrumbsComponent breadcrumbs={breadcrumbs}/>
            <NavigationComponent />
            <ContentComponent page={"profile"} username={params.username}/>
            <ReminderComponent />
        </div>
    );
}