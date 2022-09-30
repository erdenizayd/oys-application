import axios from "axios";

export default class HwApi {
    addHomework(formData) {
        return axios.post("/addHomework",formData,{headers: {"content-type": "multipart/form-data"}});
    }
    getDetail(hwId) {
        return axios.get("/getHomeworkDetails/" + hwId, {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf'
            }
        });
    }

    getHomework(hwId) {
        return axios.get("/getHomework/" + hwId);
    }

    getSubmissionFile(hwId, submissionId) {
        return axios.get("/getSubmissionFile/" + hwId + "/" + submissionId + "/", {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf'
            }
        });
    }
    getSubmission(hwId, username) {
        return axios.get("/getSubmission/" + hwId + "/" + username + "/");
    }

    submitHomework(hwId,formData) {
        return axios.post("/submitHomework/" + hwId, formData, {headers: {"content-type": "multipart/form-data"}});
    }

    evaluateHomework(hwId,studentId,request) {
        return axios.post("/evaluateHomework/" + hwId + "/" + studentId, request);
    }

    getGrades(hwId) {
        return axios.get("/getHomeworkGrades/" + hwId);
    }

    getGrade(hwId) {
        return axios.get("/getHomeworkGrade/" + hwId + "/" + localStorage.getItem("username"));
    }
}