package yte.intern.oysbackend.assignment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import yte.intern.oysbackend.assignment.entity.exam.dto.EvaluationRequest;
import yte.intern.oysbackend.assignment.entity.exam.dto.ExamGradeResponse;
import yte.intern.oysbackend.assignment.entity.exam.dto.ExamRequest;
import yte.intern.oysbackend.assignment.entity.exam.dto.ExamResponse;
import yte.intern.oysbackend.assignment.service.ExamService;
import yte.intern.oysbackend.common.response.MessageResponse;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Transactional
public class ExamController {
    private final ExamService examService;

    @PreAuthorize("hasAuthority('LECTURER') or hasAuthority('ASSISTANT')")
    @PostMapping("/addExam")
    public MessageResponse addExam(@RequestBody ExamRequest examRequest) {
        return examService.addExam(examRequest);
    }

    @GetMapping("/getExam/{examId}")
    public ExamResponse getExam(@PathVariable Long examId) {
        return examService.getExam(examId);
    }

    @PreAuthorize("hasAuthority('LECTURER') or hasAuthority('ASSISTANT')")
    @PostMapping("/evaluateExam/{examId}/{studentId}")
    public MessageResponse evaluateExam(@PathVariable Long examId, @PathVariable Long studentId, @RequestBody EvaluationRequest evaluationRequest) {
        return examService.evaluateExam(examId,studentId,evaluationRequest);
    }

    @GetMapping("/getExamGrades/{examId}")
    public List<Long> getExamGrades(@PathVariable Long examId) {
        return examService.getExamGrades(examId);

    }

    @GetMapping("/getExamGrade/{examId}/{username}")
    public ExamGradeResponse getExamGrade(@PathVariable Long examId, @PathVariable String username) {
        return examService.getExamGrade(examId, username);

    }

}
