package yte.intern.oysbackend.course.entity.dto;

public record CourseHourResponse (
        Integer dayOfWeek,
        Integer hour,
        String room
){
}
