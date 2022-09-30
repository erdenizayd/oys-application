package yte.intern.oysbackend.course.entity.CourseSource;

public record SourceResponse(
        String name,
        String type,
        String url,
        Long id
) {
}
