package yte.intern.oysbackend.course.entity.dto;

import java.time.LocalDateTime;

public record CourseAnnouncementResponse(
        String title,
        String announcement,
        String author,
        LocalDateTime postDate
) {
}
