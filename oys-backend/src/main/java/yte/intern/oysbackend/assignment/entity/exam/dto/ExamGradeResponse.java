package yte.intern.oysbackend.assignment.entity.exam.dto;

public record ExamGradeResponse(
        Long examId,
        Long grade,
        String evaluation
) {
}
