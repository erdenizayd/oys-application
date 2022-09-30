import axios from "axios";

export default class ExamApi {
    addExam(examRequest) {
        return axios.post("/addExam", examRequest);
    }
    getExam(examId) {
        return axios.get("/getExam/" + examId);
    }
    evaluateExam(examId,studentId,request) {
        return axios.post("/evaluateExam/" + examId + "/" + studentId, request);
    }
    getGrades(examId) {
        return axios.get("/getExamGrades/" + examId);
    }

    getGrade(examId) {
        return axios.get("/getExamGrade/" + examId + "/" + localStorage.getItem("username"));
    }
}