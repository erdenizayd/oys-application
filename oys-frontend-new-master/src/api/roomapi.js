import axios from "axios";

export class RoomApi {

    getRooms() {
        return axios.get("/getRooms");
    }

    getRoom(name) {
        const request = "/getRooms/" + name;
        return axios.get(request);
    }

    createRoom(request) {
        return axios.post("/createRoom", request);
    }
}