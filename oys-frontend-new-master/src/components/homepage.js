import ContentComponent from "./content";
import HeaderComponent from "./header";
import NavigationComponent from "./navigation";
import ReminderComponent from "./reminder";
import React, { useEffect } from "react";
import BreadcrumbsComponent from "./breadcrumbs";
import { useNavigate } from "react-router";

function HomePageComponent(props) {
    const homepage = "homepage";
    const breadcrumbs = [{name: "Anasayfa", address: "/"}];
    let navigate = useNavigate();
    useEffect(() => {
        isLoggedIn();
        props.connect();   
    }, []);

    function isLoggedIn() {
        if(localStorage.getItem("username") === null) navigate("/login");
    }

    
    return(
        <div className="container">
            <HeaderComponent/>
            <BreadcrumbsComponent breadcrumbs={breadcrumbs} />
            <NavigationComponent />
            <ContentComponent page={homepage}/>
            <ReminderComponent />
        </div>
    );
}

export default HomePageComponent;