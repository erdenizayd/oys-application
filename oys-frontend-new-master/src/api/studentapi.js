import axios from "axios";

export default class StudentApi {
    attendCourse(course,username) {
        return axios.post("/attendCourse/"+course,{username: username});
    }
    getCourses() {
        return axios.get("/courses/" + localStorage.getItem("username"));
    }
    getImportantDates() {
        return axios.get("/getDates/" + localStorage.getItem("username"));
    }
    getSchedule(username) {
        return axios.get("/getSchedule/student/" + username);
    }
    updateSchedule(username, request) {
        return axios.post("/updateSchedule/student/" + username, request);
    }
    deleteSchedule(username, request) {
        return axios.put("/deleteSchedule/student/" + username, request);
    }
}