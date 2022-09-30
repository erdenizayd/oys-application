import axios from "axios";

export default class LecturerApi {
    getCourses() {
        return axios.get("/getCourses/lecturer/" + localStorage.getItem("username"));
    }
    getSchedule(username) {
        return axios.get("/getSchedule/lecturer/" + username);
    }
    updateSchedule(username, request) {
        return axios.post("/updateSchedule/lecturer/" + username, request);
    }
    deleteSchedule(username, request) {
        return axios.put("/deleteSchedule/lecturer/" + username, request);
    }
}