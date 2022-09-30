package yte.intern.oysbackend.announcement.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import yte.intern.oysbackend.announcement.entity.dto.AnnouncementRequest;
import yte.intern.oysbackend.announcement.entity.dto.AnnouncementResponse;
import yte.intern.oysbackend.announcement.service.AnnouncementService;
import yte.intern.oysbackend.common.response.MessageResponse;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Transactional
public class AnnouncementController {
    private final AnnouncementService announcementService;

    @GetMapping("/getAnnouncements/{page}")
    public List<AnnouncementResponse> getAnnouncements(@PathVariable Integer page) {
        return announcementService.getAnnouncements(page);
    }

    @PostMapping("/addAnnouncements/")
    public MessageResponse addAnnouncement(@RequestBody AnnouncementRequest announcementRequest) {
        return announcementService.addAnnouncement(announcementRequest);
    }
}
