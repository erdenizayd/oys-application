package yte.intern.oysbackend.assignment.entity.homework.dto;

public record SubmissionRequest(
        String details,
        String username,
        Long homeworkId
) {
}
