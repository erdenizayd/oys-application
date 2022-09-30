package yte.intern.oysbackend.room.response;

import yte.intern.oysbackend.course.entity.CourseHour;

import java.util.Set;

public record RoomResponse(
        String name,
        String courseName,
        Integer dayOfWeek,
        Integer hour
) {
}
