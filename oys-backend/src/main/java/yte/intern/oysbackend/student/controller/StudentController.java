package yte.intern.oysbackend.student.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import yte.intern.oysbackend.common.response.MessageResponse;
import yte.intern.oysbackend.course.entity.dto.CourseResponse;
import yte.intern.oysbackend.student.entity.dto.DateResponse;
import yte.intern.oysbackend.student.entity.dto.StudentScheduleRequest;
import yte.intern.oysbackend.student.entity.dto.StudentScheduleResponse;
import yte.intern.oysbackend.student.request.StudentRequest;
import yte.intern.oysbackend.student.service.StudentService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class StudentController {
    private final StudentService studentService;

    @PostMapping("/attendCourse/{courseCode}")
    public MessageResponse attendCourse(@RequestBody StudentRequest studentRequest, @PathVariable String courseCode) {
        return studentService.attendCourse(courseCode, studentRequest.username());
    }

    @GetMapping("/courses/{username}")
    public List<CourseResponse> getCourses(@PathVariable String username) {
        return studentService.getCourses(username);
    }

    @GetMapping("/getDates/{username}")
    public List<DateResponse> getDates(@PathVariable String username) {
        return studentService.getDates(username);
    }

    @GetMapping("/getSchedule/student/{username}")
    public List<StudentScheduleResponse> getSchedule(@PathVariable String username) {
        return studentService.getSchedule(username);
    }

    @PostMapping("/updateSchedule/student/{username}")
    public MessageResponse updateSchedule(@RequestBody StudentScheduleRequest studentScheduleRequest, @PathVariable String username) {
        return studentService.updateSchedule(studentScheduleRequest, username);
    }

    @PutMapping("/deleteSchedule/student/{username}")
    public MessageResponse deleteSchedule(@RequestBody StudentScheduleRequest studentScheduleRequest, @PathVariable String username) {
        return studentService.deleteSchedule(studentScheduleRequest, username);
    }
}
