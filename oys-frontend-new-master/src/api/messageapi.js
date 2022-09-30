import axios from "axios";

export default class MessageApi {
    sendMessage(msg) {
        return axios.post("/send", msg);
    }
    sendPrivateMessage(msg) {
        return axios.post("/sendToUser", msg);
    }
}