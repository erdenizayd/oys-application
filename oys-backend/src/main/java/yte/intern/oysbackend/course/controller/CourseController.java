package yte.intern.oysbackend.course.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import yte.intern.oysbackend.common.response.MessageResponse;
import yte.intern.oysbackend.course.entity.CourseSource.SourceLinkRequest;
import yte.intern.oysbackend.course.entity.CourseSource.SourceResponse;
import yte.intern.oysbackend.course.entity.dto.*;
import yte.intern.oysbackend.course.service.CourseService;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Transactional
public class CourseController {
    private final CourseService courseService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping("/createCourse")
    public MessageResponse createNewCourse(@RequestBody AddCourseRequest addCourseRequest) {
        return courseService.createNewCourse(addCourseRequest);
    }

    @GetMapping("/course/{courseCode}")
    public DetailedCourseResponse getCourse(@PathVariable String courseCode) {
        return courseService.getCourse(courseCode);
    }

    @GetMapping("/course/{courseCode}/students")
    public List<CourseStudentsResponse> getCourseStudents(@PathVariable String courseCode) {
            return courseService.getCourseStudents(courseCode);
    }

    @PreAuthorize("hasAuthority('LECTURER')")
    @PostMapping("/course/{courseCode}/addAssistant")
    public MessageResponse addNewAssistant(@PathVariable String courseCode, @RequestBody Map<String,Long> id) {
        return courseService.addNewAssistant(courseCode, id.get("id"));
    }

    @GetMapping("/courses/page={page}")
    public List<CourseResponse> getCourses(@PathVariable Integer page) {
        return courseService.getCourses(page);
    }

    @PutMapping("updateCourseDetails/{courseCode}")
    public MessageResponse updateCourse(@RequestBody DetailedUpdateRequest updateCourseRequest, @PathVariable String courseCode) {
        return courseService.updateCourseDetailed(updateCourseRequest, courseCode);
    }

    @PutMapping("updateCourse/{courseCode}")
    public MessageResponse updateCourse(@RequestBody UpdateCourseRequest updateCourseRequest, @PathVariable String courseCode) {
        return courseService.updateCourse(updateCourseRequest, courseCode);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping("deleteCourse/{code}")
    public MessageResponse deleteCourse(@PathVariable String code) {
        return courseService.deleteCourse(code);
    }

    @GetMapping("getCourses/lecturer/{username}")
    public List<CourseResponse> getLecturerCourses(@PathVariable String username) {
        return courseService.getLecturerCourses(username);
    }

    @GetMapping("getCourses/assistant/{username}")
    public List<CourseResponse> getAssistantCourses(@PathVariable String username) {
        return courseService.getAssistantCourses(username);
    }

    @GetMapping("getCourseSources/{courseCode}")
    public List<SourceResponse> getSources(@PathVariable String courseCode) {
        return courseService.getSources(courseCode);
    }

    @PostMapping("addSources/link/{courseCode}")
    public MessageResponse addLinkSource(@PathVariable String courseCode, @RequestBody SourceLinkRequest sourceLinkRequest) {
        return courseService.addLinkSource(courseCode,sourceLinkRequest);
    }

    @PostMapping("addSources/file/{courseCode}")
    public MessageResponse addFileSource(@PathVariable String courseCode, @RequestParam("file") MultipartFile file,
                                         @RequestParam("name")String name) throws IOException {
        return courseService.addFileSource(courseCode,file,name);
    }

    @GetMapping("getCourseSources/file/{courseCode}/{sourceId}")
    public byte[] getFileSource(@PathVariable String courseCode, @PathVariable Long sourceId) {
        return courseService.getFileSource(courseCode,sourceId);
    }

    @PostMapping("addAnnouncement/{courseCode}")
    public MessageResponse addAnnouncement(@PathVariable String courseCode, @RequestBody AnnouncementRequest request) {
        return courseService.addAnnouncement(courseCode, request);
    }

}
