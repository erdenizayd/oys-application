package yte.intern.oysbackend.announcement.entity.dto;

import yte.intern.oysbackend.announcement.entity.Announcement;

import java.time.LocalDateTime;

public record AnnouncementRequest(
        String title,
        String announcement,
        LocalDateTime postDate
) {
    public static Announcement toAnnouncement(AnnouncementRequest announcementRequest) {
        return new Announcement(
                announcementRequest.title(),
                announcementRequest.announcement(),
                announcementRequest.postDate()
        );
    }
}
