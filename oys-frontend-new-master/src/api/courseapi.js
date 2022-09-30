import axios from "axios";

export default class CourseApi {
    getCoursesList(page) {
        return axios.get("/courses/page=" + page);
    }
    getCourse(courseCode) {
        return axios.get("/course/" + courseCode);  
    }
    addAssistant(courseCode,id) {
        return axios.post("/course/" + courseCode + "/addAssistant", {'id': id});
    }
    getCourseStudents(courseCode) {
        return axios.get("/course/" + courseCode + "/students");  
    }
    createCourse(course) {
        return axios.post("/createCourse",course);
    }
    deleteCourse(courseCode) {
        return axios.delete("/deleteCourse/" + courseCode);
    }
    updateCourse(courseCode, course) {
        return axios.put("/updateCourse/" + courseCode, course);
    }
    updateCourseDetails(courseCode, course) {
        return axios.put("/updateCourseDetails/" + courseCode, course);
    }
    getSources(courseCode){
        return axios.get("/getSources/" + courseCode);
    }
    addLinkSource(courseCode, request) {
        return axios.post("/addSources/link/" + courseCode, request);
    }
    addFileSource(courseCode, formData) {
        return axios.post("/addSources/file/" + courseCode, formData, {headers: {"content-type": "multipart/form-data"}});
    }
    getFileSource(courseCode, sourceId) {
        return axios.get("/getSources/file/" + courseCode + "/" + sourceId + "/", {
            responseType: 'arraybuffer',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/pdf'
            }
        })
    }
    newAnnouncement(courseCode, request) {
        return axios.post("/addAnnouncement/" + courseCode, request);
    }

}