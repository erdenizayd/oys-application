package yte.intern.oysbackend.course.entity.dto;

import yte.intern.oysbackend.assignment.entity.exam.dto.ExamGradeResponse;
import yte.intern.oysbackend.assignment.entity.homework.dto.SubmissionGradeResponse;
import yte.intern.oysbackend.student.entity.Student;

import java.util.List;

public record CourseStudentsResponse(
        Long studentId,
        String name,
        String username,
        List<ExamGradeResponse> examGrades,
        List<SubmissionGradeResponse> homeworkGrades
) {
    public static CourseStudentsResponse fromStudent(Student student) {
        return new CourseStudentsResponse(student.getId(), student.getName(), student.getUsername(),
                student.getGrades().stream().map((g) -> new ExamGradeResponse(g.getExam().getId(),g.getGrade(),g.getEvaluation())).toList(),
                student.getSubmissions().stream().map((g) -> new SubmissionGradeResponse(g.getHomework().getId(),g.getGrade(),g.getEvaluation())).toList());
    }
}
