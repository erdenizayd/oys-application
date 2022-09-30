import axios from "axios";

export default class AssistantApi {
    getAssistants() {
        return axios.get("/getAssistants");
    }

    getCourses() {
        return axios.get("/getCourses/assistant/" + localStorage.getItem("username"));
    }
    getSchedule(username) {
        return axios.get("/getSchedule/assistant/" + username);
    }
    updateSchedule(username, request) {
        return axios.post("/updateSchedule/assistant/" + username, request);
    }
    deleteSchedule(username, request) {
        return axios.put("/deleteSchedule/assistant/" + username, request);
    }
}