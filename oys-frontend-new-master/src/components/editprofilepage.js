import HeaderComponent from "./header";
import NavigationComponent from "./navigation";
import ContentComponent from "./content";
import ReminderComponent from "./reminder";
import BreadcrumbsComponent from "./breadcrumbs";

export default function EditProfilePageComponent() {
    const breadcrumbs = [
        {
            name: "Anasayfa",
            address: "/"
        },
        {
            name: "Profilimi Düzenle",
            address: "/editProfile"
        }
    ];
    return (
        <div className="container">
            <HeaderComponent/>
            <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
            <NavigationComponent />
            <ContentComponent page={"editProfile"}/>
            <ReminderComponent />
        </div>
    );
}