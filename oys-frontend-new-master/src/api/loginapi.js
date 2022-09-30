import axios from "axios";

export class LoginApi {
    login(username, password) {
        return axios.post("/userLogin", {username : username, password : password});
    }

}