package yte.intern.oysbackend.announcement.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import yte.intern.oysbackend.announcement.entity.dto.AnnouncementRequest;
import yte.intern.oysbackend.announcement.entity.dto.AnnouncementResponse;
import yte.intern.oysbackend.announcement.repository.AnnouncementRepository;
import yte.intern.oysbackend.common.response.MessageResponse;
import yte.intern.oysbackend.common.response.ResponseType;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnnouncementService {
    private final AnnouncementRepository announcementRepository;

    public List<AnnouncementResponse> getAnnouncements(Integer page) {
        Long pageCount = (announcementRepository.count() % 5 > 0) ? announcementRepository.count()/5 + 1 : announcementRepository.count()/5;
        Pageable pageRequest = PageRequest.of(page,5);
        return announcementRepository
                .findByOrderByPostDateTimeDesc(pageRequest)
                .stream()
                .map(a -> AnnouncementResponse.fromAnnouncement(a,pageCount))
                .toList();
    }

    public MessageResponse addAnnouncement(AnnouncementRequest announcementRequest) {
        announcementRepository.save(AnnouncementRequest.toAnnouncement(announcementRequest));
        return new MessageResponse("Duyuru başarıyla oluşturuldu.", ResponseType.SUCCESS);
    }
}
