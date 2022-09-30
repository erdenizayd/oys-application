package yte.intern.oysbackend.course.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import yte.intern.oysbackend.course.entity.CourseHour;
import yte.intern.oysbackend.course.entity.CourseHourId;

public interface CourseHourRepository extends JpaRepository<CourseHour, CourseHourId> {
}
