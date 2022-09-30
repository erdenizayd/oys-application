package yte.intern.oysbackend.course.entity.dto;

import yte.intern.oysbackend.course.entity.Course;

import java.util.List;

public record CourseResponse(
        String code,
        String name,
        String lecturerName,
        List<CourseHourResponse> courseHours,
        Long pageCount
) {
    public static CourseResponse fromCourse(Course course) {
        return new CourseResponse(
                course.getCourseCode(),
                course.getName(),
                course.getLecturer().getName(),
                course.getHours().stream()
                        .map((h) -> new CourseHourResponse(h.getCourseHourId().getDayOfWeek(), h.getCourseHourId().getHour(), h.getRoom().getName()))
                        .toList(),
                0L
        );
    }
}
