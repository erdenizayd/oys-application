import BreadcrumbsComponent from "./breadcrumbs";
import ContentComponent from "./content";
import HeaderComponent from "./header";
import NavigationComponent from "./navigation";
import ReminderComponent from "./reminder";

function UsersPageComponent() {
    const breadcrumbs = [
        {
            name: "Anasayfa",
            address: "/"
        },
        {
            name: "Kullanıcılar",
            address: "/usersList"
        }
    ];
    return (
        <div className="container">
            <HeaderComponent/>
            <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
            <NavigationComponent />
            <ContentComponent page={"users"}/>
            <ReminderComponent />
        </div>
    );
}

export default UsersPageComponent;