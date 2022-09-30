package yte.intern.oysbackend.lecturer.entity.dto;

public record LecturerScheduleResponse(
        String detail,
        Integer dayOfWeek,
        Integer hour
) {
}
