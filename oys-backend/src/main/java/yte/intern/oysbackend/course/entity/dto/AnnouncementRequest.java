package yte.intern.oysbackend.course.entity.dto;

import java.time.LocalDateTime;

public record AnnouncementRequest(
        String title,
        String announcement,
        String username,
        LocalDateTime postDate
) {
}
