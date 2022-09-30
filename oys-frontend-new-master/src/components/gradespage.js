import ContentComponent from "./content";
import HeaderComponent from "./header";
import NavigationComponent from "./navigation";
import ReminderComponent from "./reminder";

function GradesPageComponent() {
    return (
        <div className="container">
            <HeaderComponent/>
            <NavigationComponent />
            <ContentComponent page={"grades"}/>
            <ReminderComponent />
        </div>
    );
}

export default GradesPageComponent;