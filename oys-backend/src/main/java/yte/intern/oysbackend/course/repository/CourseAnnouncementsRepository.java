package yte.intern.oysbackend.course.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.oysbackend.course.entity.CourseAnnouncements;

public interface CourseAnnouncementsRepository extends JpaRepository<CourseAnnouncements, Long> {
}
