package yte.intern.oysbackend.assignment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import yte.intern.oysbackend.assignment.entity.exam.dto.EvaluationRequest;
import yte.intern.oysbackend.assignment.entity.homework.dto.*;
import yte.intern.oysbackend.assignment.service.HomeworkService;
import yte.intern.oysbackend.common.response.MessageResponse;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Transactional
public class HomeworkController {
    private final HomeworkService homeworkService;

    @PreAuthorize("hasAuthority('LECTURER') or hasAuthority('ASSISTANT')")
    @PostMapping(value="/addHomework", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public MessageResponse addHomework(@RequestParam("file")MultipartFile file,
                                       @RequestParam String date,
                                       @RequestParam String time,
                                       @RequestParam String assistantName,
                                       @RequestParam String courseCode) throws IOException {
        return homeworkService.addHomework(file, new HomeworkRequest(LocalDate.parse(date),LocalTime.parse(time),assistantName,courseCode));
    }

    @PostMapping(value="/submitHomework/{homeworkId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public MessageResponse submitHomework(@RequestParam("file")MultipartFile file,
                                       @RequestParam String details,
                                       @RequestParam String username,
                                       @PathVariable Long homeworkId) throws IOException {
        return homeworkService.submitHomework(file, new SubmissionRequest(details,username,homeworkId));
    }

    @GetMapping("/getHomework/{homeworkId}")
    public HomeworkResponse getHomework(@PathVariable Long homeworkId) {
        return homeworkService.getHomework(homeworkId);
    }

    @GetMapping("/getHomeworkDetails/{homeworkId}")
    public byte[] getHomeworkDetails(@PathVariable Long homeworkId) {
        return homeworkService.getHomeworkDetails(homeworkId);
    }

    @GetMapping("/getSubmissionFile/{homeworkId}/{submissionId}")
    public byte[] getSubmissionFile(@PathVariable Long homeworkId, @PathVariable Long submissionId) {
        return homeworkService.getSubmissionFile(homeworkId,submissionId);
    }

    @GetMapping("/getSubmission/{homeworkId}/{username}")
    public List<SubmissionResponse> getSubmission(@PathVariable Long homeworkId, @PathVariable String username) {
        return homeworkService.getSubmission(homeworkId,username);
    }

    @PreAuthorize("hasAuthority('LECTURER') or hasAuthority('ASSISTANT')")
    @PostMapping("/evaluateHomework/{homeworkId}/{studentId}")
    public MessageResponse evaluateHomework(@PathVariable Long homeworkId, @PathVariable Long studentId, @RequestBody EvaluationRequest evaluationRequest) {
        return homeworkService.evaluateHomework(homeworkId,studentId,evaluationRequest);
    }

    @GetMapping("/getHomeworkGrades/{homeworkId}")
    public List<Long> getHomeworkGrades(@PathVariable Long homeworkId) {
        return homeworkService.getHomeworkGrades(homeworkId);
    }

    @GetMapping("/getHomeworkGrade/{homeworkId}/{username}")
    public SubmissionGradeResponse getHomeworkGrade(@PathVariable Long homeworkId, @PathVariable String username) {
        return homeworkService.getHomeworkGrade(homeworkId, username);
    }
}
