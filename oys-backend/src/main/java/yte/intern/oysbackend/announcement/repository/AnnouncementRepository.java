package yte.intern.oysbackend.announcement.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.oysbackend.announcement.entity.Announcement;

import java.util.Collection;
import java.util.List;

public interface AnnouncementRepository extends JpaRepository<Announcement,Long> {
    List<Announcement> findByOrderByPostDateTimeDesc(Pageable pageRequest);
}
