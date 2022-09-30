import axios from "axios";

export default class UserApi {
    getUsers(page) {
        return axios.get("/users/" + page);
    }

    getUsersByName(page, name) {
        return axios.get("/users/" + page + "/sbn?name=" + name);
    }

    getUsersByUsername(page, username) {
        return axios.get("/users/" + page + "/sbu?username=" + username);
    }

    getUsersByNameAndUsername(page, name, username) {
        return axios.get("/users/" + page + "/sbnu?name=" + name + "&username=" + username);
    }

    addUser(request){
        return axios.post("/newUser",request);
    }

    disableUser(id) {
        return axios.put("/users/disable/" + id);
    }

    enableUser(id) {
        return axios.put("/users/enable/" + id);
    }
    
    getLecturers() {
        return axios.get("/lecturers");
    }

    getProfile(username) {
        return axios.get("/getProfile/" + username);
    }

    updateProfile(request) {
        return axios.put("/updateProfile/", request);
    }

    getProfilePhoto(username) {
        return axios.get("/getProfile/" + username + "/profilePhoto",{
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/jpg'
        }
    });
    }

    uploadProfilePhoto(username, formData) {
        return axios.post("/updateProfile/" + username + "/newPhoto/", formData, {headers: {"content-type": "multipart/form-data"}});
    }

    changePassword(request) {
        return axios.put("/changePassword/" + localStorage.getItem("username"), request);
    }

}