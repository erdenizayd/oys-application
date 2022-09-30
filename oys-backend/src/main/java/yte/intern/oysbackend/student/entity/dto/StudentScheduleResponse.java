package yte.intern.oysbackend.student.entity.dto;

public record StudentScheduleResponse (
        String detail,
        Integer dayOfWeek,
        Integer hour
) {
}
