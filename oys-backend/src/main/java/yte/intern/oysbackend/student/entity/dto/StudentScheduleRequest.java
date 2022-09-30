package yte.intern.oysbackend.student.entity.dto;

public record StudentScheduleRequest(
        String detail,
        Integer dayOfWeek,
        Integer hour
) {
}
