package yte.intern.oysbackend.assignment.entity.homework.dto;

public record SubmissionGradeResponse(
        Long hwId,
        Long grade,
        String evaluation
) {
}
