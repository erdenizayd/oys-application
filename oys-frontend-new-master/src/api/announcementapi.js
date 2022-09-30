import axios from "axios";

export default class AnnouncementApi {
    getAnnouncements(page) {
        return axios.get("/getAnnouncements/" + page);
    }
    newAnnouncement(request) {
        return axios.post("/addAnnouncements/", request);
    }
}