import ContentComponent from "./content";
import HeaderComponent from "./header";
import NavigationComponent from "./navigation";
import ReminderComponent from "./reminder";


function AnnouncementPageComponent() {

    const homepage = "homepage";
    const announcements = "announcements";

    return(
        <div className="container">
            <HeaderComponent/>
            <NavigationComponent />
            <ContentComponent page={announcements}/>
            <ReminderComponent />
        </div>
    );
}

export default AnnouncementPageComponent;