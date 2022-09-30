package yte.intern.oysbackend.lecturer.entity.dto;

public record LecturerScheduleRequest(
        String detail,
        Integer dayOfWeek,
        Integer hour
) {
}
