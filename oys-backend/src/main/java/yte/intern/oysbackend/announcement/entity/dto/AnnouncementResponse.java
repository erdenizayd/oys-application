package yte.intern.oysbackend.announcement.entity.dto;

import yte.intern.oysbackend.announcement.entity.Announcement;

import java.time.LocalDateTime;

public record AnnouncementResponse(
        String title,
        String announcement,
        LocalDateTime dateTime,
        Long pageCount
) {
    public static AnnouncementResponse fromAnnouncement(Announcement announcement, Long pageCount) {
        return new AnnouncementResponse(
                announcement.getTitle(),
                announcement.getAnnouncement(),
                announcement.getPostDateTime(),
                pageCount
        );
    }
}
