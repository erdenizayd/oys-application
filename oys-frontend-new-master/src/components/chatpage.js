import ContentComponent from "./content";
import HeaderComponent from "./header";
import NavigationComponent from "./navigation";
import ReminderComponent from "./reminder";
import BreadcrumbsComponent from "./breadcrumbs";


export default function ChatPageComponent({
    stompClient, users, setUsers, message, setMessage, privateMessages, setPrivateMessages
}) {
    const breadcrumbs = [
        {
            name: "Anasayfa",
            address: "/"
        },
        {
            name: "Mesajlar",
            address: "/messages"
        }
    ];
    return (
        <div className="container">
            <HeaderComponent/>
            <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
            <NavigationComponent />
            <ContentComponent page={"messages"} />
            <ReminderComponent />
        </div>
    );
}